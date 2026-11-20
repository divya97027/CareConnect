import { useState } from 'react'
import { Link } from 'react-router-dom'
import doctors from '../services/mockData/doctors.json'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import '../styles/listing.css'

const STYLE = {
  Cardiologist: { icon: '❤️', color: '#E11D48', bg: '#FFE4E6' },
  Dermatologist: { icon: '🧴', color: '#D97706', bg: '#FEF3C7' },
  Pediatrician: { icon: '🧸', color: '#0F766E', bg: '#CCFBF1' },
  Orthopedic: { icon: '🦴', color: '#2563EB', bg: '#DBEAFE' },
  Gynecologist: { icon: '🌸', color: '#C026D3', bg: '#FAE8FF' },
  ENT: { icon: '👂', color: '#7C3AED', bg: '#EDE9FE' },
  Neurologist: { icon: '🧠', color: '#4F46E5', bg: '#E0E7FF' },
  Dentist: { icon: '🦷', color: '#0891B2', bg: '#CFFAFE' },
  'General Physician': { icon: '🩺', color: '#059669', bg: '#D1FAE5' },
  Psychiatrist: { icon: '💬', color: '#9333EA', bg: '#F3E8FF' },
}
const FALLBACK = { icon: '➕', color: '#0F766E', bg: '#CCFBF1' }

const initials = (name) => name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')

function DoctorListing() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')
  const [open, setOpen] = useState(false)

  const counts = doctors.reduce((a, d) => ({ ...a, [d.specialty]: (a[d.specialty] || 0) + 1 }), {})
  const specialties = Object.keys(counts)
  const q = search.trim().toLowerCase()
  const filtered = doctors.filter(
    (d) => (active === 'All' || d.specialty === active) && `${d.name} ${d.specialty}`.toLowerCase().includes(q)
  )

  const choose = (s) => { setActive(s); setOpen(false) }

  const first = user?.name ? user.name.split(' ')[0] : ''
  const firstName = first.charAt(0).toUpperCase() + first.slice(1)

  return (
    <div className="dl-page">
      <Navbar />
      <div className="dl-wrap">
        <div className="dl-banner">
          <div className="dl-top">
            <h1>
              <span>Welcome back, {firstName}!</span>
              Find your specialist
            </h1>
            <div className="dl-search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input type="text" placeholder="Search by name or specialty" aria-label="Search doctors" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="dl-filterrow">
            <button className="dl-filterbtn" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24"><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></svg>
              Specialty: <b>{active}</b>
            </button>
            {active !== 'All' && <button className="dl-clear" onClick={() => setActive('All')}>Clear filter</button>}
          </div>
        </div>

        <p className="dl-count">Showing {filtered.length} of {doctors.length} doctors</p>

        {filtered.length === 0 ? (
          <p className="dl-empty">No doctors found. Try another specialty or name.</p>
        ) : (
          <div className="dl-grid">
            {filtered.map((doc) => {
              const st = STYLE[doc.specialty] || FALLBACK
              return (
                <Link to={`/doctors/${doc.id}`} key={doc.id} className="dl-card-link">
                  <div className="dl-card">
                    <span className="dl-avail">Next: {doc.slots[0]}</span>
                    <div className="dl-head">
                      <div className="dl-avatar" style={{ background: st.bg, color: st.color }}>
                        {initials(doc.name)}
                        <span className="dl-badge">{st.icon}</span>
                      </div>
                      <div>
                        <p className="dl-spec" style={{ color: st.color }}>{doc.specialty}</p>
                        <h3 className="dl-name">{doc.name}</h3>
                        <p className="dl-meta">⭐ {doc.rating} · {doc.experience} yrs experience</p>
                      </div>
                    </div>
                    <p className="dl-bio">{doc.bio}</p>
                    <span className="dl-btn">Book Appointment</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {open && (
        <div className="dl-overlay" onClick={() => setOpen(false)}>
          <aside className="dl-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dl-drawer-head">
              <h3>Choose specialty</h3>
              <button className="dl-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <button className={`dl-opt ${active === 'All' ? 'active' : ''}`} onClick={() => choose('All')}>
              <span>All specialties</span><em>{doctors.length}</em>
            </button>
            {specialties.map((s) => {
              const st = STYLE[s] || FALLBACK
              return (
                <button key={s} className={`dl-opt ${active === s ? 'active' : ''}`} onClick={() => choose(s)}>
                  <span><i style={{ background: st.bg }}>{st.icon}</i>{s}</span><em>{counts[s]}</em>
                </button>
              )
            })}
          </aside>
        </div>
      )}
    </div>
  )
}

export default DoctorListing