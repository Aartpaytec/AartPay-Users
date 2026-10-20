import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Tx = {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  amount: number;
  date: string; // ISO
  bank?: string;
  account?: string;
  status: 'success' | 'pending' | 'failed';
};

export default function Transactions() {
  const nav = useNavigate();
  const [filter, setFilter] = useState<'today' | 'week' | 'month' | 'year' | 'all'>('all');
  const [tab, setTab] = useState<'all' | 'credit' | 'debit'>('all');
  const [search, setSearch] = useState('');

  // MOCK DATA - Later go come from backend / localStorage
  const [txs, setTxs] = useState<Tx[]>(()=> {
    const saved = localStorage.getItem('aartpay_txs');
    if(saved) return JSON.parse(saved);
    return [
      { id: '1', type: 'credit', title: 'Wallet Funding - Wema Bank', amount: 50000, date: new Date().toISOString(), status: 'success' },
      { id: '2', type: 'debit', title: 'Transfer to SALAWU AKEEM', amount: 5000, date: new Date().toISOString(), bank: 'Kuda', account: '2003068005', status: 'success' },
      { id: '3', type: 'credit', title: 'Wallet Funding - Moniepoint', amount: 20000, date: new Date(Date.now() - 86400000*2).toISOString(), status: 'success' },
      { id: '4', type: 'debit', title: 'Airtime - MTN', amount: 1000, date: new Date(Date.now() - 86400000*5).toISOString(), status: 'success' },
      { id: '5', type: 'debit', title: 'Transfer to JOHN DOE', amount: 15000, date: new Date(Date.now() - 86400000*30).toISOString(), bank: 'Access Bank', status: 'success' },
      { id: '6', type: 'credit', title: 'Wallet Funding - Providus', amount: 100000, date: new Date(Date.now() - 86400000*60).toISOString(), status: 'success' },
    ];
  });

  // SAVE DEMO TX WHEN TRANSFER HAPPENS
  useEffect(()=>{
    localStorage.setItem('aartpay_txs', JSON.stringify(txs));
  },[txs]);

  const filteredByDate = txs.filter(t=>{
    const d = new Date(t.date);
    const now = new Date();
    if(filter === 'today') return d.toDateString() === now.toDateString();
    if(filter === 'week') return (now.getTime() - d.getTime()) <= 7*86400000;
    if(filter === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if(filter === 'year') return d.getFullYear() === now.getFullYear();
    return true;
  });

  const filtered = filteredByDate.filter(t=>{
    if(tab !== 'all' && t.type !== tab) return false;
    if(search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIn = filteredByDate.filter(t=>t.type==='credit').reduce((s,t)=>s+t.amount,0);
  const totalOut = filteredByDate.filter(t=>t.type==='debit').reduce((s,t)=>s+t.amount,0);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' }) + ' • ' + d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  const groupByDay = filtered.reduce((acc: any, tx)=>{
    const day = new Date(tx.date).toDateString();
    if(!acc[day]) acc[day] = [];
    acc[day].push(tx);
    return acc;
  },{});

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef2f7', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={()=>nav('/dashboard')} style={{ border: 'none', background: '#fff', fontSize: 20, cursor: 'pointer' }}>‹</button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Transactions</h2>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        {/* SUMMARY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#000', borderRadius: 14, padding: 14, color: '#fff' }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Money In ({filter})</div>
            <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4, color: '#22c55e' }}>+₦{totalIn.toLocaleString()}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: 14, border: '1px solid #eef2f7' }}>
            <div style={{ fontSize: 11, color: '#64748b' }}>Money Out ({filter})</div>
            <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4, color: '#ef4444' }}>-₦{totalOut.toLocaleString()}</div>
          </div>
        </div>

        {/* FILTERS DAY/MONTH/YEAR */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 8, border: '1px solid #eef2f7', marginBottom: 12, display: 'flex', gap: 6, overflowX: 'auto' }}>
          {[
            { k: 'today', l: 'Today' },
            { k: 'week', l: 'This Week' },
            { k: 'month', l: 'This Month' },
            { k: 'year', l: 'This Year' },
            { k: 'all', l: 'All Time' },
          ].map(f=>(
            <button key={f.k} onClick={()=>setFilter(f.k as any)} style={{ padding: '8px 14px', borderRadius: 20, border: 'none', background: filter===f.k ? '#000' : '#f1f5f9', color: filter===f.k ? '#fff' : '#000', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {f.l}
            </button>
          ))}
        </div>

        {/* TABS IN/OUT */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[
            { k: 'all', l: 'All' },
            { k: 'credit', l: 'Money In ↓' },
            { k: 'debit', l: 'Money Out ↑' },
          ].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k as any)} style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #eef2f7', background: tab===t.k ? '#000' : '#fff', color: tab===t.k ? '#fff' : '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {t.l}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search transactions..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, marginBottom: 14, outline: 'none' }} />

        {/* LIST GROUPED BY DAY */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #eef2f7', overflow: 'hidden' }}>
          {Object.keys(groupByDay).length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No transactions for {filter}</div>
          ) : (
            Object.keys(groupByDay).map(day=>(
              <div key={day}>
                <div style={{ padding: '10px 16px', background: '#f8fafc', fontSize: 11, fontWeight: 800, color: '#64748b' }}>{day}</div>
                {groupByDay[day].map((tx: Tx)=>(
                  <div key={tx.id} style={{ padding: '14px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.type==='credit' ? '#f0fdf4' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                        {tx.type==='credit' ? '↓' : '↑'}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{tx.title}</div>
                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{formatDate(tx.date)} • {tx.status}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: tx.type==='credit' ? '#16a34a' : '#000' }}>{tx.type==='credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{tx.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <button onClick={()=>nav('/dashboard')} style={{ width: '100%', marginTop: 16, padding: 14, borderRadius: 12, border: 'none', background: '#000', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}
