import { useState } from 'react';
import LoginPage from './LoginPage';
import OrdersPage from './OrdersPage';

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (accessToken: string, userData: any) => {
    setToken(accessToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <LoginPage apiBaseUrl={apiBaseUrl} onLogin={handleLogin} />;
  }

  return <OrdersPage apiBaseUrl={apiBaseUrl} token={token} user={user} onLogout={handleLogout} />;
}

export default App;