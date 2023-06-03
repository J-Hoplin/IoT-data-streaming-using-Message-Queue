import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import generateSwaggerDocument from './infrastructure/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('docs', app, generateSwaggerDocument(app));
  await app.listen(3000);
}
bootstrap();
