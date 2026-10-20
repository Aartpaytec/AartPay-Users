import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FundWallet() {
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showOthers, setShowOthers] = useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem('aartpay_user');
    if(saved) setUser(JSON.parse(saved));
  },[]);

  const name = user?.name || 'SALAU WAKEEM';
  
  const mainAccount = { bank: 'Wema Bank', number: '5432145678', name: `AartPay - ${name}` };
  
  const otherAccounts = [
    { bank: 'Moniepoint MFB', number: '8195275750', name: `AartPay - ${name}` },
    { bank: 'Providus Bank', number: '9975432145', name: `AartPay - ${name}` },
  ];

  const copy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0 }}>
        <button onClick={()=>nav(-1)} style={{ border: 'none', background: '#fff', fontSize: 20, cursor: 'pointer' }}>‹</button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Fund Wallet</h2>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        <div style={{ background: '#000', borderRadius: 16, padding: 16, color: '#fff', marginBottom: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Wallet Balance</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>₦ 0.00</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #eef2f7' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 800 }}>Your Account Number</h3>
          
          <div style={{ border: '1.5px solid #000', borderRadius: 12, padding: 14, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>{mainAccount.bank}</div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 1, marginTop: 4 }}>{mainAccount.number}</div>
                <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, marginTop: 4 }}>{mainAccount.name}</div>
              </div>
              <button onClick={()=>copy(mainAccount.number)} style={{ background: copied ? '#16a34a' : '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <button onClick={()=>setShowOthers(!showOthers)} style={{ width: '100%', marginTop: 12, padding: 10, borderRadius: 8, border: '1px dashed #cbd5e1', background: '#f8fafc', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {showOthers ? 'Hide other banks ▲' : 'Show other banks ▼'}
          </button>

          {showOthers && (
            <div style={{ marginTop: 10 }}>
              {otherAccounts.map(acc=>(
                <div key={acc.number} style={{ border: '1px solid #eef2f7', borderRadius: 12, padding: 12, marginBottom: 8, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>{acc.bank}</div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{acc.number}</div>
                  </div>
                  <button onClick={()=>copy(acc.number)} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 700 }}>Copy</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={()=>nav('/dashboard')} style={{ width: '100%', marginTop: 16, padding: 14, borderRadius: 12, border: 'none', background: '#eef2f7', fontWeight: 700, cursor: 'pointer' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}
