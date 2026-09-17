import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const [forgotMsg, setForgotMsg] = useState('')

const handleForgotPassword = (e) => {
  e.preventDefault()
  if (!email) {
    setForgotMsg('Please enter your email above first.')
    return
  }
  // Mock: real backend aane par yahan POST /api/auth/forgot-password call hogi
  setForgotMsg(`If ${email} is registered, a reset link has been sent.`)
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await loginUser(email, password)
      login(user, token)
      navigate(user.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (role) => {
    if (role === 'PATIENT') {
      setEmail('patient@test.com'); setPassword('CareDemo@26')
    } else {
      setEmail('doctor@test.com'); setPassword('CareDemo@26')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="floating-icons">
          <svg className="icon-stethoscope" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3">
            <path d="M6 3v6a3 3 0 0 0 6 0V3M12 9v3a5 5 0 0 0 10 0v-2M18 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
          </svg>
          <svg className="icon-heartbeat" viewBox="0 0 100 40" fill="none" stroke="white" strokeWidth="2">
            <path d="M0 20h20l8-16 12 32 8-24 6 8h46" />
          </svg>
          <svg className="icon-cross" viewBox="0 0 24 24" fill="white">
            <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2Z" />
          </svg>
          <svg className="icon-pill" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3">
            <rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-30 12 12)" />
            <line x1="12" y1="6" x2="12" y2="18" transform="rotate(-30 12 12)" />
          </svg>
        </div>

        <div className="panel-heading">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h3l2.5-7 4 14 2.5-7H21" />
            </svg>
          </div>
          <h1>CareConnect</h1>
          <p>Book appointments with trusted doctors and manage your health, all in one place.</p>
        </div>

        <div className="auth-card">
          <span className="form-kicker">CareConnect</span>
          <h2>Welcome <span className="accent-word">back</span></h2>
          <p className="subtitle">Log in to manage your appointments</p>

          <form onSubmit={handleSubmit}>
            <input
              className="field" type="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <input
              className="field" type="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
            <div className="form-row">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
            </div>
            {forgotMsg && <p className="hint-text" style={{ color: 'var(--color-teal)', marginTop: -6, marginBottom: 12 }}>{forgotMsg}</p>}
            {error && <p className="error-text">{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="hint-text">
            New here? <Link to="/register">Create an account</Link>
          </p>

          <p className="demo-caption">Just exploring? Try it instantly:</p>
          <div className="demo-row">
            <button type="button" className="demo-btn" onClick={() => fillDemo('PATIENT')}>Try as Patient</button>
            <button type="button" className="demo-btn" onClick={() => fillDemo('DOCTOR')}>Try as Doctor</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login