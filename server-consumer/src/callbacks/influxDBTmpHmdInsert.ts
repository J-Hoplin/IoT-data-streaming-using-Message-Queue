import * as amqp from "amqplib";
import { QueueCallBack, TemperatureNHumidity } from "../types";
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
  temperature: "temperature",
  humidity: "humidity",
};

const FIELD_KEYS = {
  value: "value",
};

const DEFAULT_VALUES = {
  measuerment: "temp-hum-measure",
  location: "My-Home",
};

export const influxDBTmpHmdInsert: QueueCallBack = async (
  msg: amqp.ConsumeMessage
): Promise<void> => {
  const content: string = msg.content.toString();
  let payload: TemperatureNHumidity;
  try {
    payload = JSON.parse(content);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`${err.name} - ${err.message}`);
    }
    return;
  }
  const { location, temperature, humidity } = payload;
  // If temperature or humidity information loss -> do not save data
  if (!temperature || !humidity) {
    return;
  }
  const influxWriteApi: WriteApi = new InfluxDB({
    url: influxURL,
    token: influxToken,
  }).getWriteApi(influxOrg, influxBucket);

  const temperaturePoint = new Point(DEFAULT_VALUES.measuerment)
    .tag(TAG_KEYS.location, location || DEFAULT_VALUES.location)
    .tag(TAG_KEYS.indicator, INDICATOR_VALUE.temperature)
    .floatField(FIELD_KEYS.value, temperature);
  const humidityPoint = new Point(DEFAULT_VALUES.measuerment)
    .tag(TAG_KEYS.location, location || DEFAULT_VALUES.location)
    .tag(TAG_KEYS.indicator, INDICATOR_VALUE.humidity)
    .floatField(FIELD_KEYS.value, humidity);
  influxWriteApi.writePoint(temperaturePoint);
  influxWriteApi.writePoint(humidityPoint);
  influxWriteApi.close();
};
