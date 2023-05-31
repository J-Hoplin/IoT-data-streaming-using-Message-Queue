import { MessageRequestDto } from "../../infrastructure/dto/message.request.dto";
import { OkResponse } from "../../infrastructure/dto/ok.response";
import { publisher } from "../../publisher";

export const publishService = async (
  body: MessageRequestDto
): Promise<boolean> => {
  const { message, severity } = body;
  await publisher(severity, message);
  return true;
};
