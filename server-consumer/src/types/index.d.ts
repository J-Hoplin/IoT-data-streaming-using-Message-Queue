import * as amqp from "amqplib";

type QueueCallBack = (msg: amqp.ConsumeMessage) => void | Promise<void>;

interface TemperatureNHumidity {
  location: string;
  temperature: number;
  humidity: number;
}
