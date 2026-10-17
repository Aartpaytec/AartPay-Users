import { useState, useEffect } from 'react';

export default function Escrow(){
  const trades = [
    {id:'AART-ESC-001', seller:'@seller_01', name:'Salau Store', asset:'50 USDT', rate:'₦1,650 / $1', balance: 100},
    {id:'AART-ESC-002', seller:'@btc_lagos', name:'Lagos Crypto', asset:'0.5 BTC', rate:'₦112M / BTC', balance: 2},
  ];

  const [active,setActive]=useState<any>(null);
  const [wema,setWema]=useState<string>("");
  const [sec,setSec]=useState(300);
  const [assetLocked,setAssetLocked]=useState(false);

  useEffect(()=>{
    if(active && sec>0){ const t=setTimeout(()=>setSec(s=>s-1),1000); return ()=>clearTimeout(t); }
  },[active,sec]);

  const canGenerate = assetLocked && active && (active.balance >= parseFloat(active.asset));

  const generateWema = ()=>{
    if(!canGenerate) return;
    setWema(`WEMA (Flutterwave) - 1788 672 ${Math.floor(1000+Math.random()*9000)} - AartPay Services - Ref: ${active.id}`);
  };

  if(!active){
    return (
      <div className="min-h-screen bg-white p-4 text-black">
        <div className="flex items-center gap-2"><span>🔒</span><h1 className="font-bold text-xl">Escrow P2P</h1></div>
        <p className="text-sm text-gray-500">You: @salawuakeem395 - Safe trades only</p>
        <h2 className="mt-6 font-bold">🟢 P2P Live Board</h2>
        <div className="flex gap-2 mt-3">
          <select className="bg-gray-100 px-3 py-3 rounded-xl font-bold text-blue-600"><option>USDT</option><option>BTC</option></select>
          <input placeholder="100 USDT available" className="flex-1 bg-gray-100 rounded-xl px-3" />
          <button className="bg-black text-white px-6 rounded-xl font-bold">Post</button>
        </div>
        <div className="mt-4 space-y-3">
          {trades.map(tr=>(
            <div key={tr.id} className="bg-gray-900 text-white p-4 rounded-2xl flex justify-between items-center">
              <div><p className="font-bold">{tr.asset} available</p><p className="text-sm text-gray-400">{tr.name} • {tr.seller} • {tr.rate}</p></div>
              <button onClick={()=>{setActive(tr); setSec(300); setWema(""); setAssetLocked(false);}} className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">Message {tr.seller}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <button onClick={()=>setActive(null)} className="text-sm text-gray-400 mb-4">← Back to P2P</button>
      <h1 className="font-bold text-xl">PRIVATE ROOM: {active.id}</h1>
      <p className="text-green-400 text-sm">🔒 {active.asset} LOCKED - {Math.floor(sec/60)}:{String(sec%60).padStart(2,'0')} left</p>
      {!assetLocked ? (
        <button onClick={()=>setAssetLocked(true)} className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-xl font-bold">Lock {active.asset} First</button>
      ) : (
        <p className="mt-4 text-sm text-green-400 bg-zinc-900 p-2 rounded">Asset locked ✓</p>
      )}
      {assetLocked && !wema && (
        <button onClick={generateWema} className="w-full mt-4 bg-white text-black py-3 rounded-xl font-bold">Generate Escrow Account For This Trade</button>
      )}
      {wema && (
        <div className="mt-4 border border-green-500 rounded-xl p-4 bg-zinc-900">
          <p className="text-green-400 text-sm font-bold">SECURED ESCROW ACCOUNT (Flutterwave)</p>
          <p className="font-bold text-lg mt-1">{wema}</p>
          <p className="text-xs mt-2">Ref: {active.id} • One account per trade • Private chat only</p>
        </div>
      )}
      <div className="mt-6 bg-zinc-900 p-3 rounded-xl">
        <p className="text-sm">Chat (End-to-End)</p>
        <div className="h-32 mt-2 bg-black rounded p-2 text-sm text-gray-400">Encrypted chat...</div>
        <input placeholder="Type message..." className="w-full mt-2 bg-black border border-zinc-700 p-2 rounded" />
      </div>
      <button className="w-full mt-6 bg-red-600 py-3 rounded-xl font-bold">Cancel & Unlock</button>
    </div>
  );
}
