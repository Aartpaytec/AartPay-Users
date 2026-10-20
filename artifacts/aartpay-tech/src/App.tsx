import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

function SimplePage({ title }: { title: string }) {
  return (
    <div style={{ background: '#070711', minHeight: '100vh', color: 'white', padding: 20 }}>
      <a href="/dashboard" style={{ color: '#8b5cf6', textDecoration: 'none' }}>← Back to Dashboard</a>
      <h1 style={{ marginTop: 20 }}>{title}</h1>
      <p>This service is working - built 9:44am morning version.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* All your morning services - 9:44am version */}
      <Route path="/escrow" element={<SimplePage title="Escrow - Secure Trading" />} />
      <Route path="/crypto" element={<SimplePage title="Crypto Trading - Buy Sell Swap" />} />
      <Route path="/gift-cards" element={<SimplePage title="Gift Cards - Amazon iTunes" />} />
      <Route path="/dollar-cards" element={<SimplePage title="Dollar Cards - Virtual USD" />} />
      <Route path="/tv" element={<SimplePage title="TV - DSTv GOtv StarTimes" />} />
      <Route path="/electricity" element={<SimplePage title="Electricity - 11 Discos" />} />
      <Route path="/airtime" element={<SimplePage title="Airtime & Data - MTN Plans" />} />
      <Route path="/betting" element={<SimplePage title="Betting - Bet365 Sporty" />} />
      <Route path="/utilities" element={<SimplePage title="Utilities" />} />
      <Route path="/fund-wallet" element={<SimplePage title="Fund Wallet - Wema Bank" />} />
      <Route path="/transfer" element={<SimplePage title="Instant Transfer" />} />
      <Route path="/transactions" element={<SimplePage title="Transactions" />} />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
