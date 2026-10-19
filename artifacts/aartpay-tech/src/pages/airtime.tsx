import { useState } from 'react';
export default function Airtime(){
const [phone,setPhone]=useState('09150527575');
const [network,setNetwork]=useState('MTN');
const [amount,setAmount]=useState('');
return(
<div style={{padding:16,background:'#f5f7f6',minHeight:'100vh'}}>
<div style={{display:'flex',justifyContent:'space-between'}}>
<button onClick={()=>history.back()}>Back</button><b>Airtime</b><span>History</span>
</div>
<div style={{marginTop:12,background:'#fff',padding:12,borderRadius:12}}>
<select value={network} onChange={e=>setNetwork(e.target.value)} style={{width:'100%',padding:12,borderRadius:10}}>
<option>MTN</option><option>GLO</option><option>AIRTEL</option><option>9MOBILE</option>
</select>
<input value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:12,marginTop:8,borderRadius:10,border:'1px solid #ddd'}} />
<input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100 - 50000" style={{width:'100%',padding:12,marginTop:8,borderRadius:10,border:'1px solid #ddd'}} />
<button style={{marginTop:12,width:'100%',background:'#16a34a',color:'#fff',padding:12,borderRadius:10,border:'none'}}>Buy Airtime</button>
</div>
</div>
)
}
