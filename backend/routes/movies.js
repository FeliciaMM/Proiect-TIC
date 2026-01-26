const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

router.post('/', movieController.create)
router.get('/', movieController.getAll)
router.get('/random', movieController.random)
router.get('/search', movieController.search)
router.get('/:id', movieController.getById)


module.exports = router
