import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

const Page = ({ title }: { title: string }) => (
  <div style={{ minHeight: '100vh', background: '#070711', color: '#fff', padding: 20 }}>
    <button onClick={() => window.history.back()} style={{ background: '#111122', color: '#fff', border: '1px solid #3c2a6b', padding: '8px 16px', borderRadius: 20 }}>← Back</button>
    <h2 style={{ marginTop: 30, fontWeight: 800 }}>{title}</h2>
    <p style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Coming soon on AartPay</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transfer" element={<Page title="Instant Transfer" />} />
      <Route path="/fund-wallet" element={<Page title="Fund Wallet" />} />
      <Route path="/gift-cards" element={<Page title="Gift Cards - Amazon, iTunes" />} />
      <Route path="/crypto" element={<Page title="Crypto Trading" />} />
      <Route path="/dollar-cards" element={<Page title="Dollar Cards" />} />
      <Route path="/tv" element={<Page title="TV Subscriptions" />} />
      <Route path="/electricity" element={<Page title="Electricity Bills" />} />
      <Route path="/airtime" element={<Page title="Airtime & Data" />} />
      <Route path="/betting" element={<Page title="Betting Funding" />} />
      <Route path="/utilities" element={<Page title="Utilities" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
