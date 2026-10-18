import { useState } from 'react';

export default function DollarCards(){
  const [type, setType] = useState<'Regular'|'Platinum'>('Regular');

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">A</div>
          <p className="font-bold text-sm">Virtual Dollar Card</p>
        </div>
        <div className="flex gap-3">✉️ ☰</div>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-[15px]">Select Card Option</h2>
        <p className="text-xs text-gray-500">Read the description and select the card that you prefer</p>
        
        <div className="flex bg-gray-100 rounded-full p-1 mt-3 w-fit">
          <button onClick={()=>setType('Regular')} className={`px-6 py-2 rounded-full text-xs font-bold ${type==='Regular'?'bg-white shadow':''}`}>Regular</button>
          <button onClick={()=>setType('Platinum')} className={`px-6 py-2 rounded-full text-xs font-bold ${type==='Platinum'?'bg-white shadow text-black':'text-gray-400'}`}>Platinum</button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-[300px] h-[190px] bg-[#0a1931] rounded-2xl p-4 relative text-white">
            <div className="flex justify-between">
              <p className="text-xs tracking-widest">AARTPAY</p>
              <p className="font-bold text-sm">VISA</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[11px] opacity-80">Salawu Akeem •••• 2345 &nbsp; 02/30</p>
            </div>
            <div className="absolute top-12 right-4 w-8 h-5 bg-white/20 rounded"></div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <div className="bg-green-50 text-green-700 text-xs px-4 py-2 rounded-full font-medium">
            Creation fee: <span className="font-bold">{type==='Regular'?'$1.5 / ₦2,065.50':'$5 / ₦8,250.00'}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs">
          <div className="flex gap-2 items-center"><span className="w-4 h-4 bg-blue-900 text-white rounded-full flex items-center justify-center text-[10px]">✓</span> Make payments & shop anywhere online</div>
          <div className="flex gap-2 items-center"><span className="w-4 h-4 bg-blue-900 text-white rounded-full flex items-center justify-center text-[10px]">✓</span> Easily manage your cards and merchant</div>
        </div>

        <button className="w-full bg-[#0a1931] text-white py-4 rounded-full font-bold mt-6 text-sm">
          Continue - {type==='Regular'?'$1.50':'$5.00'}
        </button>

        <p className="text-[10px] text-center text-gray-400 mt-3">Powered by AartPay • Not affiliated with Cardtonic</p>
      </div>
    </div>
  )
}
