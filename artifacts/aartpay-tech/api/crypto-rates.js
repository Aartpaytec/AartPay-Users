export default async function handler(req,res){
  try{
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,ethereum,solana,binancecoin&vs_currencies=ngn');
    const p = await r.json();
    const data = [
      {base_currency:'BTC', price:p.bitcoin?.ngn || 112500000},
      {base_currency:'USDT', price:p.tether?.ngn || 1650},
      {base_currency:'ETH', price:p.ethereum?.ngn || 3300000},
      {base_currency:'SOL', price:p.solana?.ngn || 140000},
      {base_currency:'BNB', price:p.binancecoin?.ngn || 990000},
    ];
    return res.status(200).json({data});
  }catch(e){
    return res.status(200).json({data:[], error:e.message});
  }
}
