import * as Joi from 'joi';

export const EnvValidator = Joi.object({
  INFLUX_URL: Joi.string().required(),
  INFLUX_TOKEN: Joi.string().required(),
  INFLUX_ORG: Joi.string().required(),
  INFLUX_BUCKET: Joi.string().required(),
  INFLUX_USERNAME: Joi.string().required(),
  INFLUX_PASSWORD: Joi.string().required(),
}).unknown();
