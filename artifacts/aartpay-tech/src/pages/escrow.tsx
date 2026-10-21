import { useState, useEffect } from 'react'

export default function Escrow(){
  const myTag = "User_"+Math.floor(Math.random()*1000)
  const [offers,setOffers]=useState<any[]>([])
  const [activeTrade,setActiveTrade]=useState<any>(null)
  const [msgs,setMsgs]=useState<any[]>([])
  const [input,setInput]=useState("")
  const [type,setType]=useState("sell")
  const [amount,setAmount]=useState("")
  const [currency,setCurrency]=useState("USDT")
  const [price,setPrice]=useState("")

  const loadOffers=async()=>{
    try{ 
      const r=await fetch('/api/offers')
      const d=await r.json()
      if(Array.isArray(d)) setOffers(d)
    }catch{}
  }

  useEffect(()=>{loadOffers()},[])

  const postOffer=async()=>{
    if(!amount || !price) return alert("Enter amount and price")
    await fetch('/api/offers',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({type,amount,currency,price,tag:myTag})
    })
    setAmount("")
    setPrice("")
    loadOffers()
  }

  const openChat=async(o:any)=>{
    const r=await fetch('/api/trade',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        offer_id:o.id, 
        buyer_tag:myTag, 
        seller_tag:o.seller_tag, 
        amount:o.amount, 
        currency:o.currency
      })
    })
    const t=await r.json()
    setActiveTrade({...t, offer:o})
    await fetch('/api/chat',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        roomId:t.id, 
        sender:"System", 
        message:`Trade: ${o.amount} ${o.currency} for ${o.price}`
      })
    })
  }

  useEffect(()=>{
    if(!activeTrade?.id) return
    const load=async()=>{
      const r=await fetch(`/api/chat?roomId=${activeTrade.id}`)
      const d=await r.json()
      if(Array.isArray(d)) setMsgs(d)
    }
    load()
    const tm=setInterval(load,2000)
    return()=>clearInterval(tm)
  },[activeTrade?.id])

  const send=async()=>{
    if(!input.trim()) return
    const m=input
    setInput("")
    setMsgs(p=>[...p,{sender_id:myTag,message:m}])
    await fetch('/api/chat',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({roomId:activeTrade.id,sender:myTag,message:m})
    })
  }

  // PRIVATE ROOM
  if(activeTrade){
    return (
      <div style={{maxWidth:480, margin:'0 auto', background:'#fff', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'14px 16px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <b style={{fontSize:'15px'}}>Escrow Chat</b>
            <div style={{fontSize:'11px', color:'#888'}}>Trade #{activeTrade.id.slice(0,6)}</div>
          </div>
          <button onClick={()=>setActiveTrade(null)} style={{border:'1px solid #ddd', background:'#fff', borderRadius:'20px', padding:'6px 14px'}}>Back</button>
        </div>

        <div style={{padding:'12px', background:'#f9f9f9', margin:'12px', borderRadius:'12px', border:'1px solid #eee'}}>
          <div style={{fontSize:'13px'}}><b>{activeTrade.offer?.type?.toUpperCase()} {activeTrade.offer?.amount} {activeTrade.offer?.currency}</b> • {activeTrade.offer?.price}</div>
          <div style={{fontSize:'12px', marginTop:'8px'}}>Virtual Account: <b>{activeTrade.virtual_account}</b> — WEMA Bank</div>
          <button onClick={()=>alert('Payment confirmed')} style={{marginTop:'12px', width:'100%', padding:'11px', background:'#000', color:'#fff', border:'none', borderRadius:'10px', fontWeight:600}}>Confirm Payment</button>
        </div>

        <div style={{flex:1, padding:'12px', overflowY:'auto', background:'#f5f5f5'}}>
          {msgs.map((c,i)=>
            <div key={i} style={{display:'flex', justifyContent:c.sender_id===myTag?'flex-end':'flex-start', margin:'6px 0'}}>
              <div style={{background:c.sender_id===myTag?'#000':'#fff', color:c.sender_id===myTag?'#fff':'#000', padding:'10px 14px', borderRadius:'18px', maxWidth:'75%', fontSize:'13px'}}>
                {c.message}
              </div>
            </div>
          )}
        </div>

        <div style={{padding:'10px', borderTop:'1px solid #eee', display:'flex', gap:'8px'}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Message" style={{flex:1, padding:'12px 16px', borderRadius:'25px', border:'1px solid #ddd'}} onKeyDown={e=>e.key==='Enter'&&send()} />
          <button onClick={send} style={{background:'#000', color:'#fff', border:'none', width:'44px', height:'44px', borderRadius:'50%'}}>↑</button>
        </div>
      </div>
    )
  }

  // MARKET
  return (
    <div style={{maxWidth:480, margin:'0 auto', padding:'16px', background:'#fff', minHeight:'100vh'}}>
      <h2 style={{fontSize:'18px', fontWeight:700, marginBottom:'16px'}}>P2P Market</h2>
      
      <div style={{border:'1px solid #eee', borderRadius:'16px', padding:'16px'}}>
        <div style={{display:'flex', gap:'8px', marginBottom:'14px'}}>
          <button onClick={()=>setType("sell")} style={{flex:1, padding:'12px', borderRadius:'10px', border:'none', background:type==="sell"?'#000':'#f2f2f2', color:type==="sell"?'#fff':'#000', fontWeight:600}}>Sell</button>
          <button onClick={()=>setType("buy")} style={{flex:1, padding:'12px', borderRadius:'10px', border:'none', background:type==="buy"?'#000':'#f2f2f2', color:type==="buy"?'#fff':'#000', fontWeight:600}}>Buy</button>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" style={{flex:1, padding:'14px', borderRadius:'12px', border:'1px solid #e5e5e5', fontSize:'15px'}} />
          <select value={currency} onChange={e=>setCurrency(e.target.value)} style={{width:'110px', padding:'14px', borderRadius:'12px', border:'1px solid #e5e5e5'}}>
            <option>USDT</option>
            <option>BTC</option>
            <option>ETH</option>
            <option>SOL</option>
            <option>BNB</option>
            <option>USD</option>
            <option>NGN</option>
          </select>
        </div>

        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (e.g 1650 per USDT)" style={{width:'100%', padding:'14px', borderRadius:'12px', border:'1px solid #e5e5e5', marginBottom:'14px', fontSize:'15px'}} />
        
        <button onClick={postOffer} style={{width:'100%', padding:'14px', background:'#000', color:'#fff', border:'none', borderRadius:'12px', fontWeight:600, fontSize:'15px'}}>Post Offer</button>
      </div>

      <div style={{marginTop:'24px', display:'flex', justifyContent:'space-between'}}>
        <b style={{fontSize:'14px'}}>Live Offers</b>
        <span style={{fontSize:'12px', color:'#888'}}>{offers.length}</span>
      </div>

      <div style={{marginTop:'12px'}}>
        {offers.length===0 ? (
          <div style={{textAlign:'center', padding:'50px 20px', color:'#aaa', border:'1px dashed #eee', borderRadius:'16px', marginTop:'10px', fontSize:'14px'}}>
            No offers yet
          </div>
        ) : offers.map((o,i)=>(
          <div key={i} style={{border:'1px solid #eee', borderRadius:'14px', padding:'14px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:'14px', fontWeight:600}}>{o.type.toUpperCase()} {o.amount} {o.currency} <span style={{fontWeight:400, color:'#666', fontSize:'13px'}}>• {o.price}</span></div>
              <div style={{fontSize:'11px', color:'#888', marginTop:'2px'}}>{o.seller_tag}</div>
            </div>
            <button onClick={()=>openChat(o)} style={{background:'#000', color:'#fff', border:'none', padding:'10px 18px', borderRadius:'20px', fontSize:'13px', fontWeight:600}}>Trade</button>
          </div>
        ))}
      </div>
    </div>
  )
}
