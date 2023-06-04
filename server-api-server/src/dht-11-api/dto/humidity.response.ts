import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { InfluxSeriesResult } from './influxSeries.result';

export class HumidityRepsonse {
  @ApiProperty({
    isArray: true,
    type: InfluxSeriesResult,
  })
  @IsNotEmpty()
  @IsArray()
  humidity: InfluxSeriesResult[];

  constructor(data: HumidityRepsonse) {
    Object.assign(this, data);
  }
}
