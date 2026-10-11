export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET_KEY || process.env.VITE_FLUTTERWAVE_SECRET_KEY;

  if (!FLW_SECRET) {
    return res.status(500).json({ error: "Flutterwave secret key not found in Vercel env" });
  }

  try {
    const { email, ref } = req.body || {};
    const tx_ref = ref || `AART-ESC-${Date.now()}`;

    const response = await fetch("https://api.flutterwave.com/v3/virtual-account-numbers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || "user@aartpay.com",
        tx_ref: tx_ref,
        is_permanent: true,
        bvn: "22222222222",
        firstname: "AartPay",
        lastname: "User",
        narration: "AartPay Escrow Service",
      }),
    });

    const data = await response.json();
    console.log("FLW Response:", data);

    if (data.status !== "success") {
      return res.status(400).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
