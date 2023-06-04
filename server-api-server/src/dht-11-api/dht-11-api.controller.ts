import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Dht11ApiService } from './dht-11-api.service';
import { TimeValueValidatorPipe } from './pipe/time.validation.pipe';
import { HumidityNTemperatureResponse } from './dto/HumidityNTemperature.response';
import { HumidityRepsonse } from './dto/humidity.response';
import { TemperatureResponse } from './dto/temperature.response';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TIME_VALUE_ERROR } from 'src/infrastructure/error/InvalidTimeValue.error';

@ApiTags('DHT-11')
@Controller('dht11')
export class Dht11ApiController {
  private static readonly defaultTime: number = 3;
  constructor(private readonly dht11Service: Dht11ApiService) {}

  @Get()
  @ApiOperation({
    description: 'Get both humidity and temperature value',
  })
  @ApiQuery({ name: 'time', description: 'Time value. Unit as minute' })
  @ApiOkResponse({
    type: HumidityNTemperatureResponse,
  })
  @ApiBadRequestResponse({
    description: [TIME_VALUE_ERROR.INVALID_TIME_VALUE].join(', '),
  })
  public async getAll(
    @Query(
      'time',
      new DefaultValuePipe(Dht11ApiController.defaultTime),
      ParseIntPipe,
      TimeValueValidatorPipe,
    )
    time: number,
  ): Promise<HumidityNTemperatureResponse> {
    return this.dht11Service.getAll(time);
  }

  @Get('humidity')
  @ApiOperation({
    description: 'Get only humidity value',
  })
  @ApiQuery({ name: 'time', description: 'Time value. Unit as minute' })
  @ApiOkResponse({
    type: HumidityRepsonse,
  })
  @ApiBadRequestResponse({
    description: [TIME_VALUE_ERROR.INVALID_TIME_VALUE].join(', '),
  })
  public async getHumidity(
    @Query(
      'time',
      new DefaultValuePipe(Dht11ApiController.defaultTime),
      ParseIntPipe,
      TimeValueValidatorPipe,
    )
    time: number,
  ): Promise<HumidityRepsonse> {
    return this.dht11Service.getHumidity(time);
  }

  @Get('temperature')
  @ApiOperation({
    description: 'Get only temperature value',
  })
  @ApiQuery({ name: 'time', description: 'Time value. Unit as minute' })
  @ApiOkResponse({
    type: TemperatureResponse,
  })
  @ApiBadRequestResponse({
    description: [TIME_VALUE_ERROR.INVALID_TIME_VALUE].join(', '),
  })
  public async getTemperature(
    @Query(
      'time',
      new DefaultValuePipe(Dht11ApiController.defaultTime),
      ParseIntPipe,
      TimeValueValidatorPipe,
    )
    time: number,
  ): Promise<TemperatureResponse> {
    return this.dht11Service.getTemperature(time);
  }
}
