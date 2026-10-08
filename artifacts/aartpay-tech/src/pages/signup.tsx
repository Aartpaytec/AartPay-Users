import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name || !phone || !password) {
      alert('Fill all fields')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('users').insert([{ name, phone, password }])
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Signup success! Now login')
      window.location.href = '/signin'
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ display:'block', marginBottom:10, padding:10, width:'100%'}} />
      <input placeholder="Phone e.g 09169527575" value={phone} onChange={e => setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:10, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:10, width:'100%'}} />
      <button onClick={handleSignup} disabled={loading} style={{ padding:10, width:'100%'}}>{loading?'Saving...':'Sign Up'}</button>
    </div>
  )
}
