import { useState } from 'react';

type Coin = { id:string; name:string; symbol:string; priceNGN:number; priceUSD:number; change:string; icon:string };

export default function Crypto() {
  const [currency, setCurrency] = useState<'NGN'|'USD'>('NGN');

  const coins: Coin[] = [
    { id:'btc', name:'Bitcoin', symbol:'BTC', priceNGN: 112_000_000, priceUSD: 68000, change:'+2.1%', icon:'₿' },
    { id:'eth', name:'Ethereum', symbol:'ETH', priceNGN: 4_200_000, priceUSD: 2550, change:'+1.4%', icon:'Ξ' },
    { id:'usdt', name:'Tether', symbol:'USDT', priceNGN: 1650, priceUSD: 1, change:'0.0%', icon:'$' },
    { id:'sol', name:'Solana', symbol:'SOL', priceNGN: 450_000, priceUSD: 273, change:'+5.2%', icon:'◎' },
    { id:'bnb', name:'BNB', symbol:'BNB', priceNGN: 1_200_000, priceUSD: 728, change:'+0.8%', icon:'B' },
  ];

  const formatPrice = (c:Coin) => {
    if(currency==='NGN'){
      return c.priceNGN >= 1000000 ? `₦${(c.priceNGN/1000000).toFixed(2)}M` : `₦${c.priceNGN.toLocaleString()}`;
    } else {
      return `$${c.priceUSD.toLocaleString()}`;
    }
  };

  return (
    <div style={{padding:16, background:'#f8fafc', minHeight:'100vh', fontFamily:'system-ui'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Crypto</h2>
        <div style={{display:'flex', background:'#fff', borderRadius:20, padding:4, border:'1px solid #e2e8f0'}}>
          <button onClick={()=>setCurrency('NGN')} style={{padding:'6px 14px', borderRadius:16, border:'none', background: currency==='NGN' ? 'black':'transparent', color: currency==='NGN'?'white':'#64748b', fontWeight:700, fontSize:12}}>₦ NGN</button>
          <button onClick={()=>setCurrency('USD')} style={{padding:'6px 14px', borderRadius:16, border:'none', background: currency==='USD' ? 'black':'transparent', color: currency==='USD'?'white':'#64748b', fontWeight:700, fontSize:12}}>$ USD</button>
        </div>
      </div>
      <div style={{fontSize:11, color:'#64748b', marginTop:4}}>Live rates • No WEMA • Instant trade</div>

      <div style={{marginTop:16, display:'flex', flexDirection:'column', gap:10}}>
        {coins.map(c=>(
          <div key={c.id} style={{background:'#fff', borderRadius:16, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <div style={{width:36, height:36, borderRadius:18, background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>{c.icon}</div>
              <div>
                <div style={{fontWeight:700, fontSize:14}}>{c.name} <span style={{color:'#94a3b8', fontWeight:400, fontSize:12}}>{c.symbol}</span></div>
                <div style={{fontSize:11, color: c.change.startsWith('+')?'#16a34a':'#dc2626'}}>{c.change} today</div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:800, fontSize:14}}>{formatPrice(c)}</div>
              <div style={{display:'flex', gap:6, marginTop:6, justifyContent:'flex-end'}}>
                <button style={{fontSize:11, padding:'5px 10px', borderRadius:8, border:'none', background:'#16a34a', color:'white', fontWeight:700}}>Buy</button>
                <button style={{fontSize:11, padding:'5px 10px', borderRadius:8, border:'none', background:'#f1f5f9', color:'#334155', fontWeight:700}}>Sell</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:18, background:'#fff', borderRadius:12, padding:12, fontSize:11, color:'#64748b', border:'1px dashed #e2e8f0'}}>
        AartPay Crypto: Clean rates, no hidden fee. Toggle ₦ / $ at top. Rates update via Binance API later.
      </div>
    </div>
  );
}
