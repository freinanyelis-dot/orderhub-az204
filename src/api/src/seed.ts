import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  await usersService.create('admin@orderhub.com', 'Admin123', 'admin');

  console.log('Seed completado');
  await app.close();
}

bootstrap();