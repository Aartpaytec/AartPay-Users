import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Transfer from './pages/transfer';
import FundWallet from './pages/fund-wallet';
import Transactions from './pages/transactions';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/fund-wallet" element={<FundWallet />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
