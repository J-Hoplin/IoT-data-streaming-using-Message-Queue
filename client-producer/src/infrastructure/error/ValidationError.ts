export class ValidaionError extends Error implements ResponseError {
  constructor(msg: string) {
    super(msg);
  }
}
