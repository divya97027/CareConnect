import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import '../styles/navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="nb">
      <div className="nb-inner">
        <Link to={user?.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors'} className="nb-logo">
          <Logo size={34} />
        </Link>
        <div className="nb-right">
          {user?.role === 'PATIENT' && (
            <>
              <Link to="/doctors" className="nb-link">Find Doctors</Link>
              <Link to="/my-appointments" className="nb-link">My Appointments</Link>
            </>
          )}
          <span className="nb-user">Hi, {user?.name}</span>
          <button className="nb-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar