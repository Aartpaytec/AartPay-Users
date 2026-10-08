import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbsqgoicgcwtvxtvccsr.supabase.co'
const supabaseKey = 'sb_publishable_Ub3sy5ZxoSA4c298rCXm3Q_i8gIslnK'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Signup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name || !phone || !password) { alert('Fill all fields'); return }
    setLoading(true)
    const { error } = await supabase.from('users').insert([{ name: name.trim(), phone: phone.trim(), password }])
    setLoading(false)
    if (error) alert('Error: ' + error.message)
    else { alert('Account created! Now login'); window.location.href = '/signin' }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign Up - AartPay</h2>
      <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Phone e.g 091..." value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignup} disabled={loading} style={{ padding:12, width:'100%', background:'black', color:'white' }}>{loading?'Saving...':'Sign Up'}</button>
      <p style={{marginTop:10}}><a href="/signin">Already have account? Sign In</a></p>
    </div>
  )
}
