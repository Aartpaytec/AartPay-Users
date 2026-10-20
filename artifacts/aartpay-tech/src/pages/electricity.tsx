import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const discos = [
  { id: 'ibadan', name: 'Ibadan DisCo', short: 'IBEDC', color: '#0a1931' },
  { id: 'ikeja', name: 'Ikeja Electric', short: 'IKEDC', color: '#0055a5' },
  { id: 'eko', name: 'Eko Electric', short: 'EKEDC', color: '#d40000' },
  { id: 'abuja', name: 'Abuja DisCo', short: 'AEDC', color: '#006838' },
  { id: 'kano', name: 'Kano DisCo', short: 'KEDCO', color: '#ff8c00' },
  { id: 'enugu', name: 'Enugu DisCo', short: 'EEDC', color: '#6a0dad' },
  { id: 'benin', name: 'Benin DisCo', short: 'BEDC', color: '#008080' },
  { id: 'portharcourt', name: 'PH DisCo', short: 'PHED', color: '#ff4500' },
  { id: 'jos', name: 'Jos DisCo', short: 'JED', color: '#2e8b57' },
  { id: 'kaduna', name: 'Kaduna Electric', short: 'KAEDCO', color: '#4682b4' },
  { id: 'yola', name: 'Yola DisCo', short: 'YEDC', color: '#8b0000' },
  { id: 'aba', name: 'Aba Power', short: 'APLE', color: '#ff1493' },
];

const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export default function Electricity() {
  const nav = useNavigate();
  const [meterType, setMeterType] = useState<'prepaid'|'postpaid'>('prepaid');
  const [selectedDisco, setSelectedDisco] = useState(discos[0]);
  const [meterNo, setMeterNo] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [verifiedName, setVerifiedName] = useState('');
  const [verifying, setVerifying] = useState(false);

  const canVerify = meterNo.length >= 10;
  const canPay = verifiedName && amount && Number(amount) >= 500 && phone.length >= 10;

  const handleVerify = () => {
    if(!canVerify) return;
    setVerifying(true);
    setTimeout(()=>{
      setVerifying(false);
      setVerifiedName('ADEBAYO TUNDE O.'); // demo - later connect real API
    }, 1200);
  };

  const handlePay = () => {
    if(!canPay) return;
    alert(`AartPay Electricity\n\nDisCo: ${selectedDisco.name}\nType: ${meterType}\nMeter: ${meterNo}\nName: ${verifiedName}\nAmount: ₦${Number(amount).toLocaleString()}\n\nProceed to Escrow?`);
    nav('/escrow');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header - AartPay Original */}
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={()=>nav(-1)} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #eef2f7', background: '#fff', fontSize: 18 }}>‹</button>
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Electricity Bill</h2>
          <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>AartPay • Instant & Secure</p>
        </div>
        <div style={{ marginLeft: 'auto', background: '#16a34a', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>ORIGINAL</div>
      </div>

      <div style={{ padding: 16, maxWidth: 520, margin: '0 auto' }}>
        
        {/* Prepaid / Postpaid - Like GiftCards Buy/Sell Tabs */}
        <div style={{ background: '#eef2f7', borderRadius: 14, padding: 4, display: 'flex', marginBottom: 16 }}>
          <button onClick={()=>setMeterType('prepaid')} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: meterType==='prepaid' ? '#fff' : 'transparent', fontWeight: 700, fontSize: 13, boxShadow: meterType==='prepaid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', color: meterType==='prepaid' ? '#16a34a' : '#64748b' }}>Prepaid</button>
          <button onClick={()=>setMeterType('postpaid')} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: meterType==='postpaid' ? '#fff' : 'transparent', fontWeight: 700, fontSize: 13, boxShadow: meterType==='postpaid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', color: meterType==='postpaid' ? '#16a34a' : '#64748b' }}>Postpaid</button>
        </div>

        {/* Select DisCo - Original Grid */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid #eef2f7' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Select Distribution Company</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {discos.map(d=>(
              <div key={d.id} onClick={()=>{ setSelectedDisco(d); setVerifiedName(''); }} style={{ padding: '12px', borderRadius: 12, border: selectedDisco.id===d.id ? '2px solid #16a34a' : '1px solid #eef2f7', background: selectedDisco.id===d.id ? '#f0fdf4' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: d.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>{d.short.slice(0,2)}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{d.short}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meter Details - Original */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid #eef2f7' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Meter Details</div>
          
          <label style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>METER NUMBER</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, marginBottom: 12 }}>
            <input value={meterNo} onChange={e=>{ setMeterNo(e.target.value.replace(/\D/g,'')); setVerifiedName(''); }} placeholder="Enter 10-13 digit meter number" style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14 }} />
            <button onClick={handleVerify} disabled={!canVerify || verifying} style={{ padding: '0 18px', borderRadius: 10, border: 'none', background: canVerify ? '#16a34a' : '#e2e8f0', color: canVerify ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: 12 }}>{verifying ? '...' : 'Verify'}</button>
          </div>

          {verifiedName && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#166534' }}>✓ {verifiedName}</span>
              <span style={{ fontSize: 10, background: '#16a34a', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>Verified</span>
            </div>
          )}

          <label style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>PHONE NUMBER</label>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} placeholder="080..." style={{ width: '100%', padding: '14px', borderRadius: 10, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14, marginTop: 6 }} />
        </div>

        {/* Amount - Original */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, border: '1px solid #eef2f7' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Select Amount</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {quickAmounts.map(a=>(
              <button key={a} onClick={()=>setAmount(String(a))} style={{ padding: '12px', borderRadius: 10, border: String(a)===amount ? '2px solid #16a34a' : '1px solid #e2e8f0', background: String(a)===amount ? '#f0fdf4' : '#fff', fontWeight: 700, fontSize: 13 }}>₦{a.toLocaleString()}</button>
            ))}
          </div>
          <input value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,''))} placeholder="Or enter custom amount (min ₦500)" style={{ width: '100%', padding: '14px', borderRadius: 10, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14 }} />
          {amount && <div style={{ marginTop: 8, fontSize: 11, color: '#16a34a', fontWeight: 600 }}>You pay: ₦{Number(amount).toLocaleString()} • Token delivered instantly</div>}
        </div>

        {/* Pay Button - Original AartPay */}
        <button onClick={handlePay} disabled={!canPay} style={{ width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: canPay ? '#16a34a' : '#e2e8f0', color: canPay ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 15, boxShadow: canPay ? '0 8px 20px rgba(22,163,74,0.25)' : 'none' }}>
          {canPay ? `Pay ₦${Number(amount).toLocaleString()} • ${selectedDisco.short}` : 'Verify meter to continue'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#94a3b8' }}>AartPay Secure • Escrow Protected • 24/7 Support</div>
      </div>
    </div>
  );
}
