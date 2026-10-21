import { useState, useEffect } from 'react';

type Offer = { id:number; amountStr:string; type:string; seller:string; walletTag?:string }
type TradeRoom = { ref:string; wema:string; offer:Offer; msgs:any[] }

export default function EscrowP2P(){
  const myWallet:any = { USDT:100, BTC:0.5, ETH:2, BNB:10, SOL:100 }
  const myTag = "@salawakeem584"

  const [offers, setOffers] = useState<Offer[]>([
    {id:1, amountStr:"50 USDT", type:"USDT", seller:"@buyer1"},
    {id:2, amountStr:"0.5 BTC", type:"BTC", seller:"@cryptoKing"},
    {id:3, amountStr:"2 ETH", type:"ETH", seller:"@ethLord"},
    {id:4, amountStr:"10 BNB", type:"BNB", seller:"@bnbMan"},
    {id:5, amountStr:"100 SOL", type:"SOL", seller:"@salawakeem584"},
  ])

  const [postInput, setPostInput] = useState("100 USDT")
  const [room, setRoom] = useState<TradeRoom|null>(null)
  const [chatInput, setChatInput] = useState("")
  const [liveMsgs, setLiveMsgs] = useState<any[]>([])

  // ONE TIME WEMA - FRESH ACCOUNT
  const generateOneTimeAccount = () => {
    const ref = `AART-ESC-${Math.floor(100000 + Math.random()*900000)}`
    const wema = `1311${Math.floor(10000000 + Math.random()*89999999)}`
    return { ref, wema }
  }

  // LIVE LOAD CHAT FROM SUPABASE
  useEffect(() => {
    if(!room?.ref) return
    const load = async () => {
      try {
        const r = await fetch(`/api/chat?trade_id=${room.ref}`)
        const data = await r.json()
        if(Array.isArray(data)) setLiveMsgs(data)
      } catch(e){}
    }
    load()
    const t = setInterval(load, 3000)
    return () => clearInterval(t)
  }, [room?.ref])

  const handlePost = () => {
    const parts = postInput.split(" ")
    const amt = parseFloat(parts[0])
    const type = (parts[1]||"USDT").toUpperCase() as any
    if(!myWallet[type]){ alert(`You no get ${type}`); return }
    if(amt > myWallet[type]){ alert(`BLOCKED: You wan sell ${amt} ${type} but you get ${myWallet[type]}`); return }
    const newOffer:Offer = {id:Date.now(), amountStr:postInput, type, seller:myTag}
    setOffers([newOffer, ...offers])
    setPostInput("")
  }

  const openPrivateRoom = async (o:Offer) => {
    const {ref, wema} = generateOneTimeAccount()
    setRoom({ ref, wema, offer:o, msgs:[] })
    setLiveMsgs([])
    // Save system message to backend
    await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ trade_id: ref, sender_id: 'system', message: `Welcome ${o.seller} - Escrow secured. Ref: ${ref}. WEMA: ${wema}. Do NOT add narration.` })
    })
  }

  const sendChat = async () => {
    if(!chatInput.trim() || !room?.ref) return
    const msg = chatInput
    setChatInput("")
    await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ trade_id: room.ref, sender_id: myTag, message: msg })
    })
    // reload instantly
    const r = await fetch(`/api/chat?trade_id=${room.ref}`)
    setLiveMsgs(await r.json())
  }

  // PRIVATE ROOM VIEW
  if(room){
    return(
      <div style={{padding:10, background:'#fff', minHeight:'100vh'}}>
        <button onClick={()=>setRoom(null)} style={{marginBottom:10}}>&larr; Back to P2P Board</button>
        <h3>Private Room with {room.offer.seller} - {room.offer.amountStr}</h3>

        <div style={{border:'2px dashed #16a34a', padding:10, borderRadius:10, background:'#f0fdf4'}}>
          <div style={{fontWeight:700}}>WEMA (Flutterwave) - {room.wema} - AartPay Services</div>
          <div style={{fontSize:12, color:'#666'}}>Ref: {room.ref} - Expires in 20 mins - DO NOT add note</div>
          <div style={{fontSize:12, color:'#eab308', marginTop:5, fontWeight:600}}>Transfer exact amount with ref, then click I Have Paid</div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:10}}>
          <button style={{flex:1, padding:10, background:'#22c55e', color:'white', border:'none', borderRadius:8, fontWeight:700}}>I Have Paid - Confirm</button>
          <button style={{flex:1, padding:10}}>Dispute</button>
        </div>

        {/* --- AARTPAY SECURE CHAT (WhatsApp Style) --- */}
        <div style={{marginTop:15, background:'#e5ddd5', borderRadius:12, padding:10}}>
          <div style={{height:350, overflowY:'auto'}}>
            {liveMsgs.map((m:any) => {
              const isMe = m.sender_id === myTag
              const isSys = m.sender_id === 'system'
              if(isSys) return <div key={m.id} style={{textAlign:'center', background:'#fff3cd', padding:6, borderRadius:10, fontSize:11, margin:'8px 0'}}>{m.message}</div>
              return (
                <div key={m.id} style={{display:'flex', justifyContent: isMe ? 'flex-end':'flex-start', margin:'6px 0'}}>
                  <div style={{background: isMe ? '#dcf8c6':'white', padding:'8px 12px', borderRadius: isMe ? '15px 15px 0 15px':'15px 15px 15px 0', maxWidth:'75%', boxShadow:'0 1px 1px rgba(0,0,0,0.2)'}}>
                    <div style={{fontSize:10, color:'#128C7E', fontWeight:'bold'}}>{isMe ? 'You' : m.sender_id}</div>
                    <div style={{fontSize:14}}>{m.message}</div>
                    <div style={{fontSize:10, color:'gray', textAlign:'right'}}>{m.created_at ? new Date(m.created_at).toLocaleTimeString() : ''} {isMe && '✓✓'}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{display:'flex', gap:8, background:'white', padding:8, borderRadius:25, marginTop:10}}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyPress={e=>e.key==='Enter' && sendChat()} placeholder="Type a message..." style={{flex:1, border:'none', outline:'none'}} />
            <button onClick={sendChat} style={{background:'#128C7E', color:'white', border:'none', borderRadius:'50%', width:40, height:40}}>➤</button>
          </div>
        </div>
      </div>
    )
  }

  // P2P BOARD (NO WEMA HERE - SECURE)
  return(
    <div style={{padding:10, background:'#f8fafc', minHeight:'100vh'}}>
      <h2>Escrow P2P</h2>
      <div style={{fontSize:12, color:'#16a34a', marginBottom:10}}>You: {myTag} - Unique tag no fit duplicate. No WEMA here until private room.</div>
      
      <div style={{display:'flex', gap:8, background:'#fff', padding:10, borderRadius:10, marginBottom:10}}>
        <input value={postInput} onChange={e=>setPostInput(e.target.value)} placeholder="e.g 50 USDT" style={{flex:1, padding:8, borderRadius:8, border:'1px solid #ddd'}} />
        <button onClick={handlePost} style={{background:'black', color:'white', padding:'8px 15px', borderRadius:8}}>Post</button>
      </div>

      {offers.map(o => (
        <div key={o.id} style={{background:'#fff', padding:12, borderRadius:10, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>{o.amountStr} - {o.type}</div>
            <div style={{fontSize:11, color:'#666'}}>{o.seller} {o.seller===myTag && '(You)'}</div>
          </div>
          <button onClick={()=>openPrivateRoom(o)} style={{background:'#16a34a', color:'white', border:'none', padding:'8px 12px', borderRadius:8}}>Trade</button>
        </div>
      ))}
    </div>
  )
}
