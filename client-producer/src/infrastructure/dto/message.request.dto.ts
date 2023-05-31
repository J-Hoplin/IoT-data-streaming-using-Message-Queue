export class MessageRequestDto {
  severity!: string;

  message!: string;

  constructor(data: MessageRequestDto) {
    Object.assign(this, data);
  }
}
