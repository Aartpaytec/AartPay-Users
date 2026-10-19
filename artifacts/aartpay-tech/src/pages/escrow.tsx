import { useState } from 'react';

type Offer = { id:number; amountStr:string; type:string; seller:string; tag:string; price:string; bal:number };
type TradeRoom = { ref:string; wema:string; offer:Offer; msgs:{from:string,text:string}[] };

export default function EscrowP2P(){
  // THIS IS YOU - change am to real balance from DB later
  const myWallet = { USDT:100, BTC:0.5, ETH:2, BNB:10, SOL:100 };
  const myTag = "@salawakeem584";

  const [offers,setOffers]=useState<Offer[]>([
    {id:1, amountStr:"50 USDT", type:"USDT", seller:"Salau Store", tag:"@seller_01", price:"₦1,650 / $1", bal:200},
    {id:2, amountStr:"0.5 BTC", type:"BTC", seller:"Lagos Crypto", tag:"@btc_lagos", price:"₦112M / BTC", bal:1.2},
    {id:3, amountStr:"2 ETH", type:"ETH", seller:"BG Vendor", tag:"@bg_eth", price:"₦4.2M / ETH", bal:5},
    {id:4, amountStr:"10 BNB", type:"BNB", seller:"BNB Trader", tag:"@bnb_trader", price:"₦1.2M / BNB", bal:15},
    {id:5, amountStr:"100 SOL", type:"SOL", seller:"SOL Lagos", tag:myTag, price:"₦450K / SOL", bal:100},
  ]);

  const [postInput,setPostInput]=useState("100 USDT");
  const [room,setRoom]=useState<TradeRoom|null>(null);
  const [chatInput,setChatInput]=useState("");

  const generateOneTimeAccount = () => {
    const ref = `AART-ESC-${Math.floor(100000+Math.random()*900000)}`;
    const wema = `1311${Math.floor(10000000+Math.random()*90000000)}`; // new WEMA per trade
    return { ref, wema };
  };

  const handlePost = () => {
    const parts = postInput.split(" ");
    const amt = parseFloat(parts[0]);
    const type = (parts[1]||"USDT").toUpperCase() as keyof typeof myWallet;
    if(!myWallet[type]){ alert(`You no get ${type} for wallet`); return; }
    if(amt > myWallet[type]){
      alert(`BLOCKED: You wan sell ${amt} ${type} but you get only ${myWallet[type]} ${type}. You no fit generate escrow account. Fund wallet first.`);
      return; // NO ACCOUNT GENERATED
    }
    const newOffer:Offer={id:Date.now(), amountStr:postInput, type, seller:"You", tag:myTag, price:"Your price", bal:myWallet[type]};
    setOffers([newOffer,...offers]);
    setPostInput("");
  };

  const openPrivateRoom = (o:Offer) => {
    const {ref,wema} = generateOneTimeAccount(); // ONE ACCOUNT PER TRADE
    setRoom({ ref, wema, offer:o, msgs:[{from:"system", text:`Welcome ${myTag} - Private Room with ${o.tag}. Escrow secured. Ref ${ref}. Pay ONLY to this one-time account.`}] });
  };

  if(room){
    return(
      <div style={{padding:16, background:"#fff", minHeight:"100vh"}}>
        <button onClick={()=>setRoom(null)} style={{marginBottom:10}}>← Back to P2P Board</button>
        <h3>Private Room with {room.offer.tag}</h3>
        <div style={{fontWeight:700}}>{room.offer.amountStr} available - {room.offer.seller}</div>
        <div style={{fontSize:12, color:"#666"}}>Ref: {room.ref} - Escrow Locked - One Account Per Trade</div>

        <div style={{border:"2px dashed #16a34a", padding:12, borderRadius:12, marginTop:12, background:"#f0fdf4"}}>
          <div style={{fontSize:11, color:"#16a34a", fontWeight:700}}>SECURED ESCROW ACCOUNT (Flutterwave) - THIS TRADE ONLY</div>
          <div style={{fontWeight:800, marginTop:4}}>WEMA (Flutterwave) - {room.wema} - AartPay Services</div>
          <div style={{fontSize:11, marginTop:4}}>Ref: {room.ref} <span style={{background:"#dcfce7", padding:"2px 6px", borderRadius:6}}>Instant</span></div>
          <div style={{fontSize:11, marginTop:4}}>Transfer exact amount. Do NOT add note. Auto-confirms. No narration = No CBN issue.</div>
          <button style={{width:"100%", marginTop:10, padding:10, background:"black", color:"white", borderRadius:8}}>I Have Paid - Confirm</button>
        </div>

        <div style={{marginTop:16}}>
          {room.msgs.map((m,i)=><div key={i} style={{padding:8, borderBottom:"1px solid #eee", fontSize:13}}><b>{m.from}:</b> {m.text}</div>)}
        </div>

        <div style={{display:"flex", gap:8, marginTop:16}}>
          <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type message..." style={{flex:1, border:"1px solid #ddd", borderRadius:8, padding:8}}/>
          <button onClick={()=>{ if(!chatInput) return; setRoom({...room, msgs:[...room.msgs, {from:myTag, text:chatInput}]}); setChatInput(""); }} style={{background:"black", color:"white", borderRadius:8, padding:"8px 16px"}}>Send</button>
        </div>
      </div>
    )
  }

  return(
    <div style={{padding:16, background:"#f8fafc", minHeight:"100vh"}}>
      <h2>Escrow P2P</h2>
      <div style={{fontSize:12}}>You: {myTag} - Unique tag generated inside escrow</div>
      <div style={{fontSize:12, color:"#16a34a", marginBottom:12}}>● P2P Live Board - No WEMA here until you enter private room</div>

      <div style={{display:"flex", gap:8, background:"#fff", padding:8, borderRadius:12}}>
        <span style={{padding:"6px 10px", background:"#eef", borderRadius:8, fontSize:12}}>USDT</span>
        <input value={postInput} onChange={e=>setPostInput(e.target.value)} style={{flex:1, border:"1px solid #eee", borderRadius:8, padding:6}} placeholder="100 USDT"/>
        <button onClick={handlePost} style={{background:"black", color:"white", borderRadius:8, padding:"6px 12px"}}>Post</button>
      </div>
      <div style={{fontSize:10, color:"#888", marginTop:4}}>Your tag: {myTag} - No WEMA until you enter private room</div>

      <div style={{marginTop:16, display:"flex", flexDirection:"column", gap:8}}>
        {offers.map(o=>(
          <div key={o.id} style={{background:"#fff", padding:12, borderRadius:12, display:"flex", justifyContent:"space-between"}}>
            <div>
              <div style={{fontWeight:700, fontSize:13}}>{o.amountStr} available</div>
              <div style={{fontSize:11, color:"#666"}}>{o.seller} • {o.tag} • {o.price} • Bal: {o.bal} {o.type}</div>
            </div>
            <button onClick={()=>openPrivateRoom(o)} style={{background:"#000", color:"#fff", fontSize:10, borderRadius:8, padding:"6px 10px"}}>Message<br/>{o.tag}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
