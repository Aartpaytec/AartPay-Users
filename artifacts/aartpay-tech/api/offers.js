export default async function handler(req,res){
  const URL=process.env.SUPABASE_URL
  const KEY=process.env.SUPABASE_SERVICE_KEY||process.env.SUPABASE_ANON_KEY
  if(req.method==="POST"){
    const {type,amount,currency,price,wallet_address,tag}=req.body
    if(!amount || !wallet_address) return res.status(400).json({error:"need wallet"})
    await fetch(`${URL}/rest/v1/escrow_offers`,{method:"POST", headers:{apikey:KEY, Authorization:`Bearer ${KEY}`, "Content-Type":"application/json", Prefer:"return=minimal"}, body: JSON.stringify({type,amount,currency,price,wallet_address,seller_tag:tag})})
    return res.json({success:true})
  }
  const r=await fetch(`${URL}/rest/v1/escrow_offers?status=eq.open&order=created_at.desc`,{headers:{apikey:KEY, Authorization:`Bearer ${KEY}`}})
  const data=await r.json()
  return res.json(Array.isArray(data)?data:[])
}
