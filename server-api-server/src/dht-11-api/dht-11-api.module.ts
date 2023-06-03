import { Module } from '@nestjs/common';
import { Dht11ApiService } from './dht-11-api.service';
import { Dht11ApiController } from './dht-11-api.controller';
import { ConfigModule } from '@nestjs/config';
import influxConfig from 'src/config/config/influx.config';

@Module({
  imports: [ConfigModule.forFeature(influxConfig)],
  providers: [Dht11ApiService],
  controllers: [Dht11ApiController],
})
export class Dht11ApiModule {}
