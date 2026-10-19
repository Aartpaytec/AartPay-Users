import {useState} from 'react'
export default function Data(){
const [p,setP]=useState("09169527575")
const [n,setN]=useState("MTN")
const [plan,setPlan]=useState("")
const plans=[
{name:"500MB",price:300},
{name:"1GB",price:500},
{name:"2GB",price:1000},
{name:"3GB",price:1500},
{name:"5GB",price:2500},
{name:"10GB",price:4000},
]
return(
<div style={{padding:16,background:"#f5f7f6",minHeight:"100vh"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<button onClick={()=>history.back()}>‹</button><b>Data</b><span style={{color:"green"}}>History</span>
</div>
<select value={n} onChange={e=>setN(e.target.value)} style={{marginTop:12,width:"100%",padding:10,borderRadius:10}}>
<option>MTN</option><option>GLO</option><option>AIRTEL</option><option>9MOBILE</option>
</select>
<input value={p} onChange={e=>setP(e.target.value)} style={{marginTop:8,width:"100%",padding:12,borderRadius:10,border:"1px solid #ddd"}}/>
<div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{plans.map(v=>(
<button key={v.name} onClick={()=>setPlan(v.name)} style={{padding:12,borderRadius:10,border:"1px solid #ddd",background:plan==v.name?"#111":"#fff",color:plan==v.name?"#fff":"#000",textAlign:"left"}}>
<b>{v.name}</b><div>₦{v.price}</div>
</button>
))}
</div>
<div style={{marginTop:12,display:"flex",gap:8,background:"#fff",padding:8,borderRadius:12,border:"1px solid #ddd"}}>
<div style={{flex:1,fontWeight:700}}>{plan||"Select Plan"}</div>
<button style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:20,padding:"8px 18px"}}>Pay</button>
</div>
</div>
)
}
