import { useState } from 'react';
export default function Data(){
const [phone,setPhone]=useState('09150527575');
const [network,setNetwork]=useState('MTN');
const [plan,setPlan]=useState('');
const plans=[
{name:'500MB',price:300},
{name:'1GB',price:500},
{name:'2GB',price:1000},
{name:'3GB',price:1500},
{name:'5GB',price:2500},
{name:'10GB',price:4000},
];
return(
<div style={{padding:16,background:'#f5f7f6',minHeight:'100vh'}}>
<div style={{display:'flex',justifyContent:'space-between'}}>
<button onClick={()=>history.back()}>Back</button><b>Data</b><span>History</span>
</div>
<div style={{marginTop:12,background:'#fff',padding:12,borderRadius:12}}>
<select value={network} onChange={e=>setNetwork(e.target.value)} style={{width:'100%',padding:12,borderRadius:10}}>
<option>MTN</option><option>GLO</option><option>AIRTEL</option><option>9MOBILE</option>
</select>
<input value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:12,marginTop:8,borderRadius:10,border:'1px solid #ddd'}} />
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
{plans.map(v=><button key={v.name} onClick={()=>setPlan(v.name)} style={{padding:10,borderRadius:8,border: plan===v.name ? '2px solid #16a34a' : '1px solid #ddd',background:'#fff'}}><b>{v.name}</b><br/>{v.price}</button>)}
</div>
<button style={{marginTop:12,width:'100%',background:'#16a34a',color:'#fff',padding:12,borderRadius:10,border:'none'}}>Buy Data</button>
</div>
</div>
)
}
