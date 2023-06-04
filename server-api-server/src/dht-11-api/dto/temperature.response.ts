import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { InfluxSeriesResult } from './influxSeries.result';

export class TemperatureResponse {
  @ApiProperty({
    type: InfluxSeriesResult,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  temperature: InfluxSeriesResult[];

  constructor(data: TemperatureResponse) {
    Object.assign(this, data);
  }
}
