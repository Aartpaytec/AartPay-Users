import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transfer() {
  const nav = useNavigate();
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const banks = ['Access Bank','GTBank','First Bank','UBA','Zenith Bank','Wema Bank','Opay','Moniepoint','Palmpay','Kuda','Fidelity','Union Bank','Sterling','FCMB'];

  const handleTransfer = async () => {
    if(!account || !bank || !amount) {
      alert('Fill all fields');
      return;
    }
    setLoading(true);
    // TODO: Connect to Flutterwave Payout API here in backend
    // await fetch('/api/transfer', { method: 'POST', body: JSON.stringify({account,bank,amount}) })
    setTimeout(()=>{
      setLoading(false);
      alert(`Transfer of ₦${amount} to ${account} (${bank}) initiated!`);
    },1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif', padding: 16 }}>
      <button onClick={()=>nav('/dashboard')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 20, padding: '10px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
        ← Back to Dashboard
      </button>

      <div style={{ maxWidth: 480, margin: '20px auto', background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #eef2f7', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900 }}>Instant Transfer ⚡</h2>
        <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, margin: '0 0 20px' }}>Money arrives in seconds</p>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Account Number</label>
          <input value={account} onChange={e=>setAccount(e.target.value)} placeholder="0123456789" maxLength={10} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14, outline: 'none' }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Bank</label>
          <select value={bank} onChange={e=>setBank(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14, outline: 'none' }}>
            <option value="">Select Bank</option>
            {banks.map(b=><option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Amount ₦</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="5000" type="number" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14, outline: 'none' }} />
        </div>

        <button onClick={handleTransfer} disabled={loading} style={{ width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 800, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Processing...' : 'Transfer Instantly'}
        </button>

        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 12, marginTop: 14, border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>✅ Secured by AartPay ⚡</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>All transfers are secured and arrive in seconds</div>
        </div>
      </div>
    </div>
  );
}
