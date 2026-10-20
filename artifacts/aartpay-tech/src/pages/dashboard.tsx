import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const navigate = useNavigate();
  const services = [
    { name: "Escrow", sub: "Secure trading", path: "/escrow" },
    { name: "Gift Cards", sub: "Amazon, iTunes", path: "/gift-cards" },
    { name: "Crypto Trading", sub: "Buy, sell & swap", path: "/crypto" },
    { name: "Dollar Cards", sub: "Virtual USD", path: "/dollar-cards" },
    { name: "TV Sub", sub: "DSTV • GOTV", path: "/tv" },
    { name: "Electricity", sub: "11 Discos", path: "/electricity" },
    { name: "Airtime & Data", sub: "MTN • Glo", path: "/airtime" },
    { name: "Betting", sub: "Fund betting", path: "/betting" },
    { name: "Utilities", sub: "Water • Internet", path: "/utilities" },
  ];
  return (
    <div style={{ minHeight: '100vh', background: '#070711', color: '#fff' }}>
      <div style={{ padding: 16, background: '#0c0c18', borderBottom: '1px solid #1f1f35', fontWeight: 800 }}>Aart Pay - Original</div>
      <div style={{ padding: 16 }}>
        <div style={{ background: '#111122', padding: 18, borderRadius: 16, border: '1px solid #3c2a6b' }}>
          <div style={{ fontSize: 11, color: '#a78bfa' }}>Total Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>₦0.00</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button onClick={() => navigate('/transfer')} style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 20, padding: 10, fontWeight: 800 }}>Withdraw</button>
            <button onClick={() => navigate('/fund-wallet')} style={{ flex: 1, background: 'transparent', color: '#fff', border: '1px solid #4c1d95', borderRadius: 20, padding: 10 }}>Add Funds</button>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 16px 40px' }}>
        <h3>Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          {services.map((s,i) => (
            <div key={i} onClick={() => navigate(s.path)} style={{ background: '#111122', border: '1px solid #1f1f35', borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
