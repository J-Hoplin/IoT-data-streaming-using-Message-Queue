import * as amqp from "amqplib";
import { config } from "dotenv";
import logger from "../logger";
import { QueueCallBack } from "../types";

config({
  path: `${__dirname}/../../env/.env`,
});

class ServerConsumer {
  private static infoCBAdditionalActivity: QueueCallBack[] = [];
  private static errCBAdditionalActivity: QueueCallBack[] = [];

  public static addInfoCBActivity(...cb: QueueCallBack[]) {
    ServerConsumer.infoCBAdditionalActivity =
      ServerConsumer.infoCBAdditionalActivity.concat(cb);
  }

  public static addErrCBActivity(...cb: QueueCallBack[]) {
    ServerConsumer.errCBAdditionalActivity =
      ServerConsumer.errCBAdditionalActivity.concat(cb);
  }

  private async infoQueueCB(msg: amqp.ConsumeMessage) {
    logger.info(`[x] INFO - ${msg.content.toString()}`);
    await Promise.all(
      ServerConsumer.infoCBAdditionalActivity.map((cb) => cb(msg))
    );
  }

  private async errorQueueCB(msg: amqp.ConsumeMessage) {
    if (msg.fields.routingKey === "warn") {
      console.log(`Warning message`);
    } else {
      console.log(`Error message`);
    }
    logger.error(
      `[x] ${msg.fields.routingKey.toUpperCase()} - ${msg.content.toString()}`
    );
    await Promise.all(
      ServerConsumer.errCBAdditionalActivity.map((cb) => cb(msg))
    );
  }

  private async enrollChannelConsume(
    channel: amqp.Channel,
    queueName: string,
    cb: QueueCallBack
  ) {
    console.log(queueName);
    await channel.consume(
      queueName,
      async (msg) => {
        // Ignore empty message buffer
        if (!msg) {
          return;
        }
        // Execute callback function
        await cb(msg);
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
  }

  public async consume() {
    const MQConnectionString = `amqp://${process.env.MQ_NAME}:${process.env.MQ_PASSWORD}@${process.env.MQ_HOST}:${process.env.MQ_PORT}`;
    const normalLevels: string[] = ["info"];
    const abnormalLevels: string[] = ["warn", "error"];

    // Exchange, Queue Name
    const exchangeName: string = process.env.EXCHANGE_NAME as string;
    const infoQueueName: string = process.env.INFO_QUEUE_NAME as string;
    const errorQueueName: string = process.env.ERROR_QUEUE_NAME as string;

    // Make Connection
    const connection = await amqp.connect(MQConnectionString);

    // Generate Channel
    const channel = await connection.createChannel();
    try {
      // Set prefetch
      channel.prefetch(1);

      // Create Exchange
      await channel.assertExchange(exchangeName, "direct", {
        durable: true,
      });

      // Create info message queue
      const infoQueue: amqp.Replies.AssertQueue = await channel.assertQueue(
        infoQueueName,
        {
          durable: true,
        }
      );

      // Create warn/error message queue
      const errorQueue: amqp.Replies.AssertQueue = await channel.assertQueue(
        errorQueueName,
        {
          durable: true,
        }
      );

      // Bind queue to exchange
      normalLevels.forEach(async (level: string) => {
        await channel.bindQueue(infoQueue.queue, exchangeName, level);
      });

      // Bind queue to exchange
      abnormalLevels.forEach(async (level: string) => {
        await channel.bindQueue(errorQueue.queue, exchangeName, level);
      });

      const queueNCallback: [string, QueueCallBack][] = [
        [infoQueue.queue, this.infoQueueCB],
        [errorQueue.queue, this.errorQueueCB],
      ];

      queueNCallback.forEach(async (x) => {
        await this.enrollChannelConsume(channel, x[0], x[1]);
      });
      console.log("Consumer ready! Listening for message...");
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        console.error(err.message);
      }
      channel.close();
    }
  }
}

export { ServerConsumer };
