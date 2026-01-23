const db = require('../src/firebase')
const users = db.collection('users')

async function getAll() {
  const snapshot = await users.get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function create(user) {
  const ref = await users.add(user)
  return ref.id
}

module.exports = { getAll, create }
