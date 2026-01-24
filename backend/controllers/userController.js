const userService = require('../services/userService')

async function register(req, res) {
  try {
    const result = await userService.createUser(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function login(req, res) {
  try {
    const result = await userService.loginUser(req.body)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function getById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  register,
  login,
  getById
}
