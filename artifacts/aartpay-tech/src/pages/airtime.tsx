import { useState } from 'react';

export default function Airtime(){
  const [phone,setPhone]=useState("09169527575");
  const [network,setNetwork]=useState("MTN");
  const [amount,setAmount]=useState("");

  const quick = [
    {amt:50, bonus:1.75},
    {amt:100, bonus:3.5},
    {amt:200, bonus:7},
    {amt:300, bonus:10.5},
    {amt:400, bonus:14},
    {amt:500, bonus:10},
  ];

  const networks = ["MTN","GLO","AIRTEL","9MOBILE"];

  return(
    <div style={{background:"#f5f7f6", minHeight:"100vh", padding:16, fontFamily:"system-ui", paddingBottom:90}}>
      
      {/* Header */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <button onClick={()=>history.back()} style={{border:"none", background:"#fff", width:36, height:36, borderRadius:18, fontSize:20}}>‹</button>
        <b style={{fontSize:16}}>Airtime</b>
        <span style={{color:"#16a34a", fontSize:13, fontWeight:700, background:"#fff", padding:"6px 12px", borderRadius:20}}>History</span>
      </div>

      {/* Banner */}
      <div style={{marginTop:12, background:"#101010", borderRadius:16, padding:16, color:"white", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div style={{color:"#86efac", fontSize:11, fontWeight:700, letterSpacing:0.5}}>TV EXPIRED?</div>
          <div style={{fontWeight:800, fontSize:15, marginTop:4}}>Bring The Entertainment Back</div>
          <div style={{fontSize:11, color:"#9ca3af", marginTop:2}}>Pay for cable
