export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
  if (req.method === "POST") {
    const { trade_id, sender_id, message } = req.body
    await fetch(`${SUPABASE_URL}/rest/v1/escrow_chats`, {
      method: "POST",
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ trade_id, sender_id, message, created_at: new Date().toISOString() })
    })
    return res.status(200).json({success: true})
  }
  if (req.method === "GET") {
    const { trade_id } = req.query
    const r = await fetch(`${SUPABASE_URL}/rest/v1/escrow_chats?trade_id=eq.${trade_id}&order=created_at.asc`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` }
    })
    return res.status(200).json(await r.json())
  }
}
