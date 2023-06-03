import { ConfigModuleOptions } from '@nestjs/config';
import { config } from 'dotenv';
import influxConfig from 'src/config/config/influx.config';
import { EnvValidator } from 'src/config/validator/env.validator';

config({
  path: `${__dirname}/../../../server-dotenv/.env`,
});

export const configOption: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [`${__dirname}/../../../server-dotenv/.env`],
  cache: true,
  load: [influxConfig],
  validationSchema: EnvValidator,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
