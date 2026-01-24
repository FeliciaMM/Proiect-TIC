const db = require('../src/firebase')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const users = db.collection('users')

async function createUser({ email, password }) {
  const existing = await users.where('email', '==', email).get()
  if (!existing.empty) {
    throw new Error('Email already exists')
  }

  if(!password){
    throw new Error('You must chose a password')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date()
  }

  const ref = await users.add(newUser)

  const token = jwt.sign(
    { id: ref.id, email },
    process.env.SECRET,
    { expiresIn: '1h' }
  )

  return { id: ref.id, token }
}

async function loginUser({ email, password }) {
  const snapshot = await users.where('email', '==', email).get()
  if (snapshot.empty) throw new Error('Invalid credentials')

  const doc = snapshot.docs[0]
  const user = doc.data()

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: doc.id, email },
    process.env.SECRET,
    { expiresIn: '1h' }
  )

  return { id: doc.id, token }
}

async function getUserById(id) {
  const doc = await users.doc(id).get()
  if (!doc.exists) return null

  const data = doc.data()
  delete data.password

  return { id: doc.id, ...data }
}

module.exports = {
  createUser,
  loginUser,
  getUserById
}
