export default async function handler(req,res){
  const URL=process.env.SUPABASE_URL
  const KEY=process.env.SUPABASE_SERVICE_KEY||process.env.SUPABASE_ANON_KEY
  if(req.method==="POST"){
    const {offer_id, buyer_tag, seller_tag, amount, currency}=req.body
    const virtual_account = "WEMA-" + Math.floor(1000000000+Math.random()*9000000000)
    const r = await fetch(`${URL}/rest/v1/escrow_trades`,{method:"POST", headers:{apikey:KEY, Authorization:`Bearer ${KEY}`, "Content-Type":"application/json", Prefer:"return=representation"}, body: JSON.stringify({offer_id, buyer_tag, seller_tag, virtual_account, amount, currency})})
    const data=await r.json()
    return res.json(data[0])
  }
  if(req.method==="GET"){
    const trade_id=req.query.trade_id
    const r=await fetch(`${URL}/rest/v1/escrow_trades?id=eq.${trade_id}`,{headers:{apikey:KEY, Authorization:`Bearer ${KEY}`}})
    const data=await r.json()
    return res.json(data[0]||null)
  }
}
