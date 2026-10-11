export default async function handler(req,res){
  const FLW = process.env.FLW_SECRET_KEY; // Add this for Vercel Settings
  if(!FLW){
    return res.json({data:{card_pan:'4113 TEST CARD - Add FLW key for live', cvv:'123', expiration:'12/29'}});
  }
  const response = await fetch('https://api.flutterwave.com/v3/virtual-cards',{
    method:'POST',
    headers:{Authorization:`Bearer ${FLW}`,'Content-Type':'application/json'},
    body: JSON.stringify({
      currency: 'USD',
      amount: 3,
      billing_name: 'AartPay User',
      billing_address: 'Lagos',
      billing_city: 'Lagos',
      billing_country: 'NG'
    })
  });
  const data = await response.json();
  return res.status(200).json(data);
}
