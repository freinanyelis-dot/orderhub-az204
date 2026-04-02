import { useState } from "react";

export function AddOrder({ onNewOrder }: { onNewOrder: () => void }) {
  const [customerId, setCustomerId] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = { customerId, total: Number(total), status };
    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        setCustomerId("");
        setTotal("");
        setStatus("");
        onNewOrder(); // recarga la lista de órdenes
      }
    } catch (err) {
      console.error("Error al crear orden:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Orden</h2>
      <div>
        <input placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Total" type="number" value={total} onChange={e => setTotal(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} required />
      </div>
      <button type="submit">Crear Orden</button>
    </form>
  );
}
