import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const services = [
    { title: "Gift Cards", desc: "Amazon, iTunes & more", path: "/gift-cards" },
    { title: "Crypto Trading", desc: "Buy, sell & swap", path: "/crypto" },
    { title: "Dollar Cards", desc: "Virtual USD card", path: "/dollar-cards" },
    { title: "TV Subscriptions", desc: "DSTv • GOtv • StarTimes", path: "/tv" },
    { title: "Electricity Bills", desc: "Pay PHCN & more", path: "/electricity" },
    { title: "Airtime & Data", desc: "MTN • Airtel • Glo", path: "/airtime" },
    { title: "Betting Funding", desc: "Bet365 • Sporty", path: "/betting" },
    { title: "Utilities", desc: "Water • Internet", path: "/utilities" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#070711', color: '#fff', paddingBottom: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #1e1e2f', background: '#0c0c18' }}>
        <div style={{ display: 'flex', gap: 8, fontWeight: 800 }}><div style={{ width: 22, height: 22, background: '#8b5cf6', transform: 'rotate(45deg)', borderRadius: 4 }}></div>Aart Pay</div>
        <div style={{ fontSize: 11, color: '#8b5cf6' }}>Dashboard</div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ background: 'linear-gradient(135deg, #1a1033 0%, #0f0a1e 100%)', border: '1px solid #3c2a6b', borderRadius: 16, padding: 18, boxShadow: '0 0 30px rgba(139, 92, 246, 0.25)' }}>
          <div style={{ fontSize: 11, color: '#a78bfa' }}>Total Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>₦0.00</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Tap Add Funds to start</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={()=>navigate('/transfer')} style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 20, padding: '10px', fontWeight: 800 }}>Withdraw Now →</button>
            <button onClick={()=>navigate('/fund-wallet')} style={{ flex: 1, background: 'transparent', color: '#fff', border: '1px solid #4c1d95', borderRadius: 20, padding: '10px' }}>Add Funds</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {services.map((s,i)=>(
            <div key={i} onClick={()=>navigate(s.path)} style={{ background: '#111122', border: '1px solid #1f1f35', borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{s.title}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
