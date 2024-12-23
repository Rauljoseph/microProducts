import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true, // Si necesitas enviar cookies o encabezados de autorización
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('server listening on PORT', process.env.PORT);
}
bootstrap();