import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

// Simple Page Template for all services
const ServicePage = ({ title }: { title: string }) => (
  <div style={{ minHeight: '100vh', background: '#070711', color: '#fff', padding: 20, fontFamily: 'Inter, sans-serif' }}>
    <button 
      onClick={() => window.history.back()}
      style={{ background: '#111122', color: '#fff', border: '1px solid #3c2a6b', padding: '8px 16px', borderRadius: 20, fontSize: 12, cursor: 'pointer' }}
    >
      ← Back to Dashboard
    </button>
    <div style={{ marginTop: 40, textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, background: '#1a1033', border: '1px solid #3c2a6b', borderRadius: 16, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✨</div>
      <h2 style={{ fontSize: 20, fontWeight: 800 }}>{title}</h2>
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Coming soon — AartPay will power this service</p>
      <div style={{ marginTop: 20, background: '#111122', border: '1px solid #1f1f35', borderRadius: 12, padding: 16, maxWidth: 320, margin: '20px auto 0' }}>
        <div style={{ fontSize: 11, color: '#a78bfa' }}>Status</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>Under Development • Dark Purple Theme</div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Core Wallet Routes */}
        <Route path="/transfer" element={<ServicePage title="Instant Transfer" />} />
        <Route path="/fund-wallet" element={<ServicePage title="Fund Wallet" />} />

        {/* ✅ FIXED: Each service get its own page now — no more same thing! */}
        <Route path="/gift-cards" element={<ServicePage title="Gift Cards — Amazon, iTunes & More" />} />
        <Route path="/crypto" element={<ServicePage title="Crypto Trading — Buy, Sell & Swap" />} />
        <Route path="/dollar-cards" element={<ServicePage title="Dollar Cards — Virtual USD Card" />} />
        <Route path="/tv" element={<ServicePage title="TV Subscriptions — DSTv, GOtv, StarTimes" />} />
        <Route path="/electricity" element={<ServicePage title="Electricity Bills — PH
