import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import '../styles/login.css'

const DEMO_EMAIL = { PATIENT: 'patient@test.com', DOCTOR: 'doctor@test.com' }
const DEMO_PASSWORD = 'CareDemo@26'

function Login() {
  const [role, setRole] = useState('PATIENT')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [forgotMsg, setForgotMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setForgotMsg('')
    setLoading(true)
    try {
      const { token, user } = await loginUser(email, password)
      if (user.role !== role) {
        const right = user.role === 'DOCTOR' ? 'Doctor' : 'Patient'
        setError(`This is a ${right.toLowerCase()} account. Please switch to the ${right} tab.`)
        return
      }
      login(user, token)
      navigate(user.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = (e) => {
    e.preventDefault()
    setError('')
    setForgotMsg(email ? `If ${email} is registered, a reset link has been sent.` : 'Please enter your email first.')
  }

  const fillDemo = (r) => {
    setRole(r)
    setEmail(DEMO_EMAIL[r])
    setPassword(DEMO_PASSWORD)
    setError('')
  }

  const avatar = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent('Dr. Rohan Mehta')}`

  return (
    <div className="lg-wrap">
      <div className="lg-page">
        {/* LEFT */}
        <div className="lg-left">
          <div className="lg-brand"><Logo size={40} /></div>
          <h1>Book smarter.<br /><span>Care better.</span></h1>
          <p className="lg-tagline">Find trusted doctors, book a slot in seconds, and keep every visit in one place.</p>

          <div className="lg-stage">
            <div className="lg-glass lg-consult">
              <span className="lg-live">● LIVE</span>
              <div className="lg-doc">
                <img src={avatar} alt="Doctor illustration" />
                <div><strong>Dr. Rohan Mehta</strong><small>Cardiologist</small></div>
              </div>
            </div>

            <div className="lg-glass lg-vitals">
              <h4>Health overview</h4>
              <div className="lg-ecg">
                <svg viewBox="0 0 120 60" preserveAspectRatio="none"><path d="M0 32 H26 L36 10 L48 52 L60 22 L68 32 H120" /></svg>
              </div>
              <p>Heart rate · 72 bpm</p>
            </div>

            <div className="lg-glass lg-queue">
              <h4>Next available doctors</h4>
              <ul>
                <li><span>Dr. Mehta</span><span>10:00 AM</span></li>
                <li><span>Dr. Verma</span><span>12:00 PM</span></li>
              </ul>
              <Link to="/register">Create account to book</Link>
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

            <h2>Welcome <span>back</span></h2>
            <p className="lg-sub">Log in to manage your appointments</p>

            <form onSubmit={handleSubmit}>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                <input type="email" placeholder="Email address" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="lg-input">
                <svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                <input type="password" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="lg-row">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#" onClick={handleForgot}>Forgot password?</a>
              </div>

              {forgotMsg && <p className="lg-msg">{forgotMsg}</p>}
              {error && <p className="lg-error">{error}</p>}

              <button className="lg-btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
            </form>

            <p className="lg-new">New here? <Link to="/register">Create an account</Link></p>
            <hr className="lg-divider" />
            <div className="lg-demo">
              <button type="button" onClick={() => fillDemo('PATIENT')}>Try as Patient</button>
              <button type="button" onClick={() => fillDemo('DOCTOR')}>Try as Doctor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login