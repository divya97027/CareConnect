import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorListing from './pages/DoctorListing'
import DoctorDashboard from './pages/Doctordashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={['PATIENT']}>
              <DoctorListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['DOCTOR']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App