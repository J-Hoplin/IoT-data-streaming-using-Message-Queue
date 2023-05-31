import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidaionError } from "../error/ValidationError";

export const publishRequestValidator =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (err) {
      let error = new Error();
      if (err instanceof Error) {
        error = new ValidaionError(err.message);
      }
      return next(err);
    }
  };
