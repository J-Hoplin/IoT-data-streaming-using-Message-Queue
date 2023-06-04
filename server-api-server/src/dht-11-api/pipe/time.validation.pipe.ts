import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { InvalidTimeValueError } from 'src/infrastructure/error/InvalidTimeValue.error';

export class TimeValueValidatorPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value <= 0) {
      throw new InvalidTimeValueError();
    }
    return value;
  }
}
