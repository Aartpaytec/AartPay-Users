import { useState } from "react";

export default function DollarCard() {
  const [cardType, setCardType] = useState<"regular" | "platinum">("regular");
  const [network, setNetwork] = useState<"visa" | "mastercard">("visa");
  const [created, setCreated] = useState(false);

  const price = cardType === "regular" ? 1.5 : 5;
  const feeNaira = price === 1.5 ? "₦2,475" : "₦8,250"; // at 1650/$1

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold">Virtual Dollar Card</h1>
      <p className="text-gray-400 text-sm mt-1">Like Cardtonic - Visa & Mastercard</p>

      {/* Card Type Selector */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => setCardType("regular")}
          className={`p-3 rounded-xl border text-left ${cardType === "regular" ? "border-green-500 bg-zinc-900" : "border-zinc-700"}`}
        >
          <p className="font-bold">Basic</p>
          <p className="text-green-400 text-sm">$1.50 Fee</p>
          <p className="text-xs text-gray-400">Online payments only</p>
        </button>
        <button
          onClick={() => setCardType("platinum")}
          className={`p-3 rounded-xl border text-left ${cardType === "platinum" ? "border-green-500 bg-zinc-900" : "border-zinc-700"}`}
        >
          <p className="font-bold">Platinum</p>
          <p className="text-green-400 text-sm">$5 Fee</p>
          <p className="text-xs text-gray-400">Apple Pay • Google Pay • NFC</p>
        </button>
      </div>

      {/* Network Selector */}
      <div className="flex gap-2 mt-4">
        <button onClick={()=>setNetwork("visa")} className={`px-6 py-2 rounded-full ${network==="visa"?"bg-white text-black":"bg-zinc-800"}`}>VISA</button>
        <button onClick={()=>setNetwork("mastercard")} className={`px-6 py-2 rounded-full ${network==="mastercard"?"bg-white text-black":"bg-zinc-800"}`}>Mastercard</button>
      </div>

      {/* Card Preview - Cardtonic style */}
      <div className="mt-6 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl p-5 h-56 flex flex-col justify-between">
        <div className="flex justify-between">
          <span>AARTPAY</span>
          <span className="font-bold">{network.toUpperCase()}</span>
        </div>
        <div>
          <p className="text-xl tracking-widest">{created ? "4532 1234 5678 9012" : "•••• •••• •••• ••••"}</p>
          <div className="flex justify-between mt-3 text-sm">
            <span>EXP {created ? "12/28" : "••/••"}</span>
            <span>CVV {created ? "123" : "•••"}</span>
          </div>
        </div>
        <p className="text-xs opacity-70">{cardType.toUpperCase()} • {feeNaira} • {cardType==="platinum"?"Tap to Pay enabled":"Online only"}</p>
      </div>

      {!created ? (
        <button onClick={()=>setCreated(true)} className="w-full mt-6 bg-white text-black font-bold py-4 rounded-full">
          Create {cardType === "regular" ? "Basic $1.50" : "Platinum $5"} - {feeNaira}
        </button>
      ) : (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between bg-zinc-900 p-3 rounded-xl"><span>Balance</span><span>$0.00</span></div>
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-zinc-800 py-3 rounded-xl">Fund Card</button>
            <button className="bg-zinc-800 py-3 rounded-xl">Freeze</button>
            <button className="bg-red-900 py-3 rounded-xl">Delete</button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Fund from Naira wallet instantly • Cardtonic method</p>
        </div>
      )}
    </div>
  );
}
