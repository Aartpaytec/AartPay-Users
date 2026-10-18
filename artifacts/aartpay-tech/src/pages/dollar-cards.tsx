export default function DollarCards(){
  return (
    <div className="min-h-screen bg-[#f6f6f6] text-black p-4">
      <h1 className="text-xl font-bold">Virtual Dollar Card</h1>
      <p className="text-xs text-gray-500">Powered by Cardtonic style</p>

      {/* Plans - Like Cardtonic */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white rounded-2xl p-4 border-2 border-black">
          <p className="text-[10px] font-bold bg-black text-white w-fit px-2 py-1 rounded">BASIC</p>
          <p className="font-bold mt-2">$1.50 <span className="text-xs font-normal">/ card</span></p>
          <p className="text-[11px] text-gray-500 mt-1">For online payments</p>
          <p className="text-[11px] mt-3">• Visa • Online only</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border">
          <p className="text-[10px] font-bold bg-gray-200 w-fit px-2 py-1 rounded">PLATINUM</p>
          <p className="font-bold mt-2">$5 <span className="text-xs font-normal">/ card</span></p>
          <p className="text-[11px] text-gray-500 mt-1">Apple Pay, Google Pay, NFC</p>
          <p className="text-[11px] mt-3">• Mastercard • Worldwide</p>
        </div>
      </div>

      {/* Virtual Card - Clean, no text overlap */}
      <div className="mt-6">
        <p className="text-xs font-bold mb-2">Your Card</p>
        <div className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-2xl p-5 h-48 relative">
          <div className="flex justify-between">
            <p className="text-xs tracking-widest">AARTPAY</p>
            <p className="text-xs">VISA</p>
          </div>
          <p className="text-lg tracking-[0.2em] mt-10">4242 4242 4242 1234</p>
          <div className="flex justify-between mt-8 text-[10px] opacity-70">
            <span>CARD HOLDER<br/>SALAWU AKEEM</span>
            <span>EXP<br/>12/28</span>
            <span>CVV<br/>***</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-black text-white py-4 rounded-full font-bold mt-6">
        Create Basic - ₦2,475
      </button>
      <p className="text-[10px] text-center text-gray-500 mt-2">₦1,650 per $1 • Cardtonic API</p>
    </div>
  )
}
