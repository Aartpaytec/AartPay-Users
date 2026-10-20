import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Transfer from './pages/transfer';
import FundWallet from './pages/fund-wallet';
import Transactions from './pages/transactions';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home go Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* AartPay Core Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/fund-wallet" element={<FundWallet />} />
        <Route path="/transactions" element={<Transactions />} />

        {/* Any wrong link go dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
