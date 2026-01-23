const db = require('../src/firebase')
const users = db.collection('users')

async function createUser(user) {
  const newUser = {
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    createdAt: new Date()
  }

  const ref = await users.add(newUser)
  return ref.id
}

module.exports = {
  createUser
}
