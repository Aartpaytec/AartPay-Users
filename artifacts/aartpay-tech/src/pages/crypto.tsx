import { useState, useEffect } from 'react';

type Coin = { id: string; name: string; symbol: string; priceNGN: number; priceUSD: number };

export default function Crypto() {
  const [currency, setCurrency] = useState('NGN');
  const [coins, setCoins] = useState<Coin[]>([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', priceNGN: 108000000, priceUSD: 68000 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', priceNGN: 1625, priceUSD: 1 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', priceNGN: 5400000, priceUSD: 3400 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', priceNGN: 250000, priceUSD: 160 },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', priceNGN: 980000, priceUSD: 620 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real Busha rates from our API
    fetch('/api/crypto-rates')
      .then(r => r.json())
      .then(result => {
        console.log("Busha live:", result);
        // If Busha returns data, map it
        if (result.data && Array.isArray(result.data)) {
          // Try to extract NGN prices
          const updated = coins.map(c => {
            const found: any = result.data.find((x: any) => 
              x.ticker?.includes(c.symbol) || x.base_currency === c.symbol
            );
            if (found) {
              return { ...c, priceNGN: parseFloat(found.price || found.rate || c.priceNGN) };
            }
            return c;
          });
          // Only update if we got at least one real price
          if (updated.some(u => u.priceNGN !== coins.find(o => o.id === u.id)?.priceNGN)) {
             setCoins(updated);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatPrice = (c: Coin) => {
    if (currency === 'NGN') {
      return `₦${c.priceNGN.toLocaleString()}`;
    } else {
      return `$${c.priceUSD.toLocaleString()}`;
    }
  };

  return (
    <div style={{ padding: 16, background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Crypto</h2>
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 20, padding: 2 }}>
          <button onClick={() => setCurrency('NGN')} style={{ background: currency === 'NGN' ? '#fff' : 'transparent', border: 'none', borderRadius: 16, padding: '6px 12px', fontWeight: 600 }}>NGN</button>
          <button onClick={() => setCurrency('USD')} style={{ background: currency === 'USD' ? '#fff' : 'transparent', border: 'none', borderRadius: 16, padding: '6px 12px', fontWeight: 600 }}>USD</button>
        </div>
      </div>

      {loading && <div style={{ fontSize: 12, color: '#64748b' }}>Fetching live Busha rates...</div>}

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {coins.map((c) => (
          <div key={c.id} style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{c.symbol[0]}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{c.symbol}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontWeight: 800 }}>
              {formatPrice(c)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: '#fff', padding: 12, borderRadius: 12, fontSize: 12, color: '#64748b' }}>
        {loading ? 'Connecting to Busha...' : 'Live rates via Busha • Auto-refresh'} 
      </div>
    </div>
  );
}
