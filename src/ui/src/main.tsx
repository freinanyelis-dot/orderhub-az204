import { useEffect, useState } from "react";

interface Order {
  customerId: string;
  total: number;
  status: string;
}

function App() {
  const [health, setHealth] = useState<string>("Loading...");
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderCustomer, setNewOrderCustomer] = useState("");
  const [newOrderTotal, setNewOrderTotal] = useState(0);

  // URL de la API desde variable de entorno
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Consultar /health al cargar
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.json())
      .then(data => setHealth(data.ok ? "API está viva ✅" : "API no responde ❌"))
      .catch(() => setHealth("Error al conectar con la API ❌"));
  }, []);

  // ✅ Consultar /orders al cargar
  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  // ✅ Función para agregar una orden
  const addOrder = () => {
    fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: newOrderCustomer,
        total: newOrderTotal,
        status: "Pending"
      }),
    })
      .then(res => res.json())
      .then(order => setOrders([...orders, order]))
      .catch(err => console.error(err));

    // Limpiar inputs
    setNewOrderCustomer("");
    setNewOrderTotal(0);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>OrderHub SPA</h1>
      <p>{health}</p>

      <h2>Órdenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes aún.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {order.customerId} - ${order.total} - {order.status}
            </li>
          ))}
        </ul>
      )}

      <h2>Agregar nueva orden</h2>
      <input
        placeholder="Customer ID"
        value={newOrderCustomer}
        onChange={e => setNewOrderCustomer(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total"
        value={newOrderTotal}
        onChange={e => setNewOrderTotal(Number(e.target.value))}
      />
      <button onClick={addOrder}>Agregar Orden</button>
    </div>
  );
}

export default App;