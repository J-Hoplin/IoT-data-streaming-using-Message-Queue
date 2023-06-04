import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import generateSwaggerDocument from './infrastructure/swagger/swagger.config';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';
import { GlobalLogger } from './infrastructure/middleware/global-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('docs', app, generateSwaggerDocument(app));
  await app.listen(3000);
}
bootstrap();
