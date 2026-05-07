import { useEffect, useState } from 'react';

type Order = {
  id: string;
  customerId: string;
  total: number;
  status: string;
};

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/orders`);
      const data = await response.json();
      setOrders(data);
      if (data.length && !selectedOrderId) {
        setSelectedOrderId(data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedOrderId) {
      setMessage('Debes seleccionar una orden y un archivo.');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('orderId', selectedOrderId);
    try {
      const response = await fetch(`${apiBaseUrl}/files`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(`✅ Archivo cargado para la orden ${data.orderId}: ${data.fileName}`);
    } catch (error) {
      console.error(error);
      setMessage('❌ Ocurrió un error al subir el archivo.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#0078d4' }}>OrderHub</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Órdenes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0078d4', color: 'white' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Cliente</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                style={{
                  backgroundColor: selectedOrderId === order.id ? '#e6f3ff' : 'white',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd'
                }}
              >
                <td style={{ padding: '8px' }}>{order.id}</td>
                <td style={{ padding: '8px' }}>{order.customerId}</td>
                <td style={{ padding: '8px' }}>${order.total}</td>
                <td style={{ padding: '8px' }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '1.5rem', border: '1px solid #0078d4', borderRadius: '8px' }}>
        <h3 style={{ color: '#0078d4', marginTop: 0 }}>📎 Adjuntos de la orden</h3>
        <p>Orden seleccionada: <strong>{selectedOrderId || 'Ninguna'}</strong></p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            style={{ flex: 1 }}
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              backgroundColor: '#0078d4',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: uploading ? 'not-allowed' : 'pointer'
            }}
          >
            {uploading ? 'Subiendo...' : 'Subir archivo'}
          </button>
        </div>
        {message && (
          <p style={{ marginTop: '1rem', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;