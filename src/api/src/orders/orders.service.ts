import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    { id: '1', customerId: 'C001', total: 100, status: 'Pending' },
    { id: '2', customerId: 'C002', total: 250, status: 'Shipped' },
    { id: '3', customerId: 'C003', total: 75, status: 'Delivered' },
  ];

  findAll(): Order[] {
    return this.orders;
  }

  create(orderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      ...orderDto,
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}

  create(orderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      ...orderDto,
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}
