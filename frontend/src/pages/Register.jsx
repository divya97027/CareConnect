import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import '../styles/login.css'

function Register() {
  const [role, setRole] = useState('PATIENT')
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const newUser = await registerUser({ ...form, role })
      login({ id: newUser.id, name: newUser.name, role: newUser.role }, 'mock-jwt-token-' + newUser.id)
      navigate(newUser.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg-wrap">
      <div className="lg-page lg-tall">
        {/* LEFT */}
        <div className="lg-left">
          <div className="lg-brand"><Logo size={40} /></div>
          <h1>Your health,<br /><span>one place.</span></h1>
          <p className="lg-tagline">Create your account to book appointments, or manage your patients as a doctor.</p>

          <div className="lg-stage">
            <div className="lg-glass lg-steps">
              <h4>Get started in 3 steps</h4>
              <ol>
                <li><b>1</b> Create your account</li>
                <li><b>2</b> Find a doctor by specialty</li>
                <li><b>3</b> Book a slot and track it</li>
              </ol>
            </div>

            <div className="lg-glass lg-spec">
              <h4>10 specialties available</h4>
              <div className="lg-chips">
                <span>Cardiology</span><span>Dermatology</span><span>Pediatrics</span>
                <span>Orthopedic</span><span>ENT</span><span>Neurology</span>
                <span>Dentist</span><span>+ more</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg-right">
          <div className="lg-blob" />
          <div className="lg-card">
            <div className="lg-toggle" data-role={role}>
              <div className="lg-toggle-pill" />
              <button type="button" aria-pressed={role === 'PATIENT'} onClick={() => setRole('PATIENT')}>Patient</button>
              <button type="button" aria-pressed={role === 'DOCTOR'} onClick={() => setRole('DOCTOR')}>Doctor</button>
            </div>

            <h2>Let's get <span>started</span></h2>
            <p className="lg-sub">Create your account in under a minute</p>

            <form onSubmit={handleSubmit}>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                <input type="text" name="name" placeholder="Full name" aria-label="Full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                <input type="email" name="email" placeholder="Email address" aria-label="Email address" value={form.email} onChange={handleChange} required />
              </div>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                <input type="password" name="password" placeholder="Password (min 6 characters)" aria-label="Password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
                <input type="tel" name="phone" placeholder="Phone number" aria-label="Phone number" value={form.phone} onChange={handleChange} />
              </div>

              {error && <p className="lg-error">{error}</p>}

              <button className="lg-btn" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : `Register as ${role === 'DOCTOR' ? 'Doctor' : 'Patient'}`}
              </button>
            </form>

            <p className="lg-new">Already have an account? <Link to="/">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register