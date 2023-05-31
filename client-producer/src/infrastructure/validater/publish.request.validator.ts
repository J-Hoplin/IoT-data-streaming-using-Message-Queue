import * as Joi from "joi";
import { MessageRequestDto } from "../dto/message.request.dto";

export const publishRequest = Joi.object({
  severity: Joi.string().valid("info", "warn", "error").required(),
  message: Joi.string().required(),
}).unknown();
