import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { HealthModule } from './health/health.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SecretsModule } from './secrets/secrets.module';
import { AuditModule } from './audit/audit.module';
import { AppController } from './app.controller';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.DB_TYPE === 'mssql'
        ? {
            type: 'mssql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 1433),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true, // solo para laboratorio
            options: {
              encrypt: true,
              trustServerCertificate: false,
            },
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: process.env.DB_HOST?.includes('azure.com') ? { rejectUnauthorized: false } : false,
          },
    ),
    OrdersModule,
    HealthModule,
    FilesModule,
    AuthModule,
    UsersModule,
    SecretsModule,
    AuditModule,
    QueueModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 