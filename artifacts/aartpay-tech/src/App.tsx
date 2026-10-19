import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import Service from './pages/service';
import DollarCards from './pages/dollar-cards';
import Electricity from './pages/electricity';
import Escrow from './pages/escrow';
import Crypto from './pages/crypto';
import Airtime from './pages/airtime';
import Betting from './pages/betting';
import Data from './pages/data';

function Protected({ children }: any) {
  const { user } = useAuth();
  const saved = localStorage.getItem('aartpay_user');
  const currentUser = user || (saved ? JSON.parse(saved) : null);
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        
        <Route path="/airtime" element={<Protected><Airtime /></Protected>} />
        <Route path="/data" element={<Protected><Data /></Protected>} />
        <Route path="/betting" element={<Protected><Betting /></Protected>} />
        <Route path="/crypto" element={<Protected><Crypto /></Protected>} />
        <Route path="/escrow" element={<Protected><Escrow /></Protected>} />
        <Route path="/dollar-cards" element={<Protected><DollarCards /></Protected>} />
        <Route path="/electricity" element={<Protected><Electricity /></Protected>} />
        
        <Route path="/gift-cards" element={<Protected><Service /></Protected>} />
        <Route path="/utilities" element={<Protected><Service /></Protected>} />
        <Route path="/transfer" element={<Protected><Service /></Protected>} />
        <Route path="/fund-wallet" element={<Protected><Service /></Protected>} />
        <Route path="/service/:id" element={<Protected><Service /></Protected>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
