const express = require('express')
const router = express.Router()
const { createUser } = require('../services/userService')

router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body

    if (!name || !email) {
      return res.status(400).json({
        error: 'Name and email are required'
      })
    }

    const id = await createUser({ name, email, role })

    res.status(201).json({
      success: true,
      id
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})


module.exports = router