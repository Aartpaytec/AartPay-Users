import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const utilitiesList = [
  { id: 'water', name: 'Water Bill', desc: 'Lagos Water & More', icon: '💧', color: '#0ea5e9', available: true },
  { id: 'internet', name: 'Internet', desc: 'Smile, Spectranet, Fibre', icon: '🌐', color: '#8b5cf6', available: true },
  { id: 'education', name: 'Education', desc: 'WAEC, JAMB, NECO', icon: '🎓', color: '#f59e0b', available: true },
  { id: 'toll', name: 'Toll Payment', desc: 'LCC, Lekki Toll Gate', icon: '🚗', color: '#ef4444', available: false },
  { id: 'estate', name: 'Estate Bill', desc: 'Service Charge & Dues', icon: '🏠', color: '#16a34a', available: false },
  { id: 'waste', name: 'Waste Bill', desc: 'LAWMA, PSP', icon: '♻️', color: '#06b6d4', available: true },
];

const internetProviders = [
  { name: 'Smile', price: '₦7,000 - ₦30,000' },
  { name: 'Spectranet', price: '₦7,000 - ₦25,000' },
  { name: 'FibreOne', price: '₦12,000 - ₦50,000' },
];

const educationPins = [
  { name: 'WAEC Result Checker', price: 4000, sub: 'PIN • Instant' },
  { name: 'JAMB e-PIN', price: 4700, sub: 'UTME Registration' },
  { name: 'NECO Token', price: 1500, sub: 'Result Checker' },
];

export default function Utilities() {
  const nav = useNavigate();
  const [active, setActive] = useState('water');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={()=>nav(-1)} style={{ border: 'none', background: '#fff', fontSize: 20 }}>‹</button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Utilities</h2>
        <span style={{ color: '#16a34a', fontWeight: 700, fontSize: 12 }}>AartPay Original</span>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {utilitiesList.map(u=>(
            <div key={u.id} onClick={()=>u.available && setActive(u.id)} style={{ background: active===u.id ? '#16a34a' : '#fff', border: active===u.id ? '2px solid #16a34a' : '1px solid #eef2f7', borderRadius: 14, padding: '14px 8px', textAlign: 'center', cursor: u.available?'pointer':'not-allowed', opacity: u.available?1:0.6 }}>
              <div style={{ fontSize: 22 }}>{u.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 800, marginTop: 6, color: active===u.id ? '#fff' : '#000' }}>{u.name}</div>
              <div style={{ fontSize: 8, color: active===u.id ? '#dcfce7' : '#64748b', marginTop: 2 }}>{u.available ? u.desc : 'Coming Soon'}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #eef2f7' }}>
          {active==='water' && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>💧 Water Bill Payment</h3>
              <input placeholder="Enter Customer ID / Account No" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 10 }} />
              <input placeholder="Amount" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <button onClick={()=>nav('/escrow')} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 12, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 800 }}>Pay Water Bill • Escrow Safe</button>
            </div>
          )}
          {active==='internet' && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>🌐 Internet Subscription</h3>
              {internetProviders.map(p=>(
                <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #f8fafc' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>{p.price}</span>
                </div>
              ))}
              <button onClick={()=>nav('/escrow')} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 12, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 800 }}>Subscribe Internet</button>
            </div>
          )}
          {active==='education' && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>🎓 Education PINs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {educationPins.map(pin=>(
                  <div key={pin.name} style={{ border: '1px solid #eef2f7', borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{pin.name}</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>{pin.sub}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, marginTop: 6 }}>₦{pin.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>nav('/escrow')} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 12, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 800 }}>Buy Education PIN</button>
            </div>
          )}
          {active==='waste' && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>♻️ Waste / LAWMA</h3>
              <input placeholder="Enter PSP Account No" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <button onClick={()=>nav('/escrow')} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 12, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 800 }}>Pay LAWMA</button>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', fontSize: 10, color: '#94a3b8', marginTop: 12 }}>AartPay Original Utilities • All bills in one place</div>
      </div>
    </div>
  );
}
