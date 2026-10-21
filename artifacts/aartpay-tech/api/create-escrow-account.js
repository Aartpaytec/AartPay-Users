export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error: "POST only"})
  const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY
  if (!FLW_SECRET) return res.status(500).json({error: "Missing FLUTTERWAVE_SECRET_KEY in Vercel"})

  try {
    const { email, ref, amount, cryptoAmount, sellerBalance } = req.body
    if (sellerBalance !== undefined && cryptoAmount && sellerBalance < cryptoAmount) {
      return res.status(400).json({ error: `You no get ${cryptoAmount} asset` });
    }
    const tx_ref = ref || `AART-ESC-${Date.now()}`

    const response = await fetch("https://api.flutterwave.com/v3/virtual-account-numbers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FLW_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email || `escrow-${Date.now()}@aartpay.com`,
        is_permanent: false,
        tx_ref: tx_ref,
        amount: amount,
        narration: `AartPay Escrow ${tx_ref}`
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(400).json(data)

    // Save to Supabase
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
    if (SUPABASE_URL && SERVICE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/escrows`, {
        method: "POST",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          ref: tx_ref,
          amount_ngn: amount,
          account_number: data.data?.account_number || data.data?.account_number,
          bank_name: data.data?.bank_name,
          status: 'pending'
        })
      }).catch(()=>{})
    }

    return res.status(200).json({
      success: true,
      ref: tx_ref,
      account_number: data.data.account_number,
      bank_name: data.data.bank_name,
      bank: data.data.bank_name,
      shouldLockAsset: true
    })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
