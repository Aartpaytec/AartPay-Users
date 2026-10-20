import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const services = [
    { name: "Gift Cards", sub: "Amazon, iTunes & more", path: "/gift-cards" },
    { name: "Crypto Trading", sub: "Buy, sell & swap", path: "/crypto" },
    { name: "Dollar Cards", sub: "Virtual USD card", path: "/dollar-cards" },
    { name: "TV Subscriptions", sub: "DSTv • GOtv • StarTimes", path: "/tv" },
    { name: "Electricity Bills", sub: "PHCN & more", path: "/electricity" },
    { name: "Airtime & Data", sub: "MTN • Airtel • Glo", path: "/airtime" },
    { name: "Betting Funding", sub: "Bet365 • Sporty", path: "/betting" },
    { name: "Utilities", sub: "Water • internet", path: "/utilities" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#070711', color: '#fff' }}>
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e1e2f', background: '#0c0c18' }}>
        <div style={{ fontWeight: 800 }}>Aart Pay</div>
        <div style={{ fontSize: 11, color: '#8b5cf6' }}>Dashboard</div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ background: '#111122', borderRadius: 16, padding: 18, border: '1px solid #3c2a6b' }}>
          <div style={{ fontSize: 11, color: '#a78bfa' }}>Total Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>₦0.00</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={() => navigate('/transfer')} style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 20, padding: '10px', fontWeight: 800 }}>Withdraw Now →</button>
            <button onClick={() => navigate('/fund-wallet')} style={{ flex: 1, background: 'transparent', color: '#fff', border: '1px solid #4c1d95', borderRadius: 20, padding: '10px' }}>Add Funds</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 40px' }}>
        <h3 style={{ fontSize: 13, marginBottom: 12 }}>Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {services.map((s, i) => (
            <div key={i} onClick={() => navigate(s.path)} style={{ background: '#111122', border: '1px solid #1f1f35', borderRadius: 12, padding: 12, cursor: 'pointer' }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{s.name}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
