import { useState } from 'react';

export default function CreateOrderForm({ apiBaseUrl, token, onOrderCreated }: { apiBaseUrl: string; token: string; onOrderCreated: () => void }) {
  const [customerId, setCustomerId] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${apiBaseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId, total: Number(total), status }),
    });
    setCustomerId('');
    setTotal('');
    setStatus('Pending');
    onOrderCreated();
  };

  return (
    <div>
      <h3>Crear nueva orden</h3>
      <form onSubmit={handleSubmit}>
        <div><input value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Cliente" /></div>
        <div><input type="number" value={total} onChange={e => setTotal(e.target.value)} placeholder="Total" /></div>
        <div>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Crear orden</button>
      </form>
    </div>
  );
}