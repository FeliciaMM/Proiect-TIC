const db = require('../src/firebase')
const reviews = db.collection('reviews')

async function createReview(review) {
  if (!review.title || review.title.trim() === '') {
    throw new Error('Reviews must have a title')
  }
  if (!review.body || review.body.trim() === '') {
    throw new Error('Reviews must have a body')
  }
  if (review.body.trim().length < 10) {
    throw new Error('Review body must be at least 10 characters')
  }

  const rating = Number(review.rating)
  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw new Error('Rating must be a number between 1 and 5')
  }

  const newReview = {
    title: review.title.trim(),
    body: review.body.trim(),
    userId: review.userId,
    movieId: review.movieId,
    rating,
    createdAt: new Date()
  }

  const ref = await reviews.add(newReview)
  return ref.id
}

async function getReviewsByMovieId(movieId) {
  const snapshot = await reviews.where('movieId', '==', movieId).get()
  if (snapshot.empty) return []

  const list = []
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() })
  })
  return list
}

async function deleteReview(reviewId, requestingUserId) {
  const docRef = reviews.doc(reviewId)
  const doc = await docRef.get()

  if (!doc.exists) throw new Error('Review not found')
  if (doc.data().userId !== requestingUserId) throw new Error('Unauthorized')

  await docRef.delete()
  return true
}


async function updateReview(reviewId, updatedData, requestingUserId) {
  if (!reviewId) {
    throw new Error('Review ID is required')
  }

  if (updatedData.title !== undefined) {
    if (!updatedData.title || updatedData.title.trim() === '') {
      throw new Error('Review title cannot be empty')
    }
  }

  if (updatedData.rating !== undefined) {
    const rating = Number(updatedData.rating)
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new Error('Rating must be a number between 1 and 5')
    }
    updatedData.rating = rating
  }

  const docRef = reviews.doc(reviewId)
  const doc = await docRef.get()

  if (!doc.exists) {
    throw new Error('Review not found')
  }

  if (doc.data().userId !== requestingUserId) {
    throw new Error('Unauthorized')
  }

  const allowedUpdates = {
    title: updatedData.title,
    body: updatedData.body,
    rating: updatedData.rating,
    updatedAt: new Date()
  }

  await docRef.update(allowedUpdates)
  return true
}


module.exports = {
  createReview,
  getReviewsByMovieId,
  deleteReview,
  updateReview
}
