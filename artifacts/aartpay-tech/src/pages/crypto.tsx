import { useState } from 'react';

export default function Crypto() {
  const [cur, setCur] = useState<'USD' | 'NGN'>('NGN');

  const coins = [
    { s: 'BTC', name: 'Bitcoin', usd: '$69,420', ngn: '₦112,450,000', ch: '+2.3%', up: true },
    { s: 'ETH', name: 'Ethereum', usd: '$2,840', ngn: '₦4,250,000', ch: '-0.8%', up: false },
    { s: 'USDT', name: 'Tether', usd: '$1.00', ngn: '₦1,650', ch: '+0.01%', up: true },
    { s: 'SOL', name: 'Solana', usd: '$145.20', ngn: '₦238,000', ch: '+5.1%', up: true },
    { s: 'BNB', name: 'BNB', usd: '$610', ngn: '₦1,010,000', ch: '+1.2%', up: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ background: 'white', padding: '16px 20px', borderBottom: '1px solid #eee' }}>
        <b style={{ fontSize: '18px' }}>Crypto</b>
        <p style={{ fontSize: '12px', color: '#888' }}>Live market rates</p>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: '#eeeeee', borderRadius: '100px', padding: '4px', display: 'flex', width: 'fit-content', gap: '4px' }}>
          <button onClick={() => setCur('NGN')} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', background: cur === 'NGN' ? 'white' : 'transparent', fontWeight: 600, fontSize: '12px' }}>₦ Naira</button>
          <button onClick={() => setCur('USD')} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', background: cur === 'USD' ? 'white' : 'transparent', fontWeight: 600, fontSize: '12px' }}>$ Dollar</button>
        </div>

        <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {coins.map((c) => (
            <div key={c.s} style={{ background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>{c.s[0]}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{c.s}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{cur === 'NGN' ? c.ngn : c.usd}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: c.up ? '#16a34a' : '#dc2626' }}>{c.ch}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '10px', color: '#aaa', textAlign: 'center', marginTop: '16px' }}>Auto-refresh • Powered by AartPay</p>
      </div>
    </div>
  );
}
