const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const reviewController = require('../controllers/reviewController')

router.post('/', auth, reviewController.create)
router.get('/movie/:movieId', reviewController.getByMovie)
router.delete('/:id', auth, reviewController.remove)

module.exports = router
