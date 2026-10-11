export default async function handler(req, res) {
  if (req.method!== "POST") return res.status(405).json({ error: "Method not allowed" });

  const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!FLW_SECRET) return res.status(500).json({ error: "Add FLUTTERWAVE_SECRET_KEY to Vercel" });

  try {
    const { email, ref, amount, cryptoAmount, sellerBalance } = req.body || {};

    // YOUR PAPER RULE 1: Seller must have worth of asset
    if (sellerBalance!== undefined && cryptoAmount && sellerBalance < cryptoAmount) {
      return res.status(400).json({
        error: `You no get ${cryptoAmount} asset! You only get ${sellerBalance}`
      });
    }

    const tx_ref = ref || `AART-ESC-${Date.now()}`;

    const response = await fetch("https://api.flutterwave.com/v3/virtual-account-numbers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FLW_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email || `escrow_${Date.now()}@aartpay.com`,
        is_permanent: false, // YOUR PAPER RULE: Temporary, one per trade
        bvn: "12345678901",
        tx_ref: tx_ref,
        amount: amount,
        narration: `AartPay Escrow ${tx_ref}`
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(400).json({ error: data.message, details: data });

    return res.status(200).json({
      success: true,
      tradeId: tx_ref,
      account_number: data.data.account_number,
      bank_name: data.data.bank_name,
      bank: "WEMA Bank",
      shouldLockAsset: true, // YOUR PAPER RULE: When sell to dec on, asset must lock
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
