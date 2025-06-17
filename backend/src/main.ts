import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    ...(process.env.USER_URL ? process.env.USER_URL.split(',') : []),
    'http://localhost:3001',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  });

  const config = new DocumentBuilder()
    .setTitle('Secure Chat API')
    .setDescription('API para comunicación cifrada punto a punto')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
