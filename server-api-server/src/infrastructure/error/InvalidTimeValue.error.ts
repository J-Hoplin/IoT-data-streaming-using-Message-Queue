import { BadRequestException } from '@nestjs/common';

export enum TIME_VALUE_ERROR {
  INVALID_TIME_VALUE = 'INVALID_TIME_VALUE',
}

export class InvalidTimeValueError extends BadRequestException {
  constructor() {
    super('잘못된 시간값입니다', TIME_VALUE_ERROR.INVALID_TIME_VALUE);
  }
}
