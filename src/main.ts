import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets('/public');
  app.useStaticAssets('/views');
  app.setViewEngine('pug');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest.js - Lesson 1')
    .setDescription('News and Calculator API description')
    .setVersion('1.0')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
