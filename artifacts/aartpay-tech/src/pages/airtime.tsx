import { useState } from 'react';

export default function Airtime(){
  const [tab,setTab]=useState("airtime");
  const [phone,setPhone]=useState("09169527575");
  const [network,setNetwork]=useState("MTN");
  const [amount,setAmount]=useState("");
  const [plan,setPlan]=useState("");

  const networks = [
    {id:"MTN", color:"#ffcc00", text:"#111"},
    {id:"GLO", color:"#16a34a", text:"#fff"},
    {id:"AIRTEL", color:"#ef4444", text:"#fff"},
    {id:"9MOBILE", color:"#111827", text:"#fff"},
  ];
  const currentNet = networks.find(n=>n.id===network)!;

  const airtimeAmounts = [50,100,200,300,400,500];

  const dataPlans = [
    {name:"500MB", price:300, valid:"2 Days"},
    {name:"1GB", price:500, valid:"1 Day"},
    {name:"2GB", price:1000, valid:"7 Days"},
    {name:"3GB", price:1500, valid:"30 Days"},
    {name:"5GB", price:2500, valid:"30 Days"},
    {name:"10GB", price:4000, valid:"30 Days"},
    {name:"20GB", price:7000, valid:"30 Days"},
    {name:"40GB", price:12000, valid:"30 Days"},
  ];

  return(
    <div style={{background:"#f5f7f6", minHeight:"100vh", padding:16, fontFamily:"system-ui", paddingBottom:90}}>
      
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <button onClick={()=>history.back()} style={{border:"none", background:"#fff", width:36, height:36, borderRadius:18, fontSize:20}}>‹</button>
        <b style={{fontSize:16}}>Airtime & Data</b>
        <span style={{color:"#16a34a", fontSize:13, fontWeight:700, background:"#fff", padding:"6px 12px", borderRadius:20}}>History</span>
      </div>

      {/* TABS - Airtime | Data */}
      <div style={{marginTop:12, background:"#fff", borderRadius:20, padding:4, display:"flex", gap:4, border:"1px solid #eef2f0"}}>
        <button onClick={()=>setTab("airtime")} style={{flex:1, border:"none", borderRadius:16, padding:"10px", fontWeight:800, fontSize:13, background: tab==="airtime" ? "#111" : "transparent", color: tab==="airtime" ? "#fff" : "#64748b"}}>Airtime</button>
        <button onClick={()=>setTab("data")} style={{flex:1, border:"none", borderRadius:16, padding:"10px", fontWeight:800, fontSize:13, background: tab==="data" ? "#111" : "transparent", color: tab==="data" ? "#fff" : "#64748b"}}>Data</button>
      </div>

      {/* Phone + Network Selector - SHOW FOR BOTH */}
      <div style={{marginTop:14, background:"#fff", borderRadius:14, padding:12, display:"flex", alignItems:"center", gap:10, border:"1.5px solid #eef2f0"}}>
        <div style={{background:currentNet.color, color:currentNet.text, width:36, height:36, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:10}}>{network.slice(0,3)}</div>
        <select value={network} onChange={e=>setNetwork(e.target.value)} style={{border:"none", fontSize:12, fontWeight:700, color:"#475569", background:"transparent", outline:"none"}}>
          {networks.map(n=><option key={n.id}>{n.id}</option>)}
        </select>
        <input value={phone} onChange={e=>setPhone(e.target.value)} style={{flex:1, border:"none", fontWeight:700, fontSize:15, outline:"none"}} placeholder="091 6952 7575"/>
        <div style={{width:30, height:30, background:"#16a34a", borderRadius:15, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:14}}>👤</div>
      </div>
