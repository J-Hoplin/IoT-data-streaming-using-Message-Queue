import * as amqp from "amqplib";

type QueueCallBack = (msg: amqp.ConsumeMessage) => void | Promise<void>;

interface ProducerDefaultFields {
  location: string;
}

interface TemperatureNHumidity extends ProducerDefaultFields {
  temperature: number;
  humidity: number;
}

interface ProducerErrorMessage extends ProducerDefaultFields {
  message: string;
}
