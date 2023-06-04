import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

class pingpong {
  @ApiProperty()
  msg: 'pong';
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiOkResponse({
    type: pingpong,
  })
  getHello(): pingpong {
    return new pingpong();
  }
}
