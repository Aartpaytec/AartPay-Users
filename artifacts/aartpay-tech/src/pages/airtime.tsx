import {useState} from 'react'
export default function Airtime(){
const [a,setA]=useState("")
const [p,setP]=useState("09169527575")
const [n,setN]=useState("MTN")
return(
<div style={{padding:16,background:"#f5f7f6",minHeight:"100vh"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<button onClick={()=>history.back()}>‹</button><b>Airtime & Data</b><span style={{color:"green"}}>History</span>
</div>
<select value={n} onChange={e=>setN(e.target.value)} style={{marginTop:12,width:"100%",padding:10,borderRadius:10}}>
<option>MTN</option><option>GLO</option><option>AIRTEL</option><option>9MOBILE</option>
</select>
<input value={p} onChange={e=>setP(e.target.value)} style={{marginTop:8,width:"100%",padding:12,borderRadius:10,border:"1px solid #ddd"}} />
<div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
{[50,100,200,300,400,500].map(v=>(
<button key={v} onClick={()=>setA(String(v))} style={{padding:12,borderRadius:10,border:"1px solid #ddd",background:a==String(v)?"#111":"#fff",color:a==String(v)?"#fff":"#000"}}>₦{v}</button>
))}
</div>
<div style={{marginTop:12,display:"flex",gap:8,background:"#fff",padding:8,borderRadius:12,border:"1px solid #ddd"}}>
<input value={a} onChange={e=>setA(e.target.value)} placeholder="50-500k" style={{flex:1,border:"none"}}/>
<button style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:20,padding:"8px 18px"}}>Pay</button>
</div>
<div style={{marginTop:12,background:"#fff",padding:10,borderRadius:10,fontSize:12}}>All Networks: MTN • GLO • AIRTEL • 9MOBILE - Cashback Active</div>
</div>
)
}
