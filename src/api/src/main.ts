import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para frontend (Azure o local)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 🌐 Swagger configuración
  const config = new DocumentBuilder()
    .setTitle('OrderHub API')
    .setDescription('API base para la Semana 1 de AZ-204')
    .setVersion('1.0')
    .addServer(process.env.BASE_URL || 'http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  // 🚀 Puerto dinámico (Azure usa process.env.PORT)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API running on: http://localhost:${port}`);
}

bootstrap();