import { Controller, Get } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

const orders: CreateOrderDto[] = [
  { id: '1', customerId: 'C123', total: 45.6, status: 'Pending' },
  { id: '2', customerId: 'C456', total: 89.99, status: 'Shipped' },
  { id: '3', customerId: 'C789', total: 120.0, status: 'Delivered' },
];

@Controller('orders')
export class OrdersController {
  @Get()
  findAll(): CreateOrderDto[] {
    return orders;
  }
}