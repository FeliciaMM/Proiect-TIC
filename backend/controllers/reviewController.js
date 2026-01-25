const reviewService = require('../services/reviewService')

async function create(req, res) {
  try {
    const { title, body, userId, movieId, rating } = req.body

    if (!userId || !movieId) {
      return res.status(401).json({ error: 'Unauthorized!' })
    }

    if (!rating) {
      return res.status(400).json({ error: 'Add a rating to your review!' })
    }

    const id = await reviewService.createReview({
      title,
      body,
      userId,
      movieId,
      rating
    })

    res.status(201).json({ success: true, id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getByMovie(req, res) {
  try {
    const reviews = await reviewService.getReviewsByMovieId(req.params.movieId)
    res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function remove(req, res) {
  try {
    const { userId } = req.body
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    await reviewService.deleteReview(req.params.id, userId)

    res.status(200).json({
      success: true,
      message: 'Review deleted'
    })
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ error: 'You are not allowed to delete this review.' })
    }
    if (err.message === 'Review not found') {
      return res.status(404).json({ error: 'Review does not exist.' })
    }
    res.status(500).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
    const { userId } = req.body
    await reviewService.updateReview(
      req.params.id,
      req.body,
      userId
    )

    res.status(200).json({
      success: true,
      message: 'Review updated'
    })
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ error: 'Not allowed to edit this review' })
    }
    if (err.message === 'Review not found') {
      return res.status(404).json({ error: 'Review does not exist' })
    }
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  create,
  getByMovie,
  remove,
  update
}
