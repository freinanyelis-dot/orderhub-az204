import { useState } from 'react';
import LoginPage from './LoginPage';
import OrdersPage from './OrdersPage';

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const getStoredToken = () => {
    const t = localStorage.getItem('token');
    if (!t || t.startsWith('{')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    return t;
  };

  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (accessToken: string, userData: any) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
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