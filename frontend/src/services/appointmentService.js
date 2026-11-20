import baseAppointments from './mockData/appointments.json'

const STORAGE_KEY = 'careconnect_appointments_v2'

const dayISO = (offset) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toLocaleDateString('en-CA') // YYYY-MM-DD
}

const seed = () => [
  { id: 1, patientName: 'Aditi Rao', doctorName: 'Dr. Rohan Mehta', specialty: 'Cardiologist', date: dayISO(0), time: '10:00 AM', status: 'CONFIRMED', reason: 'Blood pressure checkup' },
  { id: 2, patientName: 'Karan Mehta', doctorName: 'Dr. Rohan Mehta', specialty: 'Cardiologist', date: dayISO(0), time: '2:00 PM', status: 'PENDING', reason: 'Chest discomfort' },
  { id: 3, patientName: 'Divya Sharma', doctorName: 'Dr. Rohan Mehta', specialty: 'Cardiologist', date: dayISO(2), time: '11:30 AM', status: 'CONFIRMED', reason: 'Follow-up visit' },
  { id: 4, patientName: 'Sneha Kulkarni', doctorName: 'Dr. Rohan Mehta', specialty: 'Cardiologist', date: dayISO(3), time: '4:00 PM', status: 'PENDING', reason: 'ECG test' },
  { id: 5, patientName: 'Rahul Jain', doctorName: 'Dr. Rohan Mehta', specialty: 'Cardiologist', date: dayISO(-3), time: '3:00 PM', status: 'COMPLETED', reason: 'Cholesterol review' },
  { id: 6, patientName: 'Divya Sharma', doctorName: 'Dr. Anjali Verma', specialty: 'Dermatologist', date: dayISO(-10), time: '12:00 PM', status: 'COMPLETED', reason: 'Skin allergy' },
  { id: 7, patientName: 'Divya Sharma', doctorName: 'Dr. Sameer Khan', specialty: 'Pediatrician', date: dayISO(5), time: '1:00 PM', status: 'CONFIRMED', reason: 'Vaccination query' },
]

function getStored() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  const fresh = seed()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  return fresh
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