import app from "./app";
import * as http from "http";
import { logger } from "./log";

const server = http.createServer(app);
const servicePort = app.get('port')
server.listen(servicePort, () => {
  logger.info(`🚀 Listening on port : ${servicePort}`)
})