import { useState, useEffect } from 'react';

export default function Escrow(){
  const offers = [
    {id:'ESC-001', seller:'@seller_01', store:'Salau Store', asset:'50 USDT', price:'₦1,650 / $1'},
    {id:'ESC-002', seller:'@btc_lagos', store:'Lagos Crypto', asset:'0.5 BTC', price:'₦112M / BTC'},
    {id:'ESC-003', seller:'@ib_eth', store:'IB Vendor', asset:'2 ETH', price:'₦6.4M'},
  ];
  const [room,setRoom]=useState<any>(null);
  const [wema,setWema]=useState('');
  const [sec,setSec]=useState(300);
  const [msgs,setMsgs]=useState<any[]>([]);
  const [input,setInput]=useState('');

  useEffect(()=>{ if(room && sec>0){ const t=setTimeout(()=>setSec(s=>s-1),1000); return ()=>clearTimeout(t);} },[room,sec]);

  const send=()=>{
    if(!input.trim()) return;
    setMsgs([...msgs, {from:'You', text:input}]);
    const text=input; setInput('');
    setTimeout(()=>setMsgs(m=>[...m, {from:room.seller, text:`Received. I don lock my ${room.asset}` }]),800);
  };

  if(!room){
    return (
      <div className="min-h-screen bg-white text-black p-4">
        <h1 className="font-bold text-xl">Escrow P2P</h1>
        <p className="text-xs text-gray-500">You: @salawuakeem395</p>
        
        <div className="mt-6">
          <h2 className="font-bold text-sm">🟢 P2P Live Board</h2>
          <div className="space-y-3 mt-3">
            {offers.map(o=>(
              <div key={o.id} className="border rounded-2xl p-4 flex justify-between items-center">
                <div><p className="font-bold text-sm">{o.asset} available</p><p className="text-xs text-gray-500">{o.store} • {o.seller} • {o.price}</p></div>
                <button onClick={()=>{setRoom(o); setSec(300); setWema(''); setMsgs([]);}} className="bg-black text-white px-3 py-1.5 rounded-full text-xs">Message {o.seller}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 flex flex-col">
      <button onClick={()=>setRoom(null)} className="text-sm mb-3 text-left">← Back to P2P</button>
      <h1 className="font-bold">PRIVATE ROOM: {room.id}</h1>
      <p className="text-xs text-green-600 mt-1">🔒 {room.asset} LOCKED - {Math.floor(sec/60)}:{String(sec%60).padStart(2,'0')}</p>

      {!wema ? (
        <button onClick={()=>setWema(`WEMA (Flutterwave) - 1788 672 ${Math.floor(1000+Math.random()*9000)} - AartPay Services - Ref: ${room.id}`)} className="w-full bg-black text-white py-3 rounded-xl font-bold mt-4">Generate Escrow Account</button>
      ) : (
        <div className="mt-4 border-2 border-green-600 rounded-xl p-3 bg-green-50">
          <p className="text-[11px] font-bold text-green-700">SECURED ESCROW ACCOUNT (Flutterwave)</p>
          <p className="font-bold text-sm mt-1">{wema}</p>
          <p className="text-[10px] mt-1 text-gray-600">Transfer exact amount. Do NOT add note. Auto-confirms. No narration. No CBN issue.</p>
        </div>
      )}

      <div className="flex-1 mt-4 border rounded-xl flex flex-col h-[350px]">
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {msgs.length===0 && <p className="text-xs text-gray-400 text-center mt-10">No messages yet. Start chat - End-to-End Encrypted</p>}
          {msgs.map((m,i)=>(
            <div key={i} className={m.from==='You'?'bg-black text-white ml-10 p-2 rounded-xl text-sm self-end':'bg-gray-100 mr-10 p-2 rounded-xl text-sm self-start'}>
              <p className="text-[10px] opacity-60">{m.from}</p>{m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-2 border-t">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Type message..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
          <button onClick={send} className="bg-black text-white px-5 rounded-full text-sm">Send</button>
        </div>
      </div>
    </div>
  )
}
