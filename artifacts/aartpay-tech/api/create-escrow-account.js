export default async function handler(req, res) {
  const FLW_SECRET = process.env.FLW_SECRET_KEY;
  try {
    const r = await fetch("https://api.flutterwave.com/v3/virtual-account-numbers", {
      method: "POST",
      headers: { Authorization: `Bearer ${FLW_SECRET}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: req.body?.email || "user@aartpay.com",
        tx_ref: req.body?.ref || `AART-ESC-${Date.now()}`,
        is_permanent: true,
        bvn: "22222222222",
        firstname: "AartPay",
        lastname: "User",
        narration: "AartPay Services"
      })
    });
    const data = await r.json();
    res.json(data);
  } catch(e){ res.status(500).json({ error: e.message }) }
}
