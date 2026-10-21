export default async function handler(req, res) {
  const BASE = process.env.BUSHA_BASE_URL;
  const KEY = process.env.BUSHA_SECRET_KEY;

  if (!KEY || !BASE) {
    return res.status(500).json({ error: "Keys not set in Vercel" });
  }

  try {
    // Try to get ticker from Busha sandbox
    const response = await fetch(`${BASE}/api/v3/tickers?local_currency=NGN`, {
      headers: {
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json({ success: true, source: "Busha", data });

  } catch (err) {
    // Fallback - if Busha fails, return mock so page no break
    return res.status(200).json({ 
      success: false, 
      error: err.message,
      fallback: [
        { coin: "BTC", name: "Bitcoin", ngn: 112000000 },
        { coin: "USDT", name: "Tether", ngn: 1620 }
      ]
    });
  }
}
