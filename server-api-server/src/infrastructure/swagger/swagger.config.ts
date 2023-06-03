import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTag } from './swagger.tags';
import { INestApplication } from '@nestjs/common';

const documentConfig = new DocumentBuilder()
  .setTitle('Rabbit MQ - Influx DB API')
  .setDescription('Rabbit MQ - Influx DB API')
  .setVersion('1.0')
  .setContact(
    'hoplin',
    'https://github.com/J-hoplin1',
    'jhoplin7259@gmail.com',
  );

SwaggerTag.forEach((tag: SwaggerTag) => {
  documentConfig.addTag(tag.tag, tag.description);
});

export default function generateSwaggerDocument(app: INestApplication) {
  return SwaggerModule.createDocument(app, documentConfig.build());
}
