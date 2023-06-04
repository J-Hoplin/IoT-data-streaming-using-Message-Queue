import { registerAs } from '@nestjs/config';

export default registerAs('influx-config', () => ({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
  org: process.env.INFLUX_ORG,
  bucket: process.env.INFLUX_BUCKET,
  auth: {
    username: process.env.INFLUX_USERNAME,
    password: process.env.INFLUX_PASSWORD,
  },
}));
