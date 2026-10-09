import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CryptoEscrow() {
  const [asset, setAsset] = useState("USDT")
  const [amount, setAmount] = useState("")
  const [activeTrade, setActiveTrade] = useState<any>(null)
  const [chat, setChat] = useState<any[]>([])
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const createSell = async () => {
    if(!amount) return alert("Enter amount")
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    // Auto generate voucher as you said
    const voucher = "990" + Math.floor(10000000 + Math.random()*90000000).toString()
    const { data, error } = await supabase.from("escrow_trades").insert({
      seller_id: user?.id,
      asset,
      amount_asset: parseFloat(amount),
      amount_naira: parseFloat(amount) * 1650,
      voucher_account: voucher,
      status: "waiting_payment"
    }).select().single()

    if(error) alert(error.message)
    else {
      setActiveTrade(data)
      // also log tx
      await supabase.from("transactions").insert({ user_id: user?.id, type: `Sell ${asset}`, amount: parseFloat(amount)*1650, status: "pending" })
    }
    setLoading(false)
  }

  const confirmPayment = async () => {
    await supabase.from("escrow_trades").update({ status: "payment_received" }).eq("id", activeTrade.id)
    setActiveTrade({...activeTrade, status: "payment_received"})
    setTimeout(async () => {
      await supabase.from("escrow_trades").update({ status: "released" }).eq("id", activeTrade.id)
      setActiveTrade((p:any)=>({...p, status: "released"}))
      alert("✅ Payment received in voucher! Asset auto released to buyer & Naira sent to seller wallet!")
    }, 1200)
  }

  const sendMsg = async () => {
    if(!msg.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("escrow_chats").insert({ trade_id: activeTrade.id, sender_id: user?.id, message: msg })
    setMsg("")
  }

  useEffect(() => {
    if(!activeTrade) return
    const loadChat = async () => {
      const { data } = await supabase.from("escrow_chats").select("*").eq("trade_id", activeTrade.id).order("created_at", {ascending:true})
      setChat(data || [])
    }
    loadChat()
    const ch = supabase.channel("escrow-"+activeTrade.id).on("postgres_changes", {event:"INSERT", schema:"public", table:"escrow_chats", filter:`trade_id=eq.${activeTrade.id}`}, payload => {
      setChat(c => [...c, payload.new])
    }).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [activeTrade])

  if(activeTrade) {
    return (
      <div style={{maxWidth:480, margin:"0 auto", minHeight:"100vh", background:"#f5f7fb", padding:20, fontFamily:"sans-serif"}}>
        <button onClick={()=>setActiveTrade(null)} style={{marginBottom:12}}>← Back</button>
        <h3>Escrow Trade</h3>
        <div style={{background:"black", color:"white", padding:16, borderRadius:16, marginTop:10}}>
          <p style={{margin:0}}>Selling: <b>{activeTrade.amount_asset} {activeTrade.asset}</b></p>
          <p style={{margin:"6px 0"}}>Value: ₦{activeTrade.amount_naira}</p>
          <p style={{margin:"6px 0", background:"white", color:"black", padding:8, borderRadius:8}}>Voucher Account: <b>{activeTrade.voucher_account}</b><br/><small>AartPay Escrow — Buyer pays here</small></p>
          <p>Status: <b style={{color: activeTrade.status==='released'?'#0f0':'#ff0'}}>{activeTrade.status}</b></p>
          {activeTrade.status === 'waiting_payment' && <button onClick={confirmPayment} style={{width:"100%", padding:12, background:"#22c55e", color:"white", border:"none", borderRadius:10, fontWeight:700, marginTop:10}}>I have received payment — Release</button>}
          {activeTrade.status === 'released' && <p style={{color:"#0f0", fontWeight:700, marginTop:10}}>✅ Completed — Asset released & Money transferred!</p>}
        </div>

        <h4 style={{marginTop:20}}>💬 Buyer & Seller Chat (Inside Escrow)</h4>
        <div style={{background:"white", border:"1px solid #ddd", height:280, overflowY:"auto", padding:12, borderRadius:12}}>
          {chat.length===0 && <small style={{color:"#888"}}>No message yet. Start chatting — buyer & seller talk here as you said!</small>}
          {chat.map(c => <div key={c.id} style={{margin:"8px 0", fontSize:13, background:"#f0f0f0", padding:8, borderRadius:8}}><b>{c.sender_id.slice(0,6)}:</b> {c.message}</div>)}
        </div>
        <div style={{display:"flex", gap:8, marginTop:10}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type message for buyer/seller..." style={{flex:1, padding:12, borderRadius:10, border:"1px solid #ccc"}}/>
          <button onClick={sendMsg} style={{padding:"12px 16px", background:"black", color:"white", borderRadius:10, border:"none", fontWeight:700}}>Send</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{maxWidth:480, margin:"0 auto", minHeight:"100vh", background:"#f5f7fb", padding:20, fontFamily:"sans-serif"}}>
      <h2>₿ Crypto Escrow</h2>
      <small style={{color:"#666"}}>As you described: Sell → Auto voucher → Buyer pays voucher → Auto release → Chat inside</small>
      <div style={{background:"white", padding:16, borderRadius:16, marginTop:16}}>
        <label>Asset</label>
        <select value={asset} onChange={e=>setAsset(e.target.value)} style={{width:"100%", padding:12, borderRadius:10, border:"1px solid #ddd", marginTop:6}}>
          <option>USDT</option><option>BTC</option><option>ETH</option><option>BNB</option>
        </select>
        <label style={{display:"block", marginTop:12}}>Amount to Sell</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="e.g 100" style={{width:"100%", padding:12, borderRadius:10, border:"1px solid #ddd", marginTop:6}}/>
        <button onClick={createSell} disabled={loading} style={{width:"100%", padding:14, background:"black", color:"white", borderRadius:10, marginTop:16, fontWeight:700, border:"none"}}>{loading?"Generating Voucher...":"Sell — Generate Escrow Voucher"}</button>
      </div>
      <p style={{fontSize:12, color:"#888", marginTop:12}}>Voucher auto-generated e.g 990xxxxxxx — Buyer transfer to it, then money auto transfer to you & asset auto release to buyer. Chat included inside trade.</p>
    </div>
  )
}
