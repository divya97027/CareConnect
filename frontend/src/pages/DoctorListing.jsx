import { useState } from 'react'
import doctors from '../services/mockData/doctors.json'

function DoctorListing() {
  const [search, setSearch] = useState('')

  const filtered = doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2>Find a Doctor</h2>
      <input
        type="text"
        placeholder="Search by specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 6, border: '1px solid var(--color-border)' }}
      />
      {filtered.map((doc) => (
        <div key={doc.id} style={{ padding: 16, marginBottom: 12, background: 'var(--color-mint-light)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: '0 0 4px' }}>{doc.name}</h3>
          <p style={{ margin: '0 0 4px', color: 'var(--color-teal)' }}>{doc.specialty} · {doc.experience} yrs experience</p>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{doc.bio}</p>
        </div>
      ))}
    </div>
  )
}

export default DoctorListing