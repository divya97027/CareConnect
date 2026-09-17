import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <span className="logo">CareConnect</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Hi, {user?.name}</span>
        <button onClick={handleLogout} className="demo-btn" style={{ flex: 'none', padding: '8px 16px' }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar