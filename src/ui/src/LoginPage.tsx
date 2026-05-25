import { useState } from 'react';

export default function LoginPage({ apiBaseUrl, onLogin }: { apiBaseUrl: string; onLogin: (token: string, user: any) => void }) {
  const [email, setEmail] = useState('admin@orderhub.com');
  const [password, setPassword] = useState('Admin123');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setMessage('Credenciales incorrectas');
      return;
    }
    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    onLogin(data.accessToken, data.user);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>OrderHub</h1>
      <p>Inicia sesión para gestionar órdenes.</p>
      <form onSubmit={handleLogin}>
        <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /></div>
        <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /></div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}