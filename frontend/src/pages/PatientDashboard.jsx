import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyAppointments, cancelAppointment } from '../services/appointmentService'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const statusColors = {
  CONFIRMED: { bg: '#EAFBF3', color: '#1B7A72' },
  PENDING: { bg: '#FDF1DE', color: '#D9A441' },
  COMPLETED: { bg: '#EAF2FB', color: '#1E5F8C' },
  CANCELLED: { bg: '#FFE3DD', color: '#B84A2E' },
}

function PatientDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const data = await getMyAppointments(user.name)
    setAppointments(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    await cancelAppointment(id)
    load()
  }

  const today = new Date().toISOString().split('T')[0]
  const upcoming = appointments.filter((a) => a.date >= today && a.status !== 'CANCELLED')
  const past = appointments.filter((a) => a.date < today || a.status === 'CANCELLED')

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>

  return (
    <>
      <Navbar />
      <div className="page-shell">
        <h2>My Appointments</h2>
        <p className="page-subtitle">
          Track your upcoming and past visits. <Link to="/doctors">Book a new appointment →</Link>
        </p>

        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Upcoming</h3>
        {upcoming.length === 0 && <p className="page-subtitle">No upcoming appointments.</p>}
        <div className="doctor-grid" style={{ marginBottom: 40 }}>
          {upcoming.map((a) => (
            <div key={a.id} className="doctor-card" style={{ borderTopColor: statusColors[a.status]?.color }}>
              <span className="specialty-chip" style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color }}>
                {a.status}
              </span>
              <h3>{a.doctorName}</h3>
              <p className="bio">{a.specialty}</p>
              <p className="bio">{a.date} · {a.time}</p>
              <button className="btn" style={{ background: 'var(--color-accent-dark)', color: 'white', marginTop: 12 }} onClick={() => handleCancel(a.id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Past</h3>
        {past.length === 0 && <p className="page-subtitle">No past appointments yet.</p>}
        <div className="doctor-grid">
          {past.map((a) => (
            <div key={a.id} className="doctor-card" style={{ borderTopColor: statusColors[a.status]?.color }}>
              <span className="specialty-chip" style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color }}>
                {a.status}
              </span>
              <h3>{a.doctorName}</h3>
              <p className="bio">{a.specialty}</p>
              <p className="bio">{a.date} · {a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PatientDashboard