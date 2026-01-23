const express = require('express')
const router = express.Router()

const { 
  createReview, 
  getReviewsByMovieId, 
  deleteReview 
} = require('../services/reviewService')

router.post('/', async (req, res) => {
  try {
    const { title, body, userId, movieId, rating } = req.body

    if (!userId || !movieId || !rating) {
      return res.status(400).json({ 
        error: 'Unauthorized!' 
      })
    }
     if ( !rating) {
      return res.status(400).json({ 
        error: 'Add a rating to your review!' 
      })
    }

    const id = await createReview({ title, body, userId, movieId, rating })

    res.status(201).json({ 
      success: true, 
      id 
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/movie/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId 
    const reviews = await getReviewsByMovieId(movieId)
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    await deleteReview(reviewId, userId)

    res.json({ 
      success: true, 
      message: 'Reveiw deleted' 
    })

  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ error: 'You are not allowed to delete this reveiw.' })
    }
    if (err.message === 'Review not found') {
      return res.status(404).json({ error: 'Review does not exist.' })
    }
    
    res.status(500).json({ error: err.message })
  }
})

module.exports = router