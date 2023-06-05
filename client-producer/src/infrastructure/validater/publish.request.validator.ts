import * as Joi from "joi";
import { MessageRequestDto } from "../dto/message.request.dto";

export const publishRequest = Joi.object({
  severity: Joi.string().required(),
  message: Joi.string().required(),
  exchangeName: Joi.string().required(),
  exchangeType: Joi.string().valid("direct", "fanout", "topic", "header", "x-consistent-hash").required()
}).unknown();
