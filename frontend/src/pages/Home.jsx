import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <nav className="navbar">
        <span className="logo">CareConnect</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn-outline-sm">Login</Link>
          <Link to="/register" className="btn-primary-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="landing-hero">
        <div className="page-shell hero-inner">
          <div>
            <span className="form-kicker">CareConnect</span>
            <h1 className="hero-title">Appointment booking and patient engagement, made simple.</h1>
            <p className="hero-sub">One platform for patients to find doctors and book visits, and for clinics to manage schedules — without the back-and-forth calls.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Link to="/register" className="btn btn-primary" style={{ width: 'auto', padding: '12px 24px' }}>Book a Free Demo</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-1">📅 Today: 12 appointments</div>
            <div className="hero-card hero-card-2">✅ Confirmed: Dr. Mehta, 10:00 AM</div>
            <div className="hero-card hero-card-3">🔔 Reminder sent to 8 patients</div>
          </div>
        </div>
      </div>

      {/* Features - varied shapes */}
      <div className="page-shell">
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Key Features</h2>
        <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: 32 }}>Everything a clinic and patient need, in one place.</p>
        <div className="feature-grid">
          <div className="feature-box feature-circle">
            <div className="feature-icon">📆</div>
            <h3>Real-Time Calendar</h3>
            <p>A live calendar that updates instantly across every doctor. No double bookings.</p>
          </div>
          <div className="feature-box feature-hex">
            <div className="feature-icon">🔔</div>
            <h3>Automated Reminders</h3>
            <p>Patients get reminders for appointments so fewer visits are missed.</p>
          </div>
          <div className="feature-box feature-oval">
            <div className="feature-icon">👥</div>
            <h3>Queue Management</h3>
            <p>Manage patient queues automatically and show live wait order.</p>
          </div>
          <div className="feature-box feature-square">
            <div className="feature-icon">💬</div>
            <h3>Assistant Messaging</h3>
            <p>Message a doctor's assistant directly for follow-up questions.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-band">
        <div className="page-shell stats-grid">
          <div><span className="stat-number-lg">500+</span><span className="stat-label-lg">Verified doctors</span></div>
          <div><span className="stat-number-lg">12k+</span><span className="stat-label-lg">Appointments booked</span></div>
          <div><span className="stat-number-lg">99.9%</span><span className="stat-label-lg">Uptime</span></div>
          <div><span className="stat-number-lg">4.8/5</span><span className="stat-label-lg">Patient rating</span></div>
        </div>
      </div>

      {/* CTA */}
      <div className="page-shell" style={{ textAlign: 'center', padding: '64px 24px' }}>
        <div className="cta-banner">
          <h2 style={{ color: 'white' }}>Book better. Manage patients better.</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>Create a free account and see how easy booking can be.</p>
          <Link to="/register" className="btn" style={{ width: 'auto', padding: '12px 28px', background: 'white', color: 'var(--color-primary)', display: 'inline-block', marginTop: 12 }}>Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
