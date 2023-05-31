import * as amqp from "amqplib";
import { logger } from "../log";
import * as util from "util";

// Rabbit MQ Configs
const MqName = process.env.MQ_NAME as string;
const MqPassword = process.env.MQ_PASSWORD as string;
const MqHost = process.env.MQ_HOST as string;
const MqPort = process.env.MQ_PORT as string;

// Rabbit MQ Exchange, Queue
const exchangeName: string = process.env.EXCHANGE_NAME as string;

const MQURL = `amqp://${MqName}:${MqPassword}@${MqHost}:${MqPort}`;

let pubConnection: amqp.Connection;

amqp
  .connect(MQURL)
  .then((x) => {
    logger.info("Rabbit MQ - Connected");
    pubConnection = x;
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger.error(err.message);
      throw err;
    }
  });

export const publisher = async (severity: string, message: string) => {
  try {
    const channel = await pubConnection.createChannel();
    await channel.assertExchange(exchangeName, "direct", {
      durable: true,
    });
    channel.publish(exchangeName, severity, Buffer.from(message));
    await channel.close();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
    }
    throw err;
  }
};
