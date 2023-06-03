import { ServerConsumer } from "./consumer";
import { influxDBTmpHmdInsert, influxDBErrInsert } from "./callbacks";

ServerConsumer.addInfoCBActivity(influxDBTmpHmdInsert);
ServerConsumer.addErrCBActivity(influxDBErrInsert);

const consumer = new ServerConsumer();

consumer.consume();
