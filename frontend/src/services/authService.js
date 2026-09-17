import seedUsers from './mockData/users.json'

const USERS_KEY = 'careconnect_users'

function getUsers() {
  const saved = localStorage.getItem(USERS_KEY)
  return saved ? JSON.parse(saved) : seedUsers
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Real backend aane par: POST /api/auth/login
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getUsers().find((u) => u.email === email && u.password === password)
      if (user) {
        resolve({ token: 'mock-jwt-token-' + user.id, user: { id: user.id, name: user.name, role: user.role } })
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, 500)
  })
}

// Real backend aane par: POST /api/auth/register
export const registerUser = async ({ name, email, password, role, phone }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers()
      if (users.find((u) => u.email === email)) {
        reject(new Error('An account with this email already exists.'))
        return
      }
      const newUser = { id: Date.now(), name, email, password, role, phone }
      saveUsers([...users, newUser])
      resolve(newUser)
    }, 500)
  })
}