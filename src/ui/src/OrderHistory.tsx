import { useEffect, useState } from 'react';

export default function OrderHistory({ apiBaseUrl, token, selectedOrderId }: { apiBaseUrl: string; token: string; selectedOrderId: string | null }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedOrderId) return;
    fetch(`${apiBaseUrl}/audit/orders/${selectedOrderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, [selectedOrderId]);

  if (!selectedOrderId) return <p style={{ color: '#888' }}>Selecciona una orden para ver su historial.</p>;

  return (
    <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
      <h3>Historial de la orden #{selectedOrderId}</h3>
      {events.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: '6px' }}>
              <strong>{event.type}</strong> — {new Date(event.createdAt).toLocaleString()} — {event.userEmail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

