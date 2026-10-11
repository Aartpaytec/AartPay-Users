import { useState } from 'react';

export default function Electricity(){
  const [meter,setMeter]=useState('');
  const [name,setName]=useState('');
  const [type,setType]=useState('prepaid');

  const verifyMeter = async ()=>{
    if(!meter) return alert('Enter meter');
    setName('Verifying...');
    try{
      const r = await fetch('/api/verify-meter',{
        method:'POST',
        body: JSON.stringify({meter, disco:'IBEDC', type})
      });
      const d = await r.json();
      setName(d.customerName || d.name || 'Name not found');
    }catch(e){ setName('Error verifying - check API'); }
  };

  return(
    <div style={{padding:16, background:'#000', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{fontWeight:'bold'}}>Electricity - IBEDC / All Disco</h1>
      
      <select value={type} onChange={e=>setType(e.target.value)} style={{width:'100%', padding:10, marginTop:16, color:'#000', borderRadius:8}}>
        <option value="prepaid">Prepaid</option>
        <option value="postpaid">Postpaid</option>
      </select>

      <input value={meter} onChange={e=>setMeter(e.target.value)} placeholder="Meter Number" style={{width:'100%', padding:10, marginTop:12, color:'#000', borderRadius:8}} />
      
      <button onClick={verifyMeter} style={{width:'100%', background:'#eab308', color:'#000', padding:12, marginTop:12, borderRadius:8, fontWeight:'bold'}}>Verify Meter</button>
      
      {name && <p style={{marginTop:12, color:'#22c55e'}}>Customer: {name}</p>}

      <button style={{width:'100%', background:'#fff', color:'#000', padding:12, marginTop:20, borderRadius:8}}>Pay IBEDC</button>
    </div>
  );
}
