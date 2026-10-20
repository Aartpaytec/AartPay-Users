import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transfer() {
  const nav = useNavigate();
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [verifying, setVerifying] = useState(false);

  const banks = [
    { name: 'Access Bank', code: '044' },
    { name: 'GTBank', code: '058' },
    { name: 'First Bank', code: '011' },
    { name: 'UBA', code: '033' },
    { name: 'Zenith Bank', code: '057' },
    { name: 'Wema Bank', code: '035' },
    { name: 'Opay', code: '999992' },
    { name: 'Moniepoint', code: '50515' },
    { name: 'Palmpay', code: '999991' },
    { name: 'Kuda', code: '50211' },
  ];

  // AUTO VERIFY ACCOUNT NAME WHEN 10 DIGITS + BANK SELECTED
  useEffect(()=>{
    if(account.length === 10 && bank) {
      setVerifying(true);
      setAccountName('');
      // TODO: Replace with your backend /api/resolve-account
      // This will call Flutterwave Resolve API
      /*
      fetch('/api/resolve-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_number: account, account_bank: bank })
      }).then(res=>res.json()).then(data=>{
        setAccountName(data.account_name);
        setVerifying(false);
      })
      */

      // DEMO FOR NOW - Remove this when you connect real API
      setTimeout(()=>{
        setAccountName('SALAWU AKEEM ADEBAYO'); // This go come from Flutterwave
        setVerifying(false);
      }, 1200);
    } else {
      setAccountName('');
    }
  },[account, bank]);

  const handleTransfer = async () => {
    if(!account || !bank || !amount) { alert('Fill all fields'); return; }
    if(!accountName) { alert('Wait for account name verification'); return; }
    setLoading(true);
    setTimeout(()=>{ setLoading(false); alert(`₦${amount} sent to ${accountName} successfully!`); },1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif', padding: 16 }}>
      <button onClick={()=>nav('/dashboard')} style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 20, padding: '10px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>← Back to Dashboard</button>

      <div style={{ maxWidth: 480, margin: '20px auto', background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #eef2f7' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900 }}>Instant Transfer ⚡</h2>
        <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, margin: '0 0 20px' }}>Money arrives in seconds</p>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Account Number</label>
          <input value={account} onChange={e=>setAccount(e.target.value)} placeholder="0123456789" maxLength={10} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14 }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Bank</label>
          <select value={bank} onChange={e=>setBank(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14 }}>
            <option value="">Select Bank</option>
            {banks.map(b=><option key={b.code} value={b.code}>{b.name}</option>)}
          </select>
        </div>

        {/* ACCOUNT NAME SHOWS HERE */}
        {(verifying || accountName) && (
          <div style={{ background: accountName ? '#f0fdf4' : '#fffbeb', border: `1px solid ${accountName ? '#bbf7d0' : '#fde68a'}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: '#64748b' }}>{verifying ? 'Verifying...' : 'Account Name'}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: accountName ? '#16a34a' : '#d97706', marginTop: 2 }}>
              {verifying ? '⏳ Checking name...' : `✅ ${accountName}`}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>Amount ₦</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="5000" type="number" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 14 }} />
        </div>

        <button onClick={handleTransfer} disabled={loading} style={{ width: '100%', background: accountName ? '#000' : '#9ca3af', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 800, cursor: accountName ? 'pointer' : 'not-allowed' }}>
          {loading ? 'Processing...' : accountName ? `Send to ${accountName.split(' ')[0]}` : 'Transfer Instantly'}
        </button>

        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 12, marginTop: 14, border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>✅ Secured by AartPay ⚡</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>All transfers are secured and arrive in seconds</div>
        </div>
      </div>
    </div>
  );
}
