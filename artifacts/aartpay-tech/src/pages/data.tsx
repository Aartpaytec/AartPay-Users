import { useState } from 'react';

const plans = [
  { id:'500MB', label:'500MB - 1 Day', price:300 },
  { id:'1GB', label:'1GB - 1 Day', price:500 },
  { id:'2GB', label:'2GB - 2 Days', price:1000 },
  { id:'5GB', label:'5GB - 7 Days', price:2500 },
  { id:'10GB', label:'10GB - 30 Days', price:4000 },
];

export default function AirtimeData(){
const [tab,setTab]=useState<'airtime'|'data'>('airtime');
const [phone,setPhone]=useState('09150527575');
const [network,setNetwork]=useState('MTN');
const [amount,setAmount]=useState('');
const [plan,setPlan]=useState('1GB');

return(
<div style={{padding:16,background:'#eef2f7',minHeight:'100vh'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
<button onClick={()=>history.back()} style={{border:'none',background:'#fff',padding:'10px 14px',borderRadius:8,color:'#000',fontWeight:700}}>← Back</button>
<b style={{color:'#000'}}>Airtime & Data</b>
<span style={{background:'#fff',padding:'10px 14px',borderRadius:8,color:'#000'}}>History</span>
</div>

{/* TABS */}
<div style={{display:'flex',background:'#fff',borderRadius:12,padding:4,marginBottom:12}}>
<button onClick={()=>setTab('airtime')} style={{flex:1,padding:12,borderRadius:8,border:'none',fontWeight:800,background: tab==='airtime' ? '#16a34a' : 'transparent',color: tab==='airtime' ? '#fff' : '#000'}}>Airtime</button>
<button onClick={()=>setTab('data')} style={{flex:1,padding:12,borderRadius:8,border:'none',fontWeight:800,background: tab==='data' ? '#16a34a' : 'transparent',color: tab==='data' ? '#fff' : '#000'}}>Data</button>
</div>

<div style={{background:'#fff',padding:16,borderRadius:16}}>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8}}>
{['MTN','GLO','AIRTEL','9MOBILE'].map(n=>(
<button key={n} onClick={()=>setNetwork(n)} style={{padding:12,borderRadius:8,border: network===n ? '2px solid #16a34a' : '1px solid #ccc',background: network===n ? '#dcfce7' : '#fff',color:'#000',fontWeight:800,fontSize:13}}>{n}</button>
))}
</div>

<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{width:'100%',padding:14,marginTop:12,borderRadius:10,border:'1px solid #ccc',color:'#000'}} />

{tab==='airtime' ? (
<>
<input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100 - 50000" style={{width:'100%',padding:14,marginTop:12,borderRadius:10,border:'1px solid #ccc',color:'#000'}} />
<button style={{marginTop:16,width:'100%',background:'#16a34a',color:'#fff',padding:14,borderRadius:12,border:'none',fontWeight:800,fontSize:16}}>Buy {network} Airtime</button>
</>
) : (
<>
<div style={{display:'grid',gap:8,marginTop:12}}>
{plans.map(p=>(
<button key={p.id} onClick={()=>setPlan(p.id)} style={{textAlign:'left',padding:12,borderRadius:10,border: plan===p.id ? '2px solid #16a34a' : '1px solid #ccc',background: plan===p.id ? '#dcfce7' : '#fff',color:'#000',display:'flex',justifyContent:'space-between',fontWeight:600}}>
<span>{p.label}</span><span style={{fontWeight:800}}>₦{p.price}</span>
</button>
))}
</div>
<button style={{marginTop:16,width:'100%',background:'#16a34a',color:'#fff',padding:14,borderRadius:12,border:'none',fontWeight:800,fontSize:16}}>Buy {network} {plan} Data</button>
</>
)}

</div>
</div>
)
}
