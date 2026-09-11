import mockUsers from './mockData/users.json'

// Jab real backend ready ho, is function ke andar ka code
// replace kar dena axios.post('/api/auth/login', {email, password}) se.
// Component (Login.jsx) ko kuch change nahi karna padega.
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      )
      if (user) {
        const fakeToken = 'mock-jwt-token-' + user.id
        resolve({ token: fakeToken, user: { id: user.id, name: user.name, role: user.role } })
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, 500) // real network jaisa delay simulate karta hai
  })
}