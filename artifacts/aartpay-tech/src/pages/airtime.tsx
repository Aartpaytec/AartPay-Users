import { useState } from 'react';
export default function Airtime(){
const [phone,setPhone]=useState('09150527575');
const [network,setNetwork]=useState('MTN');
const [amount,setAmount]=useState('');
return(
<div style={{padding:16,background:'#eef2f7',minHeight:'100vh',fontFamily:'sans-serif'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<button onClick={()=>history.back()} style={{border:'none',background:'#fff',padding:'8px 12px',borderRadius:8}}>Back</button><b>Airtime</b><span style={{background:'#fff',padding:'8px 12px',borderRadius:8}}>History</span>
</div>
<div style={{marginTop:16,background:'#fff',padding:16,borderRadius:16}}>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8}}>
{['MTN','GLO','AIRTEL','9MOBILE'].map(n=><button key={n} onClick={()=>setNetwork(n)} style={{padding:10,borderRadius:8,border: network===n ? '2px solid #16a34a' : '1px solid #ddd',background: network===n ? '#f0fdf4' : '#fff',fontWeight:600}}>{n}</button>)}
</div>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" style={{width:'100%',padding:14,marginTop:12,borderRadius:10,border:'1px solid #ddd'}} />
<input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100 - 50000" style={{width:'100%',padding:14,marginTop:12,borderRadius:10,border:'1px solid #ddd'}} />
<button style={{marginTop:16,width:'100%',background:'#16a34a',color:'#fff',padding:14,borderRadius:12,border:'none',fontWeight:700}}>Buy {network} Airtime</button>
</div>
</div>
)
}
