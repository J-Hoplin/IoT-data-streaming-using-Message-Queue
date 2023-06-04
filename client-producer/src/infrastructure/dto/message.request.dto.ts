export class MessageRequestDto {
  exchangeName!: string;

  severity!: string;

  message!: string;

  constructor(data: MessageRequestDto) {
    Object.assign(this, data);
  }
}
