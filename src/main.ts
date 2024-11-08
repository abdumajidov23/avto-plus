import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  // Agar CORS kerak bo'lsa, uni yoqish
  // app.enableCors();  // Agar CORS kerak bo'lsa, izohni olib tashlang

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Avto Plus')
    .setDescription('Mashinlar, mijozlar va uchrashuvlarni boshqarish uchun API.')
    .setVersion('1.0')
    // .addTag('Mashinlar')
    .addTag('Mijozlar')
    .addTag('Uchrashuvlar')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Serverni ishga tushurish
  await app.listen(PORT, () => {
    console.log()
    console.log(`hello`);
    console.log(`Server http://localhost:${PORT}/api`);
    console.log()

    // console.log(`Swagger hujjatlari: http://localhost:${PORT}/api`);
  });
}

start();
