import { app, InvocationContext } from "@azure/functions";
import * as sql from "mssql";

async function updateOrderStatus(orderId: number): Promise<void> {
    const pool = await sql.connect({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST!,
        database: process.env.DB_NAME,
        options: { encrypt: true },
    });

    await pool.request()
        .input('id', sql.Int, orderId)
        .query("UPDATE orders SET status = 'Processed' WHERE id = @id");

    await pool.close();
}

export async function ProcessOrderQueue(queueItem: unknown, context: InvocationContext): Promise<void> {
    context.log('Processing order event:', queueItem);

    const orderId = (queueItem as { orderId: number }).orderId;
    context.log(`Order ID received: ${orderId}`);

    try {
        await updateOrderStatus(orderId);
        context.log(`Order ${orderId} updated to Processed`);
    } catch (error) {
        context.log(`Error updating order ${orderId}:`, error);
        throw error;
    }
}

app.storageQueue('ProcessOrderQueue', {
    queueName: 'order-processing',
    connection: 'AZURE_STORAGE_CONNECTION_STRING',
    handler: ProcessOrderQueue
}); 