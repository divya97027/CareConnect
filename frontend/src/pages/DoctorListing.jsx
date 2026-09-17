import { useState } from 'react'
import doctors from '../services/mockData/doctors.json'

function getInitials(name) {
  return name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')
}

const accentMap = {
  Cardiologist: { color: '#FF6F59', bg: '#FFE3DD' },
  Dermatologist: { color: '#E8A33D', bg: '#FDF1DE' },
  Pediatrician: { color: '#1B7A72', bg: '#EAFBF3' },
}

function DoctorListing() {
  const [search, setSearch] = useState('')

  const filtered = doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <nav className="navbar">
        <span className="logo">CareConnect</span>
      </nav>
      <div className="page-shell">
        <h2>Find a doctor</h2>
        <p className="page-subtitle">Search by specialty and book your next appointment</p>
        <input
          className="field search-field"
          type="text"
          placeholder="Search by specialty — e.g. Cardiologist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="doctor-grid">
          {filtered.map((doc) => {
  const accent = accentMap[doc.specialty] || { color: '#1B7A72', bg: '#EAFBF3' }
  return (
    <div
      key={doc.id}
      className="doctor-card"
      style={{ '--accent-color': accent.color, '--accent-bg': accent.bg }}
    >
      <div className="doctor-avatar">{getInitials(doc.name)}</div>
      <h3>{doc.name}</h3>
      <span className="specialty-chip" style={{ background: accent.bg, color: accent.color }}>
        {doc.specialty}
      </span>
      <p className="bio">{doc.bio} · {doc.experience} yrs experience</p>
    </div>
  )
})}
        </div>
      </div>
    </>
  )
}

export default DoctorListing