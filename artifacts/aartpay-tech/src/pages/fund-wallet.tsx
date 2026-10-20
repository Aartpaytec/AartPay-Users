import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FundWallet() {
  const nav = useNavigate();
  const [copied, setCopied] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{
    const saved = localStorage.getItem('aartpay_user');
    if(saved) setUser(JSON.parse(saved));
  },[]);

  const virtualAccounts = [
    { bank: 'Wema Bank', number: '5432145678', name: 'AartPay - SALAU WAKEEM' },
    { bank: 'Moniepoint MFB', number: '8195275750', name: 'AartPay - SALAU WAKEEM' },
    { bank: 'Providus Bank', number: '9975432145', name: 'AartPay - SALAU WAKEEM' },
  ];

  const copy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(num);
    setTimeout(()=>setCopied(''), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0 }}>
        <button onClick={()=>nav(-1)} style={{ border: 'none', background: '#fff', fontSize: 20 }}>‹</button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Fund Wallet</h2>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        <div style={{ background: '#000', borderRadius: 16, padding: 16, color: '#fff', marginBottom: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Wallet Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>₦ 0.00</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #eef2f7' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>Your Account Numbers</h3>
          
          {virtualAccounts.map(acc=>(
            <div key={acc.number} style={{ border: '1px solid #eef2f7', borderRadius: 12, padding: 14, marginBottom: 10, background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{acc.bank}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1, marginTop: 2 }}>{acc.number}</div>
                  <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700, marginTop: 4 }}>{acc.name}</div>
                </div>
                <button onClick={()=>copy(acc.number)} style={{ background: copied===acc.number ? '#16a34a' : '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700 }}>
                  {copied===acc.number ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={()=>nav('/dashboard')} style={{ width: '100%', marginTop: 16, padding: 14, borderRadius: 12, border: 'none', background: '#eef2f7', fontWeight: 700 }}>Back to Dashboard</button>
      </div>
    </div>
  );
}
