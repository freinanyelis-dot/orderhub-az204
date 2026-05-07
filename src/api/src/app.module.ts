import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HealthModule } from './health/health.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [OrdersModule, HealthModule, FilesModule],
})
export class AppModule {}