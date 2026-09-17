import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyAppointments, updateAppointmentStatus } from '../services/appointmentService'
import Navbar from '../components/Navbar'

const statusColors = {
  CONFIRMED: { bg: '#EAFBF3', color: '#1B7A72' },
  PENDING: { bg: '#FDF1DE', color: '#D9A441' },
  COMPLETED: { bg: '#EAF2FB', color: '#1E5F8C' },
  CANCELLED: { bg: '#FFE3DD', color: '#B84A2E' },
}

function DocDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const data = await getMyAppointments(user.name)
    setAppointments(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleComplete = async (id) => {
    await updateAppointmentStatus(id, 'COMPLETED')
    load()
  }

  const today = new Date().toISOString().split('T')[0]
  const todays = appointments.filter((a) => a.date === today && a.status !== 'CANCELLED')
  const upcoming = appointments.filter((a) => a.date > today && a.status !== 'CANCELLED')

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>

  return (
    <>
      <Navbar />
      <div className="page-shell">
        <h2>Doctor Dashboard</h2>
        <p className="page-subtitle">Manage today's and upcoming patient appointments.</p>

        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Today</h3>
        {todays.length === 0 && <p className="page-subtitle">No appointments today.</p>}
        <div className="doctor-grid" style={{ marginBottom: 40 }}>
          {todays.map((a) => (
            <div key={a.id} className="doctor-card" style={{ borderTopColor: statusColors[a.status]?.color }}>
              <span className="specialty-chip" style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color }}>
                {a.status}
              </span>
              <h3>{a.patientName}</h3>
              <p className="bio">{a.time}</p>
              {a.status !== 'COMPLETED' && (
                <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => handleComplete(a.id)}>
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Upcoming</h3>
        {upcoming.length === 0 && <p className="page-subtitle">No upcoming appointments.</p>}
        <div className="doctor-grid">
          {upcoming.map((a) => (
            <div key={a.id} className="doctor-card" style={{ borderTopColor: statusColors[a.status]?.color }}>
              <span className="specialty-chip" style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color }}>
                {a.status}
              </span>
              <h3>{a.patientName}</h3>
              <p className="bio">{a.date} · {a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DocDashboard