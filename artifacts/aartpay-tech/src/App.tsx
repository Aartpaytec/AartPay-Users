import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';

function Page({ title, children }: any) {
  const nav = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#070711', color: '#fff' }}>
      <div style={{ padding: 14, borderBottom: '1px solid #1f1f35', background: '#0c0c18', display: 'flex', gap: 10 }}>
        <button onClick={() => nav(-1)} style={{ background: '#1f1f35', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8 }}>← Back</button>
        <span style={{ fontWeight: 800 }}>{title}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function EscrowPage() {
  return (
    <Page title="Escrow Service - Secure Trading">
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ background: '#111122', padding: 16, borderRadius: 12, border: '1px solid #3c2a6b' }}>
          <h3>🛡️ Create New Escrow</h3>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>Secure your transactions between buyer & seller</p>
          <button style={{ marginTop: 10, background: '#8b5cf6', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 8, width: '100%' }}>+ Create Escrow Transaction</button>
        </div>
        <div style={{ background: '#111122', padding: 16, borderRadius: 12, border: '1px solid #1f1f35' }}>
          <h4>My Escrows</h4>
          <div style={{ marginTop: 10, fontSize: 12, color: '#6b7280' }}>No active escrow - Create one to start secure trade</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#111122', padding: 12, borderRadius: 10, border: '1px solid #1f1f35' }}><b>Pending</b><br/>0</div>
          <div style={{ background: '#111122', padding: 12, borderRadius: 10, border: '1px solid #1f1f35' }}><b>Completed</b><br/>0</div>
        </div>
      </div>
    </Page>
  );
}

function CryptoPage() {
  return (
    <Page title="Crypto Trading - Buy, Sell & Swap">
      <div style={{ display: 'grid', gap: 10 }}>
        {[
          { name: 'Bitcoin BTC', price: '$68,450', change: '+2.5%' },
          { name: 'USDT', price: '$1.00', change: '0.0%' },
          { name: 'Ethereum ETH', price: '$3,200', change: '+1.2%' },
          { name: 'BNB', price: '$620', change: '+0.8%' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#111122', padding: 14, borderRadius: 12, border: '1px solid #1f1f35', display: 'flex', justifyContent: 'space-between' }}>
            <div><b>{c.name}</b><br/><span style={{ fontSize: 11, color: '#9ca3af' }}>{c.price}</span></div>
            <div style={{ color: '#10b981' }}>{c.change}</div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button style={{ flex: 1, background: '#10b981', border: 'none', color: '#fff', padding: 12, borderRadius: 10 }}>Buy Crypto</button>
          <button style={{ flex: 1, background: '#ef4444', border: 'none', color: '#fff', padding: 12, borderRadius: 10 }}>Sell Crypto</button>
        </div>
        <button style={{ background: '#8b5cf6', border: 'none', color: '#fff', padding: 12, borderRadius: 10 }}>Swap BTC → USDT</button>
      </div>
    </Page>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/escrow" element={<EscrowPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/gift-cards" element={<Page title="Gift Cards"><div style={{ display: 'grid', gap: 10 }}>{['Amazon $100 - ₦150k', 'iTunes $50 - ₦40k', 'Steam $100', 'Google Play $50'].map((x,i)=><div key={i} style={{ background: '#111122', padding: 14, borderRadius: 10, border: '1px solid #1f1f35' }}>{x}</div>)}</div></Page>} />
        <Route path="/dollar-cards" element={<Page title="Dollar Cards"><div style={{ background: '#111122', padding: 16, borderRadius: 12 }}>Virtual USD Card - $5 creation fee - Works for Netflix, Spotify</div></Page>} />
        <Route path="/tv" element={<Page title="TV Subscription"><div> DSTV, GOTV, StarTimes - Enter decoder number </div></Page>} />
        <Route path="/electricity" element={<Page title="Electricity - 11 Discos"><div style={{ display: 'grid', gap: 8 }}>{['Eko', 'Ibadan', 'Ikeja', 'Abuja', 'Kano', 'Enugu', 'Benin', 'Port Harcourt', 'Jos', 'Kaduna', 'Yola'].map((d,i)=><div key={i} style={{ background: '#111122', padding: 12, borderRadius: 10, border: '1px solid #10b981' }}>{d} Disco</div>)}</div></Page>} />
        <Route path="/airtime" element={<Page title="Airtime & Data"><div style={{ display: 'grid', gap: 8 }}>{['MTN 1GB - N300', 'MTN 2GB - N500', 'MTN 5GB - N1000', 'MTN 10GB - N2500'].map((x,i)=><div key={i} style={{ background: '#111122', padding: 12, borderRadius: 10, border: '1px solid #1f1f35' }}>{x}</div>)}</div></Page>} />
        <Route path="/betting" element={<Page title="Betting Funding"><div>Bet9ja, SportyBet, 1xBet funding</div></Page>} />
        <Route path="/utilities" element={<Page title="Utilities"><div>Water, Internet, Education bills</div></Page>} />
        <Route path="/transfer" element={<Page title="Instant Transfer - Withdraw"><div>Enter bank account to withdraw</div></Page>} />
        <Route path="/fund-wallet" element={<Page title="Fund Wallet"><div style={{ background: '#111122', padding: 16, borderRadius: 12 }}><b>Wema Bank</b><br/>5432145678<br/>Salawu Akeem<br/><button style={{ marginTop: 10, background: '#8b5cf6', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 8 }}>Copy Number</button></div></Page>} />
      </Routes>
    </BrowserRouter>
  );
}
