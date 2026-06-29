import { useEffect, useState } from 'react';
import CreateOrderForm from './CreateOrderForm';
import OrderHistory from './OrderHistory';

export default function OrdersPage({ apiBaseUrl, token, user, onLogout }: { apiBaseUrl: string; token: string; user: any; onLogout: () => void }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    const response = await fetch(`${apiBaseUrl}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) {
      onLogout();
      return;
    }
    const data = await response.json();
    setOrders(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchOrders(); }, []);

  const canCreateOrders = user?.role === 'admin' || user?.role === 'operator';

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>OrderHub</h1>
        <div>
          <span>{user?.email} ({user?.role})</span>
          <button onClick={onLogout} style={{ marginLeft: '10px' }}>Cerrar sesión</button>
        </div>
      </header>
      <h2>Órdenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes aún.</p>
      ) : (
        <ul>
          {orders.map((order: any) => (
            <li
              key={order.id}
              onClick={() => setSelectedOrderId(String(order.id))}
              style={{ cursor: 'pointer', fontWeight: selectedOrderId === String(order.id) ? 'bold' : 'normal' }}>
              #{order.id} - {order.customerId} - ${order.total} - {order.status}
            </li>
          ))}
        </ul>
      )}
      {canCreateOrders && (
        <CreateOrderForm apiBaseUrl={apiBaseUrl} token={token} onOrderCreated={fetchOrders} />
      )}
      <OrderHistory apiBaseUrl={apiBaseUrl} token={token} selectedOrderId={selectedOrderId} />
    </div>
  );
}