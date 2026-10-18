import { useState } from 'react';

export default function CryptoPage(){
  const [filter, setFilter] = useState('All');

  const liveRates = [
    {symbol:'BTC', name:'Bitcoin', price:'₦112,450,000', change:'+2.3%', color:'bg-orange-100'},
    {symbol:'USDT', name:'Tether USD', price:'₦1,650', change:'+0.01%', color:'bg-green-100'},
    {symbol:'ETH', name:'Ethereum', price:'₦4,250,000', change:'-0.8%', color:'bg-blue-100'},
    {symbol:'SOL', name:'Solana', price:'₦145,000', change:'+5.1%', color:'bg-purple-100'},
  ];

  const p2pOffers = [
    {id:'CRY-001', seller:'@btc_lagos', asset:'0.5 BTC', price:'₦112M / BTC', limit:'₦50k - ₦5M'},
    {id:'CRY-002', seller:'@usdt_abuja', asset:'500 USDT', price:'₦1,650 / $1', limit:'₦10k - ₦825k'},
    {id:'CRY-003', seller:'@ib_eth', asset:'2 ETH', price:'₦4.25M / ETH', limit:'₦100k - ₦8.5M'},
  ];

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="font-bold text-xl">Crypto</h1>
      <p className="text-xs text-gray-500">Live market + P2P — No escrow account here</p>

      {/* Filter like Binance */}
      <div className="flex gap-2 mt-4">
        {['All','BTC','USDT','ETH'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${filter===f?'bg-black text-white':'bg-gray-100'}`}>{f}</button>
        ))}
      </div>

      {/* LIVE LIST - THIS WAS MISSING */}
      <div className="mt-5">
        <h2 className="font-bold text-sm">📈 Live Rates</h2>
        <div className="mt-3 space-y-2">
          {liveRates.filter(c=>filter==='All' || c.symbol===filter).map(c=>(
            <div key={c.symbol} className="flex justify-between items-center border rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center font-bold text-xs`}>{c.symbol[0]}</div>
                <div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{c.price}</p>
                <p className={`text-xs font-bold ${c.change.includes('+')?'text-green-600':'text-red-600'}`}>{c.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crypto P2P Board - separate from Escrow */}
      <div className="mt-8">
        <h2 className="font-bold text-sm">🟢 Crypto P2P Board</h2>
        <p className="text-[11px] text-gray-500">Message seller → opens private escrow room</p>
        <div className="mt-3 space-y-3">
          {p2pOffers.map(o=>(
            <div key={o.id} className="border rounded-2xl p-4">
              <div className="flex justify-between">
                <p className="font-bold text-sm">{o.asset} available</p>
                <p className="text-xs bg-gray-100 px-2 py-1 rounded-full">{o.limit}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{o.seller} • {o.price} • {o.id}</p>
              <button className="w-full mt-3 bg-black text-white py-2 rounded-full text-xs font-bold">Message {o.seller} — Trade with Escrow</button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-center text-gray-400 mt-6">Rates auto-refresh • Escrow locked in private room only</p>
    </div>
  )
}
