import { NextFunction, Request, Response, Router } from "express";
import { publishService } from "../service";
import { OkResponse } from "../../infrastructure/dto/ok.response";
import { publishRequestValidator } from "../../infrastructure/middlewares";
import { publishRequest } from "../../infrastructure/validater";

const router = Router();

router.post(
  "/",
  publishRequestValidator(publishRequest),
  async (req: Request, res: Response): Promise<Response> => {
    await publishService(req.body);
    return res.status(200).json(new OkResponse());
  }
);

export default router;
