import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class InfluxSeriesResult implements influxSeriesResult {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  constructor(data: InfluxSeriesResult) {
    Object.assign(this, data);
  }
}
