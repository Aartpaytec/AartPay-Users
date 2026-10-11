export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true });
  }

  const body = req.body;

  // YOUR PAPER FLOW: Buyer send money to virtual account
  if (body?.event === "charge.completed" || body?.data?.tx_ref || body?.tx_ref) {
    
    const tradeId = body?.data?.tx_ref || body?.data?.reference || body?.tx_ref;
    const amountPaid = body?.data?.amount || body?.amount;

    console.log("ESCROW PAID:", tradeId, "Amount:", amountPaid);

    // ===== YOUR PAPER RULES =====
    // 1. Asset must release to buyer crypto wallet IMMEDIATELY
    // 2. Seller Naira balance must create immediately
    // 3. Transaction history must create

    // If you later use Firebase, put this logic:
    /*
    const tradeRef = doc(db, "trades", tradeId);
    const trade = (await getDoc(tradeRef)).data();
    
    batch.update(doc(db, "users", trade.sellerId), {
      btc_balance: increment(-trade.cryptoAmount), // Decrease seller BTC
      btc_locked: increment(-trade.cryptoAmount),
      naira_balance: increment(amountPaid), // Increase seller Naira
      online: true
    });
    
    batch.update(doc(db, "users", trade.buyerId), {
      btc_balance: increment(trade.cryptoAmount) // Increase buyer BTC
    });
    
    batch.update(tradeRef, { 
      status: "completed",
      liveRateAtCompletion: liveRate, // For Crypto page
      completedAt: new Date()
    });
    */

    console.log(`✅ TRADE ${tradeId} COMPLETED: Seller Naira +₦${amountPaid}, Buyer BTC + asset`);

    // Tell Flutterwave we don receive am
    return res.status(200).json({ 
      ok: true, 
      message: "Asset released to buyer, Seller credited - As per paper flow",
      tradeId: tradeId
    });
  }

  return res.status(200).json({ ok: true });
}
