import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import doctors from '../services/mockData/doctors.json'
import { bookAppointment } from '../services/appointmentService'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const doctor = doctors.find((d) => d.id === Number(id))
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [booking, setBooking] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [chatWith, setChatWith] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')

  if (!doctor) return <p style={{ padding: 40 }}>Doctor not found.</p>

  const photoUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(doctor.name)}`

  const handleBook = async () => {
    if (!date || !time) return
    setBooking(true)
    await bookAppointment({ patientName: user.name, doctorName: doctor.name, specialty: doctor.specialty, date, time })
    setBooking(false)
    setConfirmed(true)
    setTimeout(() => navigate('/my-appointments'), 1200)
  }

  const openChat = (assistant) => {
    setChatWith(assistant)
    setChatMessages([{ from: 'assistant', text: `Hi, I'm ${assistant.name}, ${doctor.name}'s ${assistant.role}. How can I help with your appointment?` }])
  }

  // Simple varied replies based on keywords, so it doesn't feel like one canned message
  const getReply = (text) => {
    const t = text.toLowerCase()
    if (t.includes('time') || t.includes('slot')) return `Available slots for ${doctor.name} today are ${doctor.slots.join(', ')}.`
    if (t.includes('cancel')) return `No problem — I can help cancel your appointment. Please confirm the date and I'll process it.`
    if (t.includes('fee') || t.includes('cost') || t.includes('price')) return `Consultation fee details will be shared closer to your visit — usually confirmed at check-in.`
    if (t.includes('hi') || t.includes('hello')) return `Hello! Happy to help — do you have a question about booking or the visit?`
    return `Thanks for the message — I'll check with ${doctor.name} and get back to you shortly.`
  }

  const sendMessage = () => {
    const text = chatInput.trim()
    if (!text) return
    setChatInput('')
    setChatMessages((prev) => [...prev, { from: 'user', text }])
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { from: 'assistant', text: getReply(text) }])
    }, 700)
  }

  return (
    <>
      <Navbar />
      <div className="page-shell">
        <div className="doctor-profile-card">
          <div className="profile-header">
            <img src={photoUrl} alt={doctor.name} className="doctor-photo" />
            <div>
              <h2>{doctor.name}</h2>
              <span className="specialty-chip">{doctor.specialty}</span>
              <p className="profile-meta">⭐ {doctor.rating} · {doctor.patients.toLocaleString()} patients · {doctor.experience} yrs experience</p>
            </div>
          </div>

          <div className="profile-grid">
            <div>
              <h3 className="profile-section-title">About</h3>
              <p className="bio">{doctor.about}</p>

              <h3 className="profile-section-title">Education</h3>
              <p className="bio">{doctor.education}</p>

              <h3 className="profile-section-title">Hospital</h3>
              <p className="bio">{doctor.hospital} · Practicing since {doctor.activeSince}</p>

              <h3 className="profile-section-title">Assistants — for follow-up questions</h3>
              <div className="assistant-list">
                {doctor.assistants.map((a) => (
                  <div key={a.name} className="assistant-card">
                    <div className="assistant-avatar">{a.name.split(' ').map(n => n[0]).join('')}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{a.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>{a.role}</p>
                    </div>
                    <button className="assistant-btn" onClick={() => openChat(a)}>Message</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="booking-box">
              <h3 className="profile-section-title">Book an appointment</h3>
              {confirmed ? (
                <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Appointment booked! Redirecting...</p>
              ) : (
                <>
                  <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                  <select className="field" value={time} onChange={(e) => setTime(e.target.value)}>
                    <option value="">Select a time slot</option>
                    {doctor.slots.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button className="btn btn-primary" disabled={!date || !time || booking} onClick={handleBook}>
                    {booking ? 'Booking...' : 'Book Appointment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {chatWith && (
        <div className="chat-overlay" onClick={() => setChatWith(null)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <span>{chatWith.name} · {chatWith.role}</span>
              <button onClick={() => setChatWith(null)} className="chat-close">✕</button>
            </div>
            <div className="chat-body">
              {chatMessages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form className="chat-input-row" onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
              <input
                className="field" style={{ margin: 0 }} placeholder="Type a message..."
                value={chatInput} onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '10px 16px' }}>Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default DoctorDetail