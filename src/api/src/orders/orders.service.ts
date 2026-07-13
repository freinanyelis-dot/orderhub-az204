import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { AuditService } from '../audit/audit.service';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly auditService: AuditService,
    private readonly queueService: QueueService,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async create(orderDto: Partial<Order>, user?: any): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    const savedOrder = await this.orderRepository.save(order);
    this.logger.log(`Order created with id ${savedOrder.id} by ${user?.email}`);

    await this.auditService.recordEvent({
      orderId: String(savedOrder.id),
      type: 'ORDER_CREATED',
      userEmail: user?.email,
      data: {
        customerId: savedOrder.customerId,
        total: savedOrder.total,
        status: savedOrder.status,
      },
    });

    await this.queueService.sendOrderCreated(savedOrder.id);

    return savedOrder;
  }
} 