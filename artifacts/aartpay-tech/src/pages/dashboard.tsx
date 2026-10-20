import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const services = [
    { name: "Escrow", sub: "Secure trading", path: "/escrow" },
    { name: "Gift Cards", sub: "Amazon, iTunes", path: "/gift-cards" },
    { name: "Crypto Trading", sub: "Buy, sell & swap", path: "/crypto" },
    { name: "Dollar Cards", sub: "Virtual USD", path: "/dollar-cards" },
    { name: "TV", sub: "DSTV • GOTV", path: "/tv" },
    { name: "Electricity", sub: "11 Discos", path: "/electricity" },
    { name: "Airtime & Data", sub: "MTN • Glo", path: "/airtime" },
    { name: "Betting", sub: "Fund betting", path: "/betting" },
    { name: "Utilities", sub: "Water • Internet", path: "/utilities" },
  ];
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      <div style={{ padding: 16, background: '#0c0a1a', color: 'white' }}>
        <div style={{ fontSize: 11, color: '#a7a7b7' }}>Welcome</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>AartPay Dashboard</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={() => navigate('/transfer')} style={{ flex: 1, padding: 12, borderRadius: 12, border: 0, background: '#16a34a', color: 'white', fontWeight: 700 }}>Transfer</button>
          <button onClick={() => navigate('/fund-wallet')} style={{ flex: 1, padding: 12, borderRadius: 12, border: 0, background: '#fff', color: '#0c0a1a', fontWeight: 700 }}>Fund Wallet</button>
        </div>
      </div>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {services.map(s => (
          <div key={s.name} onClick={() => navigate(s.path)} style={{ background: 'white', padding: 16, borderRadius: 16, border: '1px solid #eee' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: '#888' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
