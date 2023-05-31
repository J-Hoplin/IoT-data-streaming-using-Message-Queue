export class ErrorResponse {

  statusCode!: number;

  message!: string;

  constructor(data: ErrorResponse) {
    Object.assign(this, data)
  }
}