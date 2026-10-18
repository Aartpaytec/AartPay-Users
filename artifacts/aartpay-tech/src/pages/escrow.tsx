import { useState } from 'react';

type Offer = { id:number; asset:string; seller:string; tag:string; rate:string };

export default function Escrow(){
  const [room,setRoom]=useState<Offer|null>(null);

  // This WEMA go ONLY show for Private Room
  const wema = {
    bank:'WEMA (Flutterwave)',
    number:'1311 380 4383',
    name:'AartPay Services',
    ref:'AART-ESC-802846'
  };

  const offers:Offer[]=[
    {id:1, asset:'50 USDT available', seller:'Salau Store', tag:'@seller_01', rate:'₦1,650 / $1'},
    {id:2, asset:'0.5 BTC available', seller:'Lagos Crypto', tag:'@btc_lagos', rate:'₦112M / BTC'},
    {id:3, asset:'2 ETH available', seller:'BG Vendor', tag:'@bg_eth', rate:'₦4.2M'},
    {id:4, asset:'10 BNB available', seller:'BNB Trader', tag:'@bnb_trader', rate:'₦1.2M / BNB'},
    {id:5, asset:'100 SOL available', seller:'SOL Lagos', tag:'@salawuakeem584', rate:'₦450K / SOL'},
  ];

  // === PRIVATE ROOM - WEMA SHOW HERE ONLY ===
  if(room){
    return(
      <div style={{minHeight:'100vh',background:'#f8f9fb',padding:'16px',fontFamily:'sans-serif'}}>
        <button onClick={()=>setRoom(null)} style={{border:'none',background:'none',fontWeight:600}}>← Back to P2P Board</button>
        
        <div style={{marginTop:'16px',background:'white',borderRadius:'16px',padding:'16px',border:'1px solid #eee'}}>
          <div style={{fontSize:'12px',color:'#888'}}>Private Room with {room.tag}</div>
          <div style={{fontWeight:700,marginTop:'4px'}}>{room.asset} • {room.seller}</div>
          <span style={{fontSize:'11px',background:'#f3f3f3',padding:'4px 8px',borderRadius:'100px',display:'inline-block',marginTop:'6px'}}>Ref: {wema.ref} • Escrow Locked</span>
        </div>

        <div style={{marginTop:'16px',background:'white',border:'2px dashed #16a34a',borderRadius:'16px',padding:'16px'}}>
          <div style={{fontSize:'11px',color:'#16a34a',fontWeight:800}}>SECURED ESCROW ACCOUNT (Flutterwave)</div>
          <div style={{fontWeight:800,fontSize:'16px',marginTop:'8px'}}>{wema.bank} - {wema.number} - {wema.name}</div>
          <div style={{display:'flex',gap:'8px',marginTop:'8px'}}>
            <span style={{fontSize:'11px',background:'#f0f0f0',padding:'4px 8px',borderRadius:'100px'}}>Ref: {wema.ref}</span>
            <span style={{fontSize:'11px',background:'#dcfce7',color:'#16a34a',padding:'4px 8px',borderRadius:'100px'}}>Instant</span>
          </div>
          <div style={{fontSize:'11px',color:'#666',marginTop:'10px'}}>Transfer exact amount. Do NOT add note. Auto-confirms. No narration = No CBN Issue.</div>
          <button style={{width:'100%',marginTop:'14px',background:'black',color:'white',border:'none',borderRadius:'100px',padding:'12px',fontWeight:600}}>I Have Paid - Confirm</button>
        </div>

        <div style={{marginTop:'12px',textAlign:'center',fontSize:'11px',color:'#aaa'}}>Chat: Welcome {room.tag} - Escrow secured</div>
      </div>
    )
  }

  // === MAIN PAGE - CLEAN, NO WEMA ===
  return(
    <div style={{minHeight:'100vh',background:'#f8f9fb',padding:'16px',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'20px',fontWeight:800,margin:0}}>🔒 Escrow P2P</h1>
      <p style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>You: @salawuakeem584 - Unique tag generated inside escrow</p>

      <div style={{marginTop:'24px'}}>
        <div style={{fontWeight:700,fontSize:'16px'}}>🟢 P2P Live Board</div>

        <div style={{background:'white',borderRadius:'14px',padding:'12px',display:'flex',gap:'8px',marginTop:'12px',border:'1px solid #eee'}}>
          <div style={{background:'#f3f3f3',padding:'8px 10px',borderRadius:'10px',fontSize:'12px',fontWeight:700}}>USDT</div>
          <input placeholder="100 USDT available" style={{flex:1,border:'1px solid #eee',borderRadius:'10px',padding:'8px 12px',fontSize:'13px',outline:'none'}}/>
          <button style={{background:'black',color:'white',borderRadius:'10px',padding:'8px 16px',fontSize:'13px',border:'none',fontWeight:600}}>Post</button>
        </div>

        <div style={{marginTop:'14px',display:'flex',flexDirection:'column',gap:'10px'}}>
          {offers.map(o=>(
            <div key={o.id} style={{background:'white',borderRadius:'16px',padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #eee'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <div style={{width:'36px',height:'36px',background:'#f5f5f5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>₿</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'13px'}}>{o.asset}</div>
                  <div style={{fontSize:'11px',color:'#888'}}>{o.seller} • {o.tag} • {o.rate}</div>
                </div>
              </div>
              <button onClick={()=>setRoom(o)} style={{background:'black',color:'white',borderRadius:'100px',padding:'8px 12px',fontSize:'10px',border:'none',fontWeight:700,lineHeight:'1.1'}}>Message<br/>{o.tag}</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:'24px',textAlign:'center',fontSize:'11px',color:'#888'}}>Your tag: @salawuakeem584 - No WEMA here until you enter private room</div>
      </div>
    </div>
  )
}
