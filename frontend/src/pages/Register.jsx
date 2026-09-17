import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PATIENT', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const newUser = await registerUser(form)
      login({ id: newUser.id, name: newUser.name, role: newUser.role }, 'mock-jwt-token-' + newUser.id)
      navigate(newUser.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="floating-icons">
          <svg className="icon-stethoscope" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3"><path d="M6 3v6a3 3 0 0 0 6 0V3M12 9v3a5 5 0 0 0 10 0v-2M18 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" /></svg>
          <svg className="icon-heartbeat" viewBox="0 0 100 40" fill="none" stroke="white" strokeWidth="2"><path d="M0 20h20l8-16 12 32 8-24 6 8h46" /></svg>
          <svg className="icon-cross" viewBox="0 0 24 24" fill="white"><path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2Z" /></svg>
          <svg className="icon-pill" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3"><rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-30 12 12)" /><line x1="12" y1="6" x2="12" y2="18" transform="rotate(-30 12 12)" /></svg>
        </div>
        <div className="panel-heading">
          <div className="logo-mark"><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l2.5-7 4 14 2.5-7H21" /></svg></div>
          <h1>Join CareConnect</h1>
          <p>Create your account to start booking appointments or manage patients as a doctor.</p>
        </div>
        <div className="auth-card">
          <span className="form-kicker">CareConnect</span>
          <h2>Let's get <span className="accent-word">started</span></h2>
          <p className="subtitle">Create your account — takes less than a minute</p>
          <form onSubmit={handleSubmit}>
            <input className="field" type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input className="field" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className="field" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <input className="field" type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <select className="field" name="role" value={form.role} onChange={handleChange}>
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
            {error && <p className="error-text">{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
          </form>
          <p className="hint-text">Already have an account? <Link to="/">Log in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register