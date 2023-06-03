import * as amqp from "amqplib";
import {
  ProducerErrorMessage,
  QueueCallBack,
  TemperatureNHumidity,
} from "../types";
import logger from "../logger";
import { InfluxDB, Point, WriteApi } from "@influxdata/influxdb-client";

const influxURL = process.env.INFLUX_URL as string;
const influxToken = process.env.INFLUX_TOKEN as string;
const influxOrg = process.env.INFLUX_ORG as string;
const influxBucket = process.env.INFLUX_BUCKET as string;

const TAG_KEYS = {
  location: "location",
  indicator: "indicator",
};

const INDICATOR_VALUE = {
  error_msg: "error_message",
};

const FIELD_KEYS = {
  value: "value",
};

const DEFAULT_VALUES = {
  measuerment: "temp-hum-measure",
  location: "My-Home",
};

export const influxDBErrInsert: QueueCallBack = async (
  msg: amqp.ConsumeMessage
): Promise<void> => {
  const content: string = msg.content.toString();
  let payload: ProducerErrorMessage;
  try {
    payload = JSON.parse(content);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`${err.name} - ${err.message}`);
    }
    return;
  }
  const { location, message } = payload;
  const influxWriteApi: WriteApi = new InfluxDB({
    url: influxURL,
    token: influxToken,
  }).getWriteApi(influxOrg, influxBucket);

  const errMsgPoint = new Point(DEFAULT_VALUES.measuerment)
    .tag(TAG_KEYS.location, location || DEFAULT_VALUES.location)
    .tag(TAG_KEYS.indicator, INDICATOR_VALUE.error_msg)
    .stringField(FIELD_KEYS.value, message || "Some error occured");
  influxWriteApi.writePoint(errMsgPoint);
  influxWriteApi.close();
};
