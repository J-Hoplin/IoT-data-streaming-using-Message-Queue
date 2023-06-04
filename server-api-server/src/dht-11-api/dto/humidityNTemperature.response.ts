import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { InfluxSeriesResult } from './influxSeries.result';

export class HumidityNTemperatureResponse {
  @ApiProperty({
    isArray: true,
    type: InfluxSeriesResult,
  })
  @IsNotEmpty()
  @IsArray()
  humidity: InfluxSeriesResult[];

  @ApiProperty({
    isArray: true,
    type: InfluxSeriesResult,
  })
  @IsNotEmpty()
  @IsArray()
  temperature: InfluxSeriesResult[];
  constructor(data: HumidityNTemperatureResponse) {
    Object.assign(this, data);
  }
}
