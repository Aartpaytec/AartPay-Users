import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

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
    const { error } = await supabase.from('users').insert([{ 
      name: name.trim(), 
      phone: phone.trim(), 
      password: password 
    }])
    setLoading(false)
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Success! Now login')
      window.location.href = '/signin'
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Sign Up</h2>
      <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Phone e.g 091345..." value={phone} onChange={e=>setPhone(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ display:'block', marginBottom:10, padding:12, width:'100%'}} />
      <button onClick={handleSignup} disabled={loading} style={{ padding:12, width:'100%', background:'#000', color:'#fff'}}>
        {loading?'Saving...':'Sign Up'}
      </button>
      <p><a href="/signin">Already have account? Sign In</a></p>
    </div>
  )
}
