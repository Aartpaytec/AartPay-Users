export default function Crypto() {
  const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "₦112,345,000", change: "+2.3%" },
    { name: "USDT", symbol: "USDT", price: "₦1,650", change: "+0.1%" },
    { name: "Ethereum", symbol: "ETH", price: "₦4,230,000", change: "-1.2%" },
  ];
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold">Crypto Market • Live Rates</h1>
      <p className="text-xs text-gray-400">Real-time price • No escrow here</p>
      <div className="mt-4 space-y-3">
        {coins.map(c=>(
          <div key={c.symbol} className="bg-zinc-900 p-4 rounded-xl flex justify-between">
            <div><p className="font-bold">{c.name} ({c.symbol})</p><p className="text-sm text-gray-400">{c.price}</p></div>
            <span className={c.change.includes("+")?"text-green-400":"text-red-400"}>{c.change}</span>
          </div>
        ))}
      </div>
      <a href="/escrow" className="block mt-6 bg-white text-black text-center py-3 rounded-full font-bold">Buy via P2P Escrow →</a>
    </div>
  );
}
