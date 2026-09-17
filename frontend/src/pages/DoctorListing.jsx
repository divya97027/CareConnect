import { useState } from 'react'
import { Link } from 'react-router-dom'
import doctors from '../services/mockData/doctors.json'
import Navbar from '../components/Navbar'

function getInitials(name) {
  return name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')
}

const accentMap = {
  Cardiologist: { color: '#D9603F', bg: '#FFE3DD' },
  Dermatologist: { color: '#D9A441', bg: '#FDF1DE' },
  Pediatrician: { color: '#1B7A72', bg: '#EAFBF3' },
}

function DoctorListing() {
  const [search, setSearch] = useState('')
  const filtered = doctors.filter((doc) => doc.specialty.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Navbar />
      <div className="listing-hero">
        <div className="hero-shape hero-circle"></div>
        <div className="hero-shape hero-square"></div>
        <div className="hero-shape hero-oval"></div>
        <div className="page-shell" style={{ position: 'relative', zIndex: 1 }}>
          <h2>Find a doctor</h2>
          <p className="page-subtitle">
            Search by specialty and book your next appointment · <Link to="/my-appointments">View my appointments →</Link>
          </p>
          <input
            className="field search-field"
            type="text"
            placeholder="Search by specialty — e.g. Cardiologist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="page-shell">
        <div className="doctor-grid">
          {filtered.map((doc, i) => {
            const accent = accentMap[doc.specialty] || { color: '#1B7A72', bg: '#EAFBF3' }
            return (
              <Link to={`/doctors/${doc.id}`} key={doc.id} className="doctor-card-link">
                <div
                  className={`doctor-card shape-variant-${i % 3}`}
                  style={{ '--accent-color': accent.color, '--accent-bg': accent.bg }}
                >
                  <div className="doctor-avatar">{getInitials(doc.name)}</div>
                  <h3>{doc.name}</h3>
                  <span className="specialty-chip" style={{ background: accent.bg, color: accent.color }}>{doc.specialty}</span>
                  <p className="bio">{doc.bio} · {doc.experience} yrs experience</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default DoctorListing