const db = require('../src/firebase')
const reviews = db.collection('reviews')

async function createReview(review) {
  const newReview = {
    title: review.title,
    body: review.body,
    userId: review.userId,
    movieId: review.movieId,
    rating: Number(review.rating),
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

module.exports = {
  createReview,
  getReviewsByMovieId,
  deleteReview
}
