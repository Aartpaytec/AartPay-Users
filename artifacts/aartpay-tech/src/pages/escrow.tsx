import { useState, useEffect } from 'react'

export default function EscrowMarket(){
  const [myTag,setMyTag]=useState("Buyer_"+Math.floor(Math.random()*1000))
  const [myBalance,setMyBalance]=useState(100) // seller must have asset - mock balance
  const [offers,setOffers]=useState<any[]>([])
  const [activeTrade,setActiveTrade]=useState<any>(null)
  const [liveMsgs,setLiveMsgs]=useState<any[]>([])
  const [chatInput,setChatInput]=useState("")
  const [type,setType]=useState("sell")
  const [amount,setAmount]=useState("")
  const [currency,setCurrency]=useState("USDT")
  const [price,setPrice]=useState("")
  const [wallet,setWallet]=useState("")
  const [presence,setPresence]=useState<any>({})
  const [online,setOnline]=useState(true)

  // ONLINE SIGNAL
  useEffect(()=>{
    const updatePresence = async ()=>{
      await fetch('/api/chat',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({roomId:'presence', sender:myTag, message:'online'})}).catch(()=>{})
      setOnline(true)
    }
    updatePresence()
    const t=setInterval(updatePresence, 10000)
    const handleOffline=()=>setOnline(false)
    window.addEventListener('beforeunload', handleOffline)
    return ()=>{clearInterval(t); window.removeEventListener('beforeunload', handleOffline)}
  },[myTag])

  const loadOffers=async()=>{
    const r=await fetch('/api/offers')
    const d=await r.json()
    if(Array.isArray(d)) setOffers(d)
  }
  useEffect(()=>{loadOffers(); const t=setInterval(loadOffers,5000); return()=>clearInterval(t)},[])

  // POST TO MARKET - SELLER MUST HAVE ASSET
  const postOffer=async()=>{
    if(!amount || !wallet) return alert("Enter amount and your wallet address to receive asset")
    if(type==="sell" && Number(amount) > myBalance) return alert(`You no get enough asset! You get only ${myBalance} ${currency}. You must have worth of asset before you generate account.`)
    await fetch('/api/offers',{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({type,amount,currency,price,wallet_address:wallet,tag:myTag})})
    setAmount(""); setPrice(""); setWallet("")
    loadOffers()
    alert("Posted to public marketplace!")
  }

  // CLICK BUY/SELL => AUTO OPEN PRIVATE ROOM + GENERATE VIRTUAL ACCOUNT
  const openPrivateRoom=async(offer:any)=>{
    // generate one account per trade
    const tradeRes = await fetch('/api/trade',{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({offer_id:offer.id, buyer_tag: type==="buy"? offer.seller_tag : myTag, seller_tag: offer.seller_tag, amount: offer.amount, currency: offer.currency})})
    const trade=await tradeRes.json()
    setActiveTrade({...trade, offer})
    // auto message for Aart Escrow Chat
    await fetch('/api/chat',{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({roomId:trade.id, sender:"System", message:`🔒 Aart Escrow Chat started. Trade ${trade.id.slice(0,8)}. Virtual Account: ${trade.virtual_account}`})})
  }

  // LOAD AART ESCROW CHAT (WHATSAPP STYLE)
  useEffect(()=>{
    if(!activeTrade?.id) return
    let active=true
    const load=async()=>{
      try{
        const r=await fetch(`/api/chat?roomId=${activeTrade.id}`)
        const d=await r.json()
        if(active && Array.isArray(d)) setLiveMsgs(d)
      }catch(e){}
    }
    load()
    const t=setInterval(load,2000)
    return()=>{active=false; clearInterval(t)}
  },[activeTrade?.id])

  const sendMsg=async()=>{
    if(!chatInput.trim() || !activeTrade?.id) return
    const msg=chatInput
    setChatInput("")
    setLiveMsgs(p=>[...p,{sender_id:myTag,message:msg,created_at:new Date().toISOString()}])
    await fetch('/api/chat',{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({roomId:activeTrade.id, sender:myTag, message:msg})})
  }

  const generateAccountAgain=()=>{
    // seller generate account inside private room
    if(!activeTrade) return
    alert(`Virtual Temp Account Generated: ${activeTrade.virtual_account}\n\nBuyer will send money to this WEMA account.\nMoney enters, asset credits to buyer wallet ${activeTrade.offer?.wallet_address} automatically, and money goes to seller account.`)
  }

  const confirmPayment=async()=>{
    // simulate automatic credit
    alert(`✅ Payment confirmed!\n${activeTrade.amount} ${activeTrade.currency} credited to ${activeTrade.offer?.wallet_address}\nMoney transferred to seller automatically.`)
    setActiveTrade(null)
    loadOffers()
  }

  // PRIVATE ROOM - AART ESCROW CHAT
  if(activeTrade){
    const otherUser = activeTrade.seller_tag===myTag ? activeTrade.buyer_tag : activeTrade.seller_tag
    return (
      <div style={{maxWidth:'500px', margin:'0 auto', background:'#fff', minHeight:'100vh'}}>
        {/* Header with Online/Offline */}
        <div style={{background:'#075e54', color:'white', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:'bold', fontSize:'15px'}}>Aart Escrow Chat</div>
            <div style={{fontSize:'11px', display:'flex', alignItems:'center', gap:'5px'}}>
              <span style={{width:'8px', height:'8px', background: online?'#25d366':'gray', borderRadius:'50%', display:'inline-block'}}></span>
              {otherUser} • {online?'Online':'Offline'} • Trade {activeTrade.id.slice(0,6)}
            </div>
          </div>
          <button onClick={()=>setActiveTrade(null)} style={{background:'white', border:'none', borderRadius:'15px', padding:'6px 12px'}}>Market</button>
        </div>

        {/* Virtual Account Info - Seller generates */}
        <div style={{background:'#fff5c4', padding:'10px', margin:'8px', borderRadius:'10px', border:'1px dashed #075e54'}}>
          <div style={{fontSize:'12px', fontWeight:'bold'}}>🔒 Escrow Virtual Account (One account per trade)</div>
          <div style={{fontSize:'14px', fontWeight:'bold', margin:'5px 0'}}>{activeTrade.virtual_account} (WEMA Bank)</div>
          <div style={{fontSize:'11px', color:'#333'}}>Amount: {activeTrade.amount} {activeTrade.currency} • Wallet: {activeTrade.offer?.wallet_address?.slice(0,15)}...</div>
          <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
            <button onClick={generateAccountAgain} style={{flex:1, padding:'8px', background:'#075e54', color:'white', border:'none', borderRadius:'8px', fontSize:'12px'}}>Seller: Generate Account</button>
            <button onClick={confirmPayment} style={{flex:1, padding:'8px', background:'#25d366', color:'white', border:'none', borderRadius:'8px', fontSize:'12px'}}>Confirm Payment Received</button>
          </div>
          <div style={{fontSize:'10px', color:'gray', marginTop:'5px'}}>Money enters account → asset credits to buyer wallet automatically → money goes to seller</div>
        </div>

        {/* WhatsApp Chat */}
        <div style={{background:'#e5ddd5', padding:'10px', height:'380px', overflowY:'auto'}}>
          {liveMsgs.map((c,i)=>(
            <div key={i} style={{display:'flex', justifyContent:c.sender_id===myTag?'flex-end':'flex-start', margin:'6px 0'}}>
              <div style={{background:c.sender_id===myTag?'#dcf8c6': c.sender_id==='System' ? '#fff5c4':'white', padding:'8px 12px', borderRadius:'12px', maxWidth:'75%'}}>
                <div style={{fontSize:'10px', color:'#075e54', fontWeight:'bold'}}>{c.sender_id} {c.sender_id!==myTag && c.sender_id!=='System' ? <span style={{color:online?'green':'gray'}}>● {online?'online':'offline'}</span>:''}</div>
                <div style={{fontSize:'14px'}}>{c.message}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'flex', gap:'8px', padding:'8px', background:'white', borderTop:'1px solid #eee'}}>
          <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type in Aart Escrow Chat" style={{flex:1, border:'1px solid #ddd', borderRadius:'20px', padding:'10px 15px'}} onKeyDown={e=>e.key==='Enter'&&sendMsg()} />
          <button onClick={sendMsg} style={{background:'#25d366', border:'none', width:'45px', height:'45px', borderRadius:'50%', color:'white'}}>➤</button>
        </div>
      </div>
    )
  }

  // PUBLIC MARKETPLACE
  return (
    <div style={{maxWidth:'500px', margin:'0 auto', padding:'15px', background:'#f9f9f9', minHeight:'100vh'}}>
      <h2 style={{textAlign:'center'}}>📢 AartPay Public Market</h2>
      <div style={{fontSize:'12px', textAlign:'center', color:'gray'}}>Your Tag: {myTag} • Balance: {myBalance} • <span style={{color:'green'}}>● Online</span></div>

      <div style={{display:'flex', gap:'10px', margin:'10px 0'}}>
        <button onClick={()=>setMyTag("Seller_"+Math.floor(Math.random()*100))} style={{flex:1, padding:'8px', background:'#eee', borderRadius:'8px', border:'none'}}>Switch to Seller</button>
        <button onClick={()=>setMyTag("Buyer_"+Math.floor(Math.random()*100))} style={{flex:1, padding:'8px', background:'#eee', borderRadius:'8px', border:'none'}}>Switch to Buyer</button>
      </div>

      <div style={{background:'white', padding:'15px', borderRadius:'12px', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
          <button onClick={()=>setType("sell")} style={{flex:1, padding:'10px', background:type==="sell"?"#25d366":"white", borderRadius:'8px', border:'1px solid #ddd', color:type==="sell"?"white":"black"}}>I Want to SELL</button>
          <button onClick={()=>setType("buy")} style={{flex:1, padding:'10px', background:type==="buy"?"#ff4747":"white", borderRadius:'8px', border:'1px solid #ddd', color:type==="buy"?"white":"black"}}>I Want to BUY</button>
        </div>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount e.g 20, 30" style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #ddd', marginBottom:'8px'}} />
        <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
          <select value={currency} onChange={e=>setCurrency(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'8px', border:'1px solid #ddd'}}><option>USDT</option><option>USD</option><option>BTC</option><option>PTC</option><option>NGN</option></select>
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price e.g 1600/ $" style={{flex:1, padding:'10px', borderRadius:'8px', border:'1px solid #ddd'}} />
        </div>
        <input value={wallet} onChange={e=>setWallet(e.target.value)} placeholder="Your wallet address to receive asset (required)" style={{width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #ddd', marginBottom:'8px'}} />
        <div style={{fontSize:'11px', color:'gray', marginBottom:'8px'}}>Seller must have asset worth before generating account • One account per trade</div>
        <button onClick={postOffer} style={{width:'100%', padding:'12px', background:'black', color:'white', borderRadius:'10px', border:'none'}}>Post to Public Market</button>
      </div>

      <h3 style={{marginTop:'20px'}}>Live Market ({offers.length})</h3>
      {offers.map((o:any,i:number)=>(
        <div key={i} style={{background:'white', padding:'12px', borderRadius:'10px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid #eee'}}>
          <div>
            <div style={{fontWeight:'bold'}}><span style={{background:o.type==="sell"?"#dcf8c6":"#ffebeb", padding:'2px 6px', borderRadius:'5px', fontSize:'11px'}}>{o.type.toUpperCase()}</span> {o.amount} {o.currency}</div>
            <div style={{fontSize:'12px', color:'gray'}}>{o.price} • Wallet: {o.wallet_address?.slice(0,10)}... • by {o.seller_tag}</div>
            <div style={{fontSize:'10px', color:'green'}}>● Online • One account per trade</div>
          </div>
          <button onClick={()=>openPrivateRoom(o)} style={{background:'#25d366', color:'white', border:'none', padding:'8px 14px', borderRadius:'20px', fontWeight:'bold'}}>
            {o.type==="sell"?"Buy":"Sell"}
          </button>
        </div>
      ))}
      {offers.length===0 && <div style={{textAlign:'center', color:'gray', marginTop:'30px'}}>Market empty<br/>Be first to post 20 USD needed, 30 USDT for sale etc</div>}
    </div>
  )
}
