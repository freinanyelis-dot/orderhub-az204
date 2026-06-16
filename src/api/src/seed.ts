import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepo = app.get(getRepositoryToken(User));

  const hashedPassword = await bcrypt.hash('Admin123', 10);
  await userRepo.update({ email: 'admin@orderhub.com' }, { password: hashedPassword });

  console.log('Contraseña actualizada');
  await app.close();
}

bootstrap();