import baseAppointments from './mockData/appointments.json'

const STORAGE_KEY = 'careconnect_appointments'

function getStored() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : baseAppointments
}

function save(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
}

// Real backend aane par: GET /api/appointments/my
export const getMyAppointments = async (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all = getStored()
      resolve(all.filter((a) => a.patientName === name || a.doctorName === name))
    }, 300)
  })
}

// Real backend aane par: PUT /api/appointments/{id}/cancel
export const cancelAppointment = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = getStored().map((a) => a.id === id ? { ...a, status: 'CANCELLED' } : a)
      save(updated)
      resolve(updated)
    }, 300)
  })
}

// Real backend aane par: PUT /api/appointments/{id}/status
export const updateAppointmentStatus = async (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = getStored().map((a) => a.id === id ? { ...a, status } : a)
      save(updated)
      resolve(updated)
    }, 300)
  })
}

// Real backend aane par: POST /api/appointments
export const bookAppointment = async ({ patientName, doctorName, specialty, date, time }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all = getStored()
      const newAppointment = {
        id: Date.now(),
        patientName, doctorName, specialty, date, time,
        status: 'PENDING'
      }
      const updated = [...all, newAppointment]
      save(updated)
      resolve(newAppointment)
    }, 400)
  })
}