export default async function handler(req,res){
  const {meter, disco, type} = JSON.parse(req.body);
  // Connect to VTPass or Flutterwave Bills
  // Example with VTPass
  const r = await fetch('https://api.vtpass.com/api/merchant-verify',{
    method:'POST',
    headers:{
      'api-key':'YOUR_VTPASS_API_KEY',
      'secret-key':'YOUR_VTPASS_SECRET',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      billersCode: meter,
      serviceID: `${disco?.toLowerCase() || 'ibadan-electric'}-${type || 'prepaid'}`,
    })
  });
  const data = await r.json();
  return res.json(data);
}
