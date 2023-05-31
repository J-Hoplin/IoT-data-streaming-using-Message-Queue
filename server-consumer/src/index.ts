import * as amqp from 'amqplib'
import { config } from 'dotenv'
import logger from './logger'

type QueueCallBack = (msg: amqp.ConsumeMessage) => void

// Callback function of infoQueue
const infoQueueCB = (msg: amqp.ConsumeMessage) => {
  console.log(`[x] INFO - ${msg.content.toString()}`)
}

const errorQueueCB = (msg: amqp.ConsumeMessage) => {
  if (msg.fields.routingKey === "warn") {
    console.log(`Warning message`)
  } else {
    console.log(`Error message`)
  }
  console.log(`[x] ${msg.fields.routingKey.toUpperCase()} - ${msg.content.toString()}`)
}

const enrollChannelConsume = async (channel: amqp.Channel, queueName: string, cb: QueueCallBack) => {
  console.log(queueName)
  await channel.consume(
    queueName,
    (msg) => {
      // Ignore empty message buffer
      if (!msg) {
        return
      }
      // Execute callback function
      cb(msg)
      channel.ack(msg)
    }, {
    noAck: false
  }
  )
}

const consumer = async () => {

  config({
    path: `${__dirname}/../env/.env`
  })

  const MQConnectionString = `amqp://${process.env.MQ_NAME}:${process.env.MQ_PASSWORD}@${process.env.MQ_HOST}:${process.env.MQ_PORT}`;
  const normalLevels: string[] = ["info"]
  const abnormalLevels: string[] = ["warn", "error"]

  // Exchange, Queue Name
  const exchangeName: string = process.env.EXCHANGE_NAME as string;
  const infoQueueName: string = process.env.INFO_QUEUE_NAME as string;
  const errorQueueName: string = process.env.ERROR_QUEUE_NAME as string;

  // Make Connection
  const connection = await amqp.connect(MQConnectionString);

  // Generate Channel
  const channel = await connection.createChannel()
  try {
    // Set prefetch
    channel.prefetch(1);

    // Create Exchange
    await channel.assertExchange(exchangeName, 'direct', {
      durable: true
    })

    // Create info message queue
    const infoQueue: amqp.Replies.AssertQueue = await channel.assertQueue(infoQueueName, {
      durable: true
    })

    // Create warn/error message queue
    const errorQueue: amqp.Replies.AssertQueue = await channel.assertQueue(errorQueueName, {
      durable: true
    })

    // Bind queue to exchange
    normalLevels.forEach(async (level: string) => {
      await channel.bindQueue(infoQueue.queue, exchangeName, level)
    })

    // Bind queue to exchange
    abnormalLevels.forEach(async (level: string) => {
      await channel.bindQueue(errorQueue.queue, exchangeName, level)
    })

    const queueNCallback: [string, QueueCallBack][] = [
      [infoQueue.queue, infoQueueCB],
      [errorQueue.queue, errorQueueCB]
    ]

    queueNCallback.forEach(async (x) => {
      await enrollChannelConsume(channel, x[0], x[1])
    })
    console.log("Consumer ready! Listening for message...")
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      console.error(err.message)
    }
    channel.close()
  }
}



consumer()