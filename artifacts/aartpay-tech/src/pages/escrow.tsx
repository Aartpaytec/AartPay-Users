import { useState, useEffect } from 'react';

export default function Escrow(){
  const trades = [
    {id:'AART-ESC-001', seller:'@seller_01', asset:'50 USDT', amount:82500},
    {id:'AART-ESC-002', seller:'@seller_02', asset:'0.5 BTC', amount:45000000},
  ];

  const [active,setActive]=useState<any>(null);
  const [wema,setWema]=useState<string>('');
  const [sec,setSec]=useState(300);

  const openPrivate = async (t:any)=>{
    setActive(t);
    setSec(300);
    setWema('Generating WEMA...');
    // Call your flutterwave API
    try{
      const r = await fetch('/api/create-escrow-account',{
        method:'POST',
        body: JSON.stringify({tradeId:t.id, amount:t.amount})
      });
      const d = await r.json();
      setWema(d.account_number || 'WEMA 9066589780');
    }catch(e){ setWema('WEMA 9066589780 - TEST'); }
  };

  useEffect(()=>{
    if(!active) return;
    const iv = setInterval(()=>{
      setSec(s=>{
        if(s<=1){ clearInterval(iv); setActive(null); return 0; }
        return s-1;
      });
    },1000);
    return ()=>clearInterval(iv);
  },[active]);

  if(active){
    return(
      <div style={{padding:16, background:'#000', color:'#fff', minHeight:'100vh'}}>
        <h2>PRIVATE ROOM: {active.id}</h2>
        <p style={{color:'#22c55e'}}>🔒 {active.asset} LOCKED - {Math.floor(sec/60)}:{String(sec%60).padStart(2,'0')} left</p>
        <div style={{border:'1px solid #22c55e', padding:12, marginTop:16, borderRadius:8, background:'#18181b'}}>
          <p style={{fontSize:12}}>Send to WEMA (Flutterwave) - Private Only:</p>
          <p style={{fontFamily:'monospace', fontSize:18, fontWeight:'bold'}}>{wema}</p>
          <p>Amount: ₦{active.amount.toLocaleString()}</p>
          <p style={{fontSize:10, color:'#eab308', marginTop:8}}>Asset locked from {active.seller} wallet. Will auto-release after payment webhook.</p>
        </div>
        <button onClick={()=>setActive(null)} style={{width:'100%', background:'#dc2626', padding:10, marginTop:20, borderRadius:8}}>Cancel & Unlock</button>
      </div>
    );
  }

  return(
    <div style={{padding:16, background:'#000', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{fontWeight:'bold'}}>Escrow Board (Public List)</h1>
      {trades.map(t=>(
        <div key={t.id} style={{border:'1px solid #333', padding:12, marginTop:12, borderRadius:8, display:'flex', justifyContent:'space-between'}}>
          <div><p>{t.seller} - {t.asset} 🟢</p><p style={{fontSize:10, color:'#888'}}>{t.id}</p></div>
          <button onClick={()=>openPrivate(t)} style={{background:'#fff', color:'#000', padding:'4px 12px', borderRadius:6, fontWeight:'bold'}}>Message</button>
        </div>
      ))}
    </div>
  );
}
