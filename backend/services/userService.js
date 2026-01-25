const db = require('../src/firebase')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const users = db.collection('users')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

async function createUser({ email, password }) {
  if (typeof email !== 'string' || !email.trim()) {
    throw httpError(400, 'Email is required')
  }

  const normalizedEmail = email.trim().toLowerCase()
  if (!emailRegex.test(normalizedEmail)) {
    throw httpError(400, 'Email format is invalid')
  }
  if (normalizedEmail.length > 254) {
    throw httpError(400, 'Email is too long')
  }

  if (typeof password !== 'string') {
    throw httpError(400, 'Password is required')
  }
  if (password.length < 8) {
    throw httpError(400, 'Password must be at least 8 characters')
  }
  if (password.length > 72) {
    throw httpError(400, 'Password is too long')
  }

  const existing = await users.where('email', '==', normalizedEmail).get()
  if (!existing.empty) {
    throw httpError(409, 'Email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    email: normalizedEmail,
    password: hashedPassword,
    createdAt: new Date()
  }

  const ref = await users.add(newUser)

  const token = jwt.sign(
    { id: ref.id, email: normalizedEmail },
    process.env.SECRET,
    { expiresIn: '1h' }
  )

  return { id: ref.id, token }
}

async function loginUser({ email, password }) {
  if (typeof email !== 'string' || !email.trim()) {
    throw httpError(400, 'Email is required')
  }
  if (typeof password !== 'string' || !password) {
    throw httpError(400, 'Password is required')
  }

  const normalizedEmail = email.trim().toLowerCase()

  const snapshot = await users.where('email', '==', normalizedEmail).get()
  if (snapshot.empty) {
    throw httpError(401, 'Invalid credentials')
  }

  const doc = snapshot.docs[0]
  const user = doc.data()

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw httpError(401, 'Invalid credentials')
  }

  const token = jwt.sign(
    { id: doc.id, email: normalizedEmail },
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
