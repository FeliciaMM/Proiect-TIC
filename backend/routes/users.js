const express = require('express')
const router = express.Router()
const { createUser, loginUser } = require('../services/userService')

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await createUser({ email, password })
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await loginUser({ email, password })
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.get('/:id',async (req, res) => {
  try {
    const id = req.params.id
    const user = await getUserById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router