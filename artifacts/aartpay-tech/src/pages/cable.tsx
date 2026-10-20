import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const providers = [
  { id: 'dstv', name: 'DStv', desc: 'Your home of drama & football', color: '#0055a5' },
  { id: 'gotv', name: 'GOtv', desc: 'Entertainment for the family', color: '#ff6a00' },
  { id: 'startimes', name: 'StarTimes', desc: 'Digital TV for all', color: '#00a651' },
  { id: 'startimesOn', name: 'StarTimes ON', desc: 'Streaming app', color: '#ffcc00' },
  { id: 'showmax', name: 'SHOWMAX', desc: 'Movies & Series', color: '#e6007e' },
];

const packages: any = {
  dstv: [
    { name: 'DStv Renewal', sub: 'Enter Amount', price: 0, isCustom: true },
    { name: 'DStv Padi', sub: '1 Month', price: 4400 },
    { name: 'DStv Yanga', sub: '1 Month', price: 6000 },
    { name: 'DStv Confam', sub: '1 Month', price: 11000 },
    { name: 'DStv Compact', sub: '1 Month', price: 19000 },
    { name: 'DStv Compact Plus', sub: '1 Month', price: 30000 },
    { name: 'DStv Stream Premium', sub: '1 Month', price: 44500 },
  ],
  gotv: [
    { name: 'GOtv Renewal', sub: 'Enter Amount', price: 0, isCustom: true },
    { name: 'GOtv Smallie', sub: '1 Month', price: 1500 },
    { name: 'GOtv Jinja', sub: '1 Month', price: 3000 },
    { name: 'GOtv Jolli', sub: '1 Month', price: 4500 },
    { name: 'GOtv Max', sub: '1 Month', price: 7200 },
    { name: 'GOtv Supa', sub: '1 Month', price: 11100 },
  ],
  startimes: [
    { name: 'Nova', sub: '1 Month', price: 1500 },
    { name: 'Basic', sub: '1 Month', price: 2600 },
    { name: 'Smart', sub: '1 Month', price: 3600 },
    { name: 'Classic', sub: '1 Month', price: 4500 },
  ]
};

export default function Cable() {
  const nav = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [showProvider, setShowProvider] = useState(false);
  const [tab, setTab] = useState<'hot'|'premium'>('hot');
  const [smartcard, setSmartcard] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [customAmount, setCustomAmount] = useState('');

  const list = packages[selectedProvider.id] || packages['dstv'];
  const displayList = tab === 'hot' ? list.slice(0, 6) : list;
  const finalAmount = selectedPkg?.isCustom ? Number(customAmount) : selectedPkg?.price;
  const canPay = smartcard.length >= 10 && finalAmount > 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={()=>nav(-1)} style={{ border: 'none', background: 'none', fontSize: 20 }}>‹</button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>TV</h2>
        <button onClick={()=>nav('/history')} style={{ border: 'none', background: 'none', color: '#16a34a', fontWeight: 600, fontSize: 13 }}>History</button>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Provider Selector - AartPay Original */}
        <div onClick={()=>setShowProvider(true)} style={{ background: '#fff', margin: '12px 16px', borderRadius: 14, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eef2f7', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: selectedProvider.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{selectedProvider.name.slice(0,2).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedProvider.name}</div>
              <div style={{ fontSize: 11, color: '#16a34a' }}>{selectedProvider.desc}</div>
            </div>
          </div>
          <span style={{ color: '#94a3b8' }}>›</span>
        </div>

        {/* Smartcard Input */}
        <div style={{ background: '#fff', margin: '0 16px', borderRadius: 14, padding: 16, border: '1px solid #eef2f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Smartcard Number</span>
            <span style={{ fontSize: 11, color: '#64748b' }}>Beneficiaries ›</span>
          </div>
          <input value={smartcard} onChange={e=>setSmartcard(e.target.value.replace(/\D/g,''))} placeholder="Enter Your Smartcard Number" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px', outline: 'none', fontSize: 14 }} />
        </div>

        {/* Hot offers / Premium - Original Tabs */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #eef2f7', paddingBottom: 8 }}>
            <button onClick={()=>setTab('hot')} style={{ border: 'none', background: 'none', fontWeight: tab==='hot'?800:400, fontSize: 14, color: tab==='hot'?'#000':'#64748b', borderBottom: tab==='hot'?'2px solid #16a34a':'none', paddingBottom: 6 }}>Hot offers</button>
            <button onClick={()=>setTab('premium')} style={{ border: 'none', background: 'none', fontWeight: tab==='premium'?800:400, fontSize: 14, color: tab==='premium'?'#000':'#64748b', borderBottom: tab==='premium'?'2px solid #16a34a':'none', paddingBottom: 6 }}>Premium</button>
          </div>
        </div>

        {/* Packages Grid - Original AartPay */}
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {displayList.map((pkg:any,i:number)=>(
            <div key={i} onClick={()=>{ setSelectedPkg(pkg); if(pkg.isCustom) setCustomAmount(''); }} style={{ background: '#fff', borderRadius: 12, padding: '14px', border: selectedPkg?.name===pkg.name ? '2px solid #16a34a' : '1px solid #eef2f7', cursor: 'pointer' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{pkg.name}</div>
              <div style={{ fontSize: 10, color: '#64748b', marginBottom: 6 }}>{pkg.sub}</div>
              {pkg.isCustom ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#16a34a', fontSize: 12, fontWeight: 600 }}>Enter Amount <span>›</span></div>
              ) : (
                <div style={{ fontSize: 13, fontWeight: 800 }}>₦{pkg.price.toLocaleString()}</div>
              )}
            </div>
          ))}
        </div>

        {/* Custom Amount if renewal */}
        {selectedPkg?.isCustom && (
          <div style={{ margin: '0 16px', background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #eef2f7' }}>
            <input value={customAmount} onChange={e=>setCustomAmount(e.target.value.replace(/\D/g,''))} placeholder="Enter Amount" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
        )}

        {/* Pay Button */}
        <div style={{ padding: 16, position: 'sticky', bottom: 0, background: '#f8fafc' }}>
          <button disabled={!canPay} onClick={()=>{ alert(`AartPay TV\n\nProvider: ${selectedProvider.name}\nSmartcard: ${smartcard}\nPackage: ${selectedPkg.name}\nAmount: ₦${finalAmount.toLocaleString()}`); nav('/escrow'); }} style={{ width: '100%', padding: 16, borderRadius: 14, border: 'none', background: canPay ? '#16a34a' : '#e2e8f0', color: canPay ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 14 }}>
            {canPay ? `Pay ₦${finalAmount.toLocaleString()} • ${selectedProvider.name}` : 'Enter Smartcard & Select Package'}
          </button>
          <div style={{ textAlign: 'center', fontSize: 10, color: '#94a3b8', marginTop: 8 }}>AartPay Original • Instant Activation • Escrow Safe</div>
        </div>
      </div>

      {/* Provider Modal */}
      {showProvider && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'flex-end' }} onClick={()=>setShowProvider(false)}>
          <div style={{ background: '#fff', width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 20 }} onClick={e=>e.stopPropagation()}>
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #eef2f7' }}>
              <button onClick={()=>setShowProvider(false)} style={{ border: 'none', background: 'none', fontSize: 20 }}>‹</button>
              <span style={{ fontWeight: 700 }}>Select Provider</span>
            </div>
            {providers.map(p=>(
              <div key={p.id} onClick={()=>{ setSelectedProvider(p); setSelectedPkg(null); setShowProvider(false); }} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: p.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>{p.name.slice(0,2).toUpperCase()}</div>
                  <span style={{ fontWeight: p.id===selectedProvider.id?700:400 }}>{p.name}</span>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: 9, border: p.id===selectedProvider.id?'5px solid #16a34a':'1.5px solid #cbd5e1' }}></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
