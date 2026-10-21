export default async function handler(req, res){
  const URL = process.env.SUPABASE_URL
  const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
  
  if(req.method === "POST"){
    const { roomId, trade_id, sender, sender_id, message } = req.body
    const finalId = roomId || trade_id
    const finalSender = sender || sender_id
    if(!finalId || !message) return res.status(400).json({error:"missing"})
    
    await fetch(`${URL}/rest/v1/escrow_chats`,{
      method:"POST",
      headers:{apikey:KEY, Authorization:`Bearer ${KEY}`, "Content-Type":"application/json", Prefer:"return=minimal"},
      body: JSON.stringify({ trade_id: finalId, sender_id: finalSender, message })
    })
    return res.status(200).json({success:true})
  }

  if(req.method === "GET"){
    const trade_id = req.query.roomId || req.query.trade_id
    const r = await fetch(`${URL}/rest/v1/escrow_chats?trade_id=eq.${trade_id}&order=created_at.asc`,{
      headers:{apikey:KEY, Authorization:`Bearer ${KEY}`}
    })
    const data = await r.json()
    return res.status(200).json(Array.isArray(data)?data:[])
  }
}
