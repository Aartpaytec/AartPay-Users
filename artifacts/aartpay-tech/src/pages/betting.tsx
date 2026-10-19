import { useState } from 'react';
export default function Betting(){
const [id,setId]=useState('08136072683');
const [amt,setAmt]=useState('');
return(
<div style={{padding:16,background:'#f5f7f6',minHeight:'100vh'}}>
<div style={{display:'flex',justifyContent:'space-between'}}>
<button onClick={()=>history.back()}>Back</button><b>Betting</b><span>History</span>
</div>
<div style={{marginTop:12,background:'#fff',padding:12,borderRadius:12}}>
<p>Enter Betting Wallet ID</p>
<input value={id} onChange={e=>setId(e.target.value)} style={{width:'100%',padding:12,borderRadius:10,border:'1px solid #ddd',marginTop:6}}/>
<p style={{marginTop:12}}>Amount</p>
<input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="100 - 1000000" style={{width:'100%',padding:12,borderRadius:10,border:'1px solid #ddd',marginTop:6}}/>
<button style={{marginTop:12,width:'100%',background:'#16a34a',color:'#fff',padding:12,borderRadius:10,border:'none'}}>Proceed</button>
</div>
</div>
)
}
