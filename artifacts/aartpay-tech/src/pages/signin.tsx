import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbsqgoicgcwtvxtvccsr.supabase.co'
const supabaseKey = 'sb_publishable_Ub3sy5ZxoSA4c298rCXm3Q_i8gIslnK'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Signin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignin = async () => {
    if (!phone || !password) { alert('Fill all'); return }
    setLoading(true)
    const { data, error } = await supabase.from('users').select('*').eq('phone', phone.trim()).eq('password', password).single()
    setLoading(false)
    if (error || !data) alert('No account found')
    else { localStorage.setItem('user', JSON.stringify(data)); window.location.href = '/dashboard' }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign In - AartPay</h2>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignin} disabled={loading} style={{ padding:12, width:'100%', background:'black', color:'white' }}>{loading?'...':'Sign In'}</button>
    </div>
  )
}
