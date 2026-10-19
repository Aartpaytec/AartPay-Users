import { useState } from 'react';

export default function Betting(){
  const [bettorId,setBettorId]=useState("08135072683");
  const [amount,setAmount]=useState("");

  const providers = [
    { name:"SportyBet", letter:"S", bg:"#dcfce7" },
    { name:"BetKing", letter:"B", bg:"#fef9c3" },
    { name:"NairaBet", letter:"N", bg:"#e0f2fe" },
    { name:"Bet9ja", letter:"9", bg:"#ffedd5" },
    { name:"1xBet", letter:"1", bg:"#ede9fe" },
  ];

  const amounts = [
    { amt:100, pay:100 },
    { amt:200, pay:200 },
    { amt:300, pay:270 },
    { amt:400, pay:370 },
    { amt:500, pay:470 },
    { amt:1000, pay:970 },
  ];

  return(
    <div style={{background:"#f5f7f6", minHeight:"100vh", padding:"16px", fontFamily:"system-ui, -apple-system", paddingBottom:90}}>
      
      {/* Header */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <button onClick={()=>history.back()} style={{border:"none", background:"#fff", width:36, height:36, borderRadius:18, fontSize:20}}>‹</button>
        <b style={{fontSize:16}}>Betting</b>
        <span style={{color:"#16a34a", fontSize:13, fontWeight:700, background:"#fff", padding:"6px 12px", borderRadius:20}}>History</span>
      </div>

      {/* Hot Offers */}
      <div style={{marginTop:12, background:"#fff", borderRadius:14, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #eef2f0"}}>
        <div style={{display:"flex", alignItems:"center", gap:6}}><span>🔥</span><b style={{fontSize:13}}>Hot Offers</b></div>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <span style={{background:"#dcfce7", color:"#16a34a", fontSize:11, padding:"3px 10px", borderRadius:20, fontWeight:800}}>₦30</span>
          <span style={{fontSize:12, color:"#64748b"}}>All ›</span>
        </div>
      </div>

      {/* Providers */}
      <div style={{marginTop:12, display:"flex", gap:10, overflowX:"auto", paddingBottom:4}}>
        {providers.map(p=>(
          <div key={p.name} style={{minWidth:74, background:"#fff", borderRadius:14, padding:10, textAlign:"center", border:"1px solid #eef2f0", flexShrink:0}}>
            <div style={{width:40, height:40, margin:"0 auto", borderRadius:20, background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14}}>{p.letter}</div>
            <div style={{fontSize:10.5, marginTop:8, fontWeight:600, color:"#334155"}}>{p.name}</div>
          </div>
        ))}
        <div style={{minWidth:74, background:"#fff", borderRadius:14, padding:10, textAlign:"center", border:"1px solid #eef2f0", flexShrink:0}}>
          <div style={{width:40, height:40, margin:"0 auto", borderRadius:20, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center"}}>•••</div>
          <div style={{fontSize:10.5, marginTop:8, fontWeight:600}}>More</div>
        </div>
      </div>

      {/* Bettor ID */}
      <div style={{marginTop:16}}>
        <div style={{fontSize:12, color:"#475569", marginBottom:6, fontWeight:600}}>Bettor ID / Phone</div>
        <input 
          value={bettorId} 
          onChange={e=>setBettorId(e.target.value)} 
          style={{width:"100%", background:"#fff", border:"1.5px solid #eef2f0", borderRadius:12, padding:"14px 12px", fontWeight:700, fontSize:15, outline:"none", boxSizing:"border-box"}}
        />
      </div>

      {/* Amount Grid */}
      <div style={{marginTop:16}}>
        <b style={{fontSize:13}}>Select Amount</b>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:10}}>
          {amounts.map(q=>(
            <button 
              key={q.amt} 
              onClick={()=>setAmount(String(q.amt))} 
              style={{
                background: amount==String(q.amt) ? "#111":"#fff",
                color: amount==String(q.amt) ? "#fff":"#111",
                border: amount==String(q.amt) ? "1.5px solid #111":"1px solid #eef2f0",
                borderRadius:12, padding:"12px 10px", textAlign:"left"
              }}
            >
              <div style={{fontWeight:800, fontSize:14}}>₦{q.amt}</div>
              {q.amt !== q.pay && <div style={{fontSize:11, color: amount==String(q.amt) ? "#86efac":"#16a34a", marginTop:2}}>Pay ₦{q.pay}</div>}
              {q.amt === q.pay && <div style={{fontSize:10, color:"#94a3b8", marginTop:2}}>No discount</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount + Pay */}
      <div style={{marginTop:14, background:"#fff", borderRadius:14, padding:8, display:"flex", alignItems:"center", gap:8, border:"1.5px solid #eef2f0"}}>
        <span style={{fontWeight:900, paddingLeft:8}}>₦</span>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100 - 1,000,000" style={{flex:1, border:"none", outline:"none", fontSize:15, fontWeight:600}}/>
        <button style={{background:"#16a34a", color:"white", border:"none", borderRadius:20
