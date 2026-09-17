import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return null // ya ek chhota spinner dikha sakte ho
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'DOCTOR' ? '/doctor-dashboard' : '/doctors'} replace />
  }

  return children
}

export default ProtectedRoute