import { useState, useEffect } from "react";

export default function EscrowPage() {
  // Mock current user - later Firebase go give you real user
  const currentUser = { id: "user_" + Math.random().toString(36).slice(2), username: "@You", email: "you@aartpay.com" };

  const [myAssets, setMyAssets] = useState({ BTC: 50, USDT: 1000 });
  const [myNaira, setMyNaira] = useState(20000);
  const [allTrades, setAllTrades] = useState([
    { id: "TRADE-ADE", seller: "@Ade", sellerId: "1", crypto: "BTC", amount: 2, price: 50000, online: "Online 🟢" },
    { id: "TRADE-CHIOMA", seller: "@Chioma", sellerId: "2", crypto: "USDT", amount: 100, price: 150000, online: "Offline ⚫" },
  ]);
  const [activeTrade, setActiveTrade] = useState<any>(null);
  const [vAccount, setVAccount] = useState<any>(null);

  const handleSell = (crypto: string, amount: number, price: number) => {
    if ((myAssets as any)[crypto] < amount) {
      alert(`You get only ${(myAssets as any)[crypto]} ${crypto}`);
      return;
    }
    const newTrade = {
      id: `AART-ESC-${Date.now()}`,
      seller: currentUser.username,
      sellerId: currentUser.id,
      crypto, amount, price,
      online: "Online 🟢", status: "open"
    };
    setAllTrades([newTrade,...allTrades]);
    setActiveTrade(newTrade);
  };

  const handleGenerate = async () => {
    if (!activeTrade) return;
    try {
      const res = await fetch("/api/create-escrow-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          ref: activeTrade.id,
          amount: activeTrade.price,
          cryptoAmount: activeTrade.amount,
          sellerBalance: (myAssets as any)[activeTrade.crypto]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMyAssets(prev => ({...prev, [activeTrade.crypto]: (prev as any)[activeTrade.crypto] - activeTrade.amount }));
      setVAccount({ number: data.account_number, bank: data.bank_name });
    } catch (e: any) { alert(e.message); }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>ESCROW MARKET - Many Users</h2>
      <p>You: {currentUser.username} | BTC: {myAssets.BTC} | USDT: {myAssets.USDT} | ₦{myNaira}</p>

      <button onClick={() => handleSell("BTC", 2, 50000)} style={{ padding: 12, background: "green", color: "white", marginRight: 10 }}>Sell 2 BTC</button>
      <button onClick={() => handleSell("USDT", 100, 150000)} style={{ padding: 12, background: "green", color: "white" }}>Sell 100 USDT</button>

      <h3 style={{ marginTop: 20 }}>All Offers ({allTrades.length})</h3>
      {allTrades.map(t => (
        <div key={t.id} onClick={() => setActiveTrade(t)} style={{ border: "1px solid #ccc", padding: 10, marginTop: 8, background: activeTrade?.id === t.id? "#e0ffe0" : "white" }}>
          <b>{t.seller}</b> - {t.online} - {t.amount} {t.crypto} for ₦{t.price}
        </div>
      ))}

      {activeTrade && (
        <div style={{ border: "2px solid black", marginTop: 20, padding: 15 }}>
          <h3>Private Room with {activeTrade.seller}</h3>
          {!vAccount? (
            activeTrade.sellerId === currentUser.id?
            <button onClick={handleGenerate} style={{ width: "100%", background: "orange", padding: 12 }}>Generate WEMA & Lock {activeTrade.amount} {activeTrade.crypto}</button>
            : <p>Waiting for seller to generate account...</p>
          ) : (
            <div><h2>{vAccount.number}</h2><p>{vAccount.bank}</p><p style={{color:"red"}}>LOCKED: {activeTrade.amount} {activeTrade.crypto} - One account per trade</p></div>
          )}
        </div>
      )}
    </div>
  );
}
