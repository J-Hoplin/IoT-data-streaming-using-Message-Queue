import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dht11ApiModule } from './dht-11-api/dht-11-api.module';
import { ConfigModule } from '@nestjs/config';
import { configOption } from './options/config.option';
import { GlobalLogger } from './infrastructure/middleware/global-logger.middleware';

@Module({
  imports: [Dht11ApiModule, ConfigModule.forRoot(configOption)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalLogger).forRoutes('*');
  }
}
