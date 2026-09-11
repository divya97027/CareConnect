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

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: 'var(--color-white)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
      <h2>Login to CareConnect</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        {error && <p style={{ color: 'var(--color-coral)' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 10, background: 'var(--color-teal)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        New here? <Link to="/register">Register</Link>
      </p>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 20 }}>
        Test: patient@test.com / doctor@test.com — password: 123456
      </p>
    </div>
  )
}

export default Login