import { useEffect, useState } from 'react';

interface Order {
  id: string;
  customerId: string;
  total: number;
  status: string;
}

function App() {
  const [health, setHealth] = useState<string>('Checking...');
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ CORRECTO: usa variable de entorno de Azure
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchHealth = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/health`);
      const data = await response.json();
      setHealth(data.ok ? 'API OK' : 'API Error');
    } catch (error) {
      setHealth('API unreachable');
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px', background: 'white' }}>
      <h1>OrderHub UI</h1>

      <p>
        <strong>Health:</strong> {health}
      </p>

      <button onClick={fetchOrders}>Refresh Orders</button>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
            }}
          >
            <p>ID: {order.id}</p>
            <p>Customer: {order.customerId}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;