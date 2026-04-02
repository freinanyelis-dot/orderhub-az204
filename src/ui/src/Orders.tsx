import { useEffect, useState } from "react";
import { AddOrder } from "./AddOrder";

interface Order {
  customerId: string;
  total: number;
  status: string;
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchOrders = () => {
    fetch(`${apiUrl}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error al consultar /orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <AddOrder onNewOrder={fetchOrders} />
      <h2>Órdenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <ul>
          {orders.map((order, idx) => (
            <li key={idx}>
              Cliente: {order.customerId}, Total: ${order.total}, Estado: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
