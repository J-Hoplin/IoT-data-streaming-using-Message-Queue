import { ServerConsumer } from "./consumer";
import { influxDBTmpHmdInsert } from "./callbacks/influxDBTmpHmdInsert";

ServerConsumer.addInfoCBActivity(influxDBTmpHmdInsert);

const consumer = new ServerConsumer();

consumer.consume();
