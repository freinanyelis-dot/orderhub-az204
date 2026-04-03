import { useEffect, useState } from 'react';

interface Order {
  id: string;
  customerId: string;
  total: number;
  status: string;
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', background: 'white' }}>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <p>ID: {order.id}</p>
          <p>Customer: {order.customerId}</p>
          <p>Total: ${order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;