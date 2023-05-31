import * as amqp from 'amqplib/callback_api'
import { logger } from '@src/log'
import { channel } from 'diagnostics_channel'


// Rabbit MQ Configs
const MqName = process.env.MQ_NAME as string
const MqPassword = process.env.MQ_PASSWORD as string
const MqHost = process.env.MQ_HOST as string
const MqPort = process.env.MQ_PORT as string

// Rabbit MQ Exchange, Queue
const exchangeName: string = process.env.EXCHANGE_NAME as string;
const infoQueueName: string = process.env.INFO_QUEUE_NAME as string;
const errorQueueName: string = process.env.ERROR_QUEUE_NAME as string;

// Log levels
const normalLevels: string[] = ["info"]
const abnormalLevels: string[] = ["warn", "error"]

const MQURL = `amqp://${MqName}:${MqPassword}@${MqHost}:${MqPort}`

let pubChannel: amqp.Channel

amqp.connect(MQURL, (err, connection: amqp.Connection) => {
  if (err) {
    if (err instanceof Error) {
      logger.error(err.message)
    }
    throw err;
  }
  logger.info("Rabbit MQ - Connected");
  connection.createChannel((err, channel: amqp.Channel) => {
    if (err) {
      if (err instanceof Error) {
        logger.error(err.message)
      }
      throw err;
    }
    pubChannel = channel;
    logger.info("Rabbit MQ - Channel created");

    channel.assertExchange(exchangeName, 'direct', {
      durable: true
    });
    logger.info("Rabbit MQ - Assert Exchange");
  })
})

export const publisher = async (severity: string, message: string) => {
  pubChannel.publish(exchangeName, severity, Buffer.from(message))
}