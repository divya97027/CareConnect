import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyAppointments, updateAppointmentStatus, cancelAppointment } from '../services/appointmentService'
import Navbar from '../components/Navbar'
import '../styles/doctor.css'

const STATUS = {
  CONFIRMED: { label: 'Confirmed', color: '#0F766E', bg: '#CCFBF1' },
  PENDING: { label: 'Pending', color: '#B45309', bg: '#FEF3C7' },
  COMPLETED: { label: 'Completed', color: '#1D4ED8', bg: '#DBEAFE' },
  CANCELLED: { label: 'Cancelled', color: '#B91C1C', bg: '#FEE2E2' },
}

const TABS = [
  { key: 'today', label: 'Today', icon: '📅', color: '#0F766E', bg: '#CCFBF1', empty: 'No appointments today', hint: 'Enjoy the quiet. New bookings will appear here.' },
  { key: 'pending', label: 'Pending', icon: '⏳', color: '#B45309', bg: '#FEF3C7', empty: 'No pending requests', hint: 'You are all caught up.' },
  { key: 'upcoming', label: 'Upcoming', icon: '🗓️', color: '#2563EB', bg: '#DBEAFE', empty: 'No upcoming appointments', hint: 'Future bookings will show here.' },
  { key: 'completed', label: 'Completed', icon: '✅', color: '#059669', bg: '#D1FAE5', empty: 'No completed visits yet', hint: 'Finished visits will be listed here.' },
]

const todayISO = () => new Date().toLocaleDateString('en-CA')
const initials = (n) => n.replace('Dr. ', '').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
const toMin = (t) => {
  const [hm, ap] = t.split(' ')
  let [h, m] = hm.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return h * 60 + m
}
const byTime = (a, b) => a.date.localeCompare(b.date) || toMin(a.time) - toMin(b.time)

function DoctorDashboard() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('today')

  const load = async () => {
    const data = await getMyAppointments(user.name)
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const confirm = async (id) => { await updateAppointmentStatus(id, 'CONFIRMED'); load() }
  const complete = async (id) => { await updateAppointmentStatus(id, 'COMPLETED'); load() }
  const decline = async (id) => { await cancelAppointment(id); load() }

  const today = todayISO()
  const live = items.filter((a) => a.status !== 'CANCELLED').sort(byTime)
  const groups = {
    today: live.filter((a) => a.date === today),
    pending: live.filter((a) => a.status === 'PENDING' && a.date >= today),
    upcoming: live.filter((a) => a.date > today && a.status !== 'COMPLETED'),
    completed: live.filter((a) => a.status === 'COMPLETED'),
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const dateLabel = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
  const n = groups.today.length
  const current = TABS.find((t) => t.key === tab)
  const list = groups[tab]

  const fmtDate = (d) => (d === today ? 'Today' : new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }))

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>

  return (
    <div className="dd-page">
      <Navbar />
      <div className="dd-wrap">
        <div className="dd-banner">
          <p className="dd-date">{dateLabel}</p>
          <h1>{greeting}, {user.name}</h1>
          <p className="dd-sub">
            {n === 0 ? 'No appointments today.' : `You have ${n} appointment${n > 1 ? 's' : ''} today.`}
            {groups.pending.length > 0 && ` ${groups.pending.length} request${groups.pending.length > 1 ? 's' : ''} waiting for your confirmation.`}
          </p>
        </div>

        <div className="dd-stats">
          {TABS.map((t) => (
            <button key={t.key} className={`dd-stat ${tab === t.key ? 'active' : ''}`} style={{ '--c': t.color, '--bg': t.bg }} onClick={() => setTab(t.key)}>
              <i>{t.icon}</i>
              <b>{groups[t.key].length}</b>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="dd-tabs">
          {TABS.map((t) => (
            <button key={t.key} className={`dd-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="dd-empty"><b>{current.empty}</b>{current.hint}</div>
        ) : (
          <div className="dd-list">
            {list.map((a) => {
              const st = STATUS[a.status]
              return (
                <div key={a.id} className="dd-row">
                  <div className="dd-avatar">{initials(a.patientName)}</div>
                  <div className="dd-info">
                    <h3>{a.patientName}</h3>
                    <p>{a.reason || 'General consultation'}</p>
                  </div>
                  <div className="dd-when"><b>{a.time}</b><span>{fmtDate(a.date)}</span></div>
                  <span className="dd-badge" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  <div className="dd-actions">
                    {a.status === 'PENDING' && (
                      <>
                        <button className="dd-btn main" onClick={() => confirm(a.id)}>Confirm</button>
                        <button className="dd-btn ghost" onClick={() => decline(a.id)}>Decline</button>
                      </>
                    )}
                    {a.status === 'CONFIRMED' && <button className="dd-btn main" onClick={() => complete(a.id)}>Mark completed</button>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard