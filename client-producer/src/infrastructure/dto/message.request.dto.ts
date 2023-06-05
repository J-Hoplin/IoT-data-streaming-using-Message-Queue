export class MessageRequestDto {
  exchangeName!: string;

  severity!: string;

  message!: string;

  exchangeType!: string;

  constructor(data: MessageRequestDto) {
    Object.assign(this, data);
  }
}
