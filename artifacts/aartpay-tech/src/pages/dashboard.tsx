import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const services = [
    { title: "Gift Cards", desc: "Amazon, iTunes & more" },
    { title: "Crypto Trading", desc: "Buy, sell & swap crypto" },
    { title: "Dollar Cards", desc: "Virtual USD card" },
    { title: "TV Subscriptions", desc: "DSTv • GOtv • StarTimes" },
    { title: "Electricity Bills", desc: "Pay PHCN, AEDC & more" },
    { title: "Airtime & Data", desc: "MTN • Airtel • Glo • 9mobile" },
    { title: "Betting Funding", desc: "Bet365 • Sporty • 1xbet" },
    { title: "Utilities", desc: "Water • Internet • Cable" },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#070711', 
      color: '#fff', 
      padding: '0 0 40px 0',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '14px 16px',
        borderBottom: '1px solid #1e1e2f',
        background: '#0c0c18'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800 }}>
          <div style={{ width: 22, height: 22, background: '#8b5cf6', transform: 'rotate(45deg)', borderRadius: 4 }}></div>
          Aart Pay
        </div>
        <div style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 700 }}>Dashboard</div>
      </div>

      {/* Balance Card - Purple Glow - ZERO BALANCE */}
      <div style={{ padding: 16 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #1a1033 0%, #0f0a1e 100%)',
          border: '1px solid #3c2a6b',
          borderRadius: 16,
          padding: 18,
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: 11, color: '#a78bfa', marginBottom: 6 }}>Total Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>₦0.00</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Wallet Balance • Tap Add Funds to start</div>
          
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={()=>navigate('/transfer')} style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 20, padding: '10px', fontSize: 12, fontWeight: 800 }}>Withdraw Now →</button>
            <button onClick={()=>navigate('/fund-wallet')} style={{ flex: 1, background: 'transparent', color: '#fff', border: '1px solid #4c1d95', borderRadius: 20, padding: '10px', fontSize: 12, fontWeight: 700 }}>Add Funds</button>
          </div>

          {/* Instant Withdrawal */}
          <div style={{ 
            marginTop: 14, 
            background: '#0f0a1e', 
            border: '1px solid #7c3aed',
            borderRadius: 12, 
            padding: 12,
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Instant Withdrawal</div>
            <div style={{ fontSize: 10, color: '#a78bfa' }}>24/7 via Flutterwave</div>
          </div>
        </div>
      </div>

      {/* Services Grid - ALL FEATURES */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800 }}>Services</h3>
          <span style={{ fontSize: 11, color: '#6b7280' }}>Everything you need to manage money</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {services.map((s,i)=>(
            <div key={i} style={{ 
              background: '#111122',
              border: '1px solid #1f1f35',
              borderRadius: 12,
              padding: 12,
              cursor: 'pointer'
            }} onClick={()=>navigate('/transfer')}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
