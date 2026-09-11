import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'PATIENT', phone: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    // Abhi ke liye mock: real backend aane par yaha registerUser() API call hogi
    console.log('Registering:', form)
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: 'var(--color-white)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
      <h2>Create your CareConnect account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="name" placeholder="Full Name"
          value={form.name} onChange={handleChange} required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <input
          type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <input
          type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <input
          type="tel" name="phone" placeholder="Phone"
          value={form.phone} onChange={handleChange}
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <select
          name="role" value={form.role} onChange={handleChange}
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        >
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>
        {error && <p style={{ color: 'var(--color-coral)' }}>{error}</p>}
        <button
          type="submit"
          style={{ width: '100%', padding: 10, background: 'var(--color-teal)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  )
}

export default Register