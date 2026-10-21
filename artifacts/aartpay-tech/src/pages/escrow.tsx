import { useState, useEffect } from 'react'

export default function EscrowPage(){
  const [myTag, setMyTag] = useState("Buyer")
  const [room, setRoom] = useState<{ref:string, wema:string} | null>(null)
  const [refInput, setRefInput] = useState("")
  const [liveMsgs, setLiveMsgs] = useState<any[]>([])
  const [chatInput, setChatInput] = useState("")
  const [loading, setLoading] = useState(false)

  // CREATE ROOM
  const createRoom = async () => {
    setLoading(true)
    const ref = "AART-" + Math.random().toString(36).substring(2,8).toUpperCase()
    const wema = "WEMA-" + Math.floor(1000000000 + Math.random()*9000000000)
    setRoom({ref, wema})
    setLoading(false)
  }

  // JOIN ROOM
  const joinRoom = () => {
    if(!refInput.trim()) return
    setRoom({ref: refInput.trim(), wema: "WEMA-Loaded"})
  }

  // LIVE LOAD CHAT - FIXED NO WHITE SCREEN
  useEffect(()=>{
    if(!room?.ref) return
    let active = true
    const load = async ()=>{
      try{
        const r = await fetch(`/api/chat?roomId=${room.ref}`)
        const data = await r.json()
        if(active && Array.isArray(data)) setLiveMsgs(data)
      }catch(e){}
    }
    load()
    const t = setInterval(load, 3000)
    return ()=>{ active=false; clearInterval(t) }
  }, [room?.ref])

  const handleSendMsg = async ()=>{
    if(!chatInput.trim() || !room?.ref) return
    const msg = chatInput
    setChatInput("")
    // instant UI like WhatsApp
    setLiveMsgs(prev=>[...prev, {sender_id:myTag, message:msg, created_at: new Date().toISOString()}])
    try{
      await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ roomId: room.ref, sender: myTag, message: msg })
      })
    }catch(e){}
  }

  // BEFORE JOIN
  if(!room){
    return (
      <div style={{padding:'20px', maxWidth:'400px', margin:'0 auto'}}>
        <h2 style={{textAlign:'center'}}>🔒 AartPay Escrow</h2>
        
        <div style={{display:'flex', gap:'10px', margin:'20px 0'}}>
          <button onClick={()=>setMyTag("Buyer")} style={{flex:1, padding:'10px', background: myTag==="Buyer"?"#25d366":"#eee", borderRadius:'8px', border:'none'}}>Buyer</button>
          <button onClick={()=>setMyTag("Seller")} style={{flex:1, padding:'10px', background: myTag==="Seller"?"#25d366":"#eee", borderRadius:'8px', border:'none'}}>Seller</button>
        </div>

        <button onClick={createRoom} style={{width:'100%', padding:'15px', background:'black', color:'white', borderRadius:'10px', marginBottom:'15px'}}>
          {loading?"Creating...":"Create Private Room"}
        </button>

        <div style={{textAlign:'center', margin:'10px'}}>or</div>

        <input 
          value={refInput}
          onChange={e=>setRefInput(e.target.value)}
          placeholder="Enter Ref e.g AART-XYZ"
          style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}}
        />
        <button onClick={joinRoom} style={{width:'100%', padding:'12px', background:'#075e54', color:'white', borderRadius:'10px', marginTop:'10px', border:'none'}}>
          Join Room
        </button>
      </div>
    )
  }

  // INSIDE PRIVATE ROOM - WHATSAPP STYLE
  return (
    <div style={{padding:'10px', maxWidth:'500px', margin:'0 auto', background:'#fff', minHeight:'100vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px', background:'#075e54', color:'white', borderRadius:'10px 10px 0 0'}}>
        <div>
          <div style={{fontWeight:'bold'}}>{room.ref}</div>
          <div style={{fontSize:'11px'}}>{room.wema} • {myTag}</div>
        </div>
        <button onClick={()=>setRoom(null)} style={{background:'white', color:'#075e54', border:'none', padding:'5px 10px', borderRadius:'15px'}}>Leave</button>
      </div>

      <div style={{background:'#ece5dd', padding:'5px', borderRadius:'0 0 10px 10px'}}>
        {/* WHATSAPP CHAT AREA */}
        <div style={{background:'#e5ddd5', padding:'10px', height:'380px', overflowY:'auto', borderRadius:'8px'}}>
          <div style={{textAlign:'center', background:'#fff5c4', padding:'6px', borderRadius:'10px', fontSize:'11px', margin:'10px auto', maxWidth:'80%'}}>
            🔒 Messages are secured & saved in escrow_chats table
          </div>

          {liveMsgs.map((c,i)=>(
            <div key={i} style={{display:'flex', justifyContent: c.sender_id===myTag?'flex-end':'flex-start', margin:'6px 0'}}>
              <div style={{
                background: c.sender_id===myTag?'#dcf8c6':'white', 
                padding:'8px 12px', 
                borderRadius: c.sender_id===myTag ? '12px 12px 0 12px' : '12px 12px 12px 0', 
                maxWidth:'75%', 
                boxShadow:'0 1px 0.5px rgba(0,0,0,0.13)'
              }}>
                <div style={{fontSize:'10px', color:'#075e54', fontWeight:'bold'}}>{c.sender_id}</div>
                <div style={{fontSize:'14.5px', color:'#111'}}>{c.message}</div>
                <div style={{fontSize:'9px', color:'gray', textAlign:'right', marginTop:'2px'}}>
                  {c.created_at ? new Date(c.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''} ✓✓
                </div>
              </div>
            </div>
          ))}

          {liveMsgs.length===0 && (
            <div style={{textAlign:'center', color:'#667781', marginTop:'100px', fontSize:'13px'}}>
              No messages yet<br/>Start chatting like WhatsApp 💬
            </div>
          )}
        </div>

        {/* WHATSAPP INPUT */}
        <div style={{display:'flex', alignItems:'center', gap:'8px', marginTop:'10px', background:'white', padding:'5px 8px', borderRadius:'25px', border:'1px solid #ddd'}}>
          <input
            value={chatInput}
            onChange={(e)=>setChatInput(e.target.value)}
            placeholder="Type a message"
            style={{flex:1, border:'none', outline:'none', padding:'10px 12px', borderRadius:'25px', fontSize:'15px'}}
            onKeyDown={(e)=> e.key==='Enter' && handleSendMsg()}
          />
          <button onClick={handleSendMsg} style={{background:'#25D366', color:'white', border:'none', width:'45px', height:'45px', borderRadius:'50%', cursor:'pointer', fontSize:'18px'}}>
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}
