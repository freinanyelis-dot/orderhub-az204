import { Injectable } from '@nestjs/common';
import { QueueClient } from '@azure/storage-queue';

@Injectable()
export class QueueService {
  private client = new QueueClient(
    process.env.AZURE_STORAGE_CONNECTION_STRING!,
    process.env.QUEUE_NAME || 'order-processing',
  );

  async sendOrderCreated(orderId: number) {
    const message = Buffer.from(JSON.stringify({ orderId })).toString('base64');
    await this.client.sendMessage(message);
  }
}