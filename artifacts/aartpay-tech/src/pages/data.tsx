import { useState } from 'react';

const plans = [
  { id:'500MB', name:'500MB - 1 Day', price:300 },
  { id:'1GB', name:'1GB - 1 Day', price:500 },
  { id:'2GB', name:'2GB - 2 Days', price:1000 },
  { id:'3GB', name:'3GB - 3 Days', price:1500 },
  { id:'5GB', name:'5GB - 7 Days', price:2500 },
  { id:'10GB', name:'10GB - 30 Days', price:4000 },
];

export default function Data(){
  const [phone,setPhone]=useState('09150527575');
  const [network,setNetwork]=useState('MTN');
  const [plan,setPlan]=useState('1GB');

  return(
    <div style={{padding:16,background:'#eef2f7',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button onClick={()=>history.back()} style={{border:'none',background:'#fff',padding:'8px 12px',borderRadius:8}}>Back</button>
        <b>Data</b>
        <span style={{background:'#fff',padding:'8px 12px',borderRadius:8}}>History</span>
      </div>

      <div style={{marginTop:16,background:'#fff',padding:16,borderRadius:16}}>
        <p style={{fontWeight:600}}>Network</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8,marginTop:8}}>
          {['MTN','GLO','AIRTEL','9MOBILE'].map(n=>(
            <button key={n} onClick={()=>setNetwork(n)} style={{padding:10,borderRadius:8,border: network===n ? '2px solid #16a34a' : '1px solid #ddd',background: network===n ? '#f0fdf4' : '#fff',fontWeight:600}}>{n}</button>
          ))}
        </div>

        <p style={{fontWeight:600,marginTop:16}}>Phone Number</p>
        <input value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:14,marginTop:6,borderRadius:10,border:'1px solid #ddd'}} />

        <p style={{fontWeight:600,marginTop:16}}>Select Plan</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:8,marginTop:8}}>
          {plans.map(p=>(
            <button key={p.id} onClick={()=>setPlan(p.id)} style={{textAlign:'left',padding:12,borderRadius:10,border: plan===p.id ? '2px solid #16a34a' : '1px solid #ddd',background: plan===p.id ? '#f0fdf4' : '#fff',display:'flex',justifyContent:'space-between'}}>
              <span><b>{p.name}</b></span><span style={{fontWeight:700}}>₦{p.price}</span>
            </button>
          ))}
        </div>

        <button style={{marginTop:20,width:'100%',background:'#16a34a',color:'#fff',padding:14,borderRadius:12,border:'none',fontWeight:700,fontSize:16}}>
          Buy {network} {plan} Data
        </button>
      </div>
    </div>
  )
}
