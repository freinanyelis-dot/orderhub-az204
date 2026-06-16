import { Injectable, Logger } from '@nestjs/common';
import { CosmosClient } from '@azure/cosmos';

@Injectable()
export class AuditService {
  private client: CosmosClient;
  private readonly logger = new Logger(AuditService.name);

  constructor() {
    this.client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT!,
      key: process.env.COSMOS_KEY!,
    });
  }

  private getContainer() {
    const database = this.client.database(process.env.COSMOS_DATABASE_ID!);
    return database.container(process.env.COSMOS_CONTAINER_ID!);
  }

  async recordEvent(event: {
    orderId: string;
    type: string;
    userEmail?: string;
    data?: Record<string, any>;
  }) {
    const container = this.getContainer();
    const document = {
      id: `${event.type}-${event.orderId}-${Date.now()}`,
      orderId: event.orderId,
      type: event.type,
      userEmail: event.userEmail || 'system',
      data: event.data || {},
      createdAt: new Date().toISOString(),
    };
    await container.items.create(document);
    this.logger.log(`Event ${event.type} recorded for order ${event.orderId}`);
    return document;
  }

  async findByOrderId(orderId: string) {
    const container = this.getContainer();
    const query = {
      query: 'SELECT * FROM c WHERE c.orderId = @orderId ORDER BY c.createdAt DESC',
      parameters: [{ name: '@orderId', value: orderId }],
    };
    const { resources } = await container.items.query(query).fetchAll();
    this.logger.log(`Found ${resources.length} events for order ${orderId}`);
    return resources;
  }
}