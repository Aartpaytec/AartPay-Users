export default async function handler(req,res){
 try{
  const r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,ethereum,solana,binancecoin&vs_currencies=ngn,usd');
  const p=await r.json();
  const data=[
   {base_currency:'BTC',price:p.bitcoin?.ngn,usd:p.bitcoin?.usd},
   {base_currency:'USDT',price:p.tether?.ngn,usd:p.tether?.usd},
   {base_currency:'ETH',price:p.ethereum?.ngn,usd:p.ethereum?.usd},
   {base_currency:'SOL',price:p.solana?.ngn,usd:p.solana?.usd},
   {base_currency:'BNB',price:p.binancecoin?.ngn,usd:p.binancecoin?.usd},
  ];
  return res.status(200).json({data});
 }catch(e){return res.status(200).json({error:e.message});}
}
