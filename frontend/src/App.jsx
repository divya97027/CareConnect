
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorListing from './pages/DoctorListing'
import Home from './pages/Home'
import DoctorDetail from './pages/DoctorDetail'
import DocDashboard from './pages/DocDashboard'
import PatientDashboard from './pages/PatientDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/doctors" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><DoctorListing /></ProtectedRoute>
        } />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/doctors/:id" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><DoctorDetail /></ProtectedRoute>
        } />

        <Route path="/my-appointments" element={
          <ProtectedRoute allowedRoles={['PATIENT']}><PatientDashboard /></ProtectedRoute>
        } />

        <Route path="/doctor-dashboard" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}><DocDashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App