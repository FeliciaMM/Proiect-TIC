import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useReviewStore = defineStore('reviews', {
  state: () => ({
    reviews: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchReviews(movieId) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/movie/${movieId}`)
        this.reviews = res.data
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to load reviews'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async addReview({ movieId, title, body, rating }) {
      const auth = useAuthStore()
      try {
        await axios.post(
          'http://localhost:5000/api/reviews',
          { movieId, title, body, rating, userId: auth.userId },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        await this.fetchReviews(movieId)
      } catch (err) {
        console.error(err)
        throw new Error(err.response?.data?.error || 'Failed to submit review')
      }
    },

    async updateReview(reviewId, updatedData) {
      const auth = useAuthStore()
      try {
        await axios.put(
          `http://localhost:5000/api/reviews/${reviewId}`,
          { ...updatedData, userId: auth.userId },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        await this.fetchReviews(updatedData.movieId)
      } catch (err) {
        console.error(err)
        throw new Error(err.response?.data?.error || 'Failed to update review')
      }
    },

    async deleteReview(reviewId, movieId) {
      const auth = useAuthStore()
      try {
        await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
          data: { userId: auth.userId },
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        await this.fetchReviews(movieId)
      } catch (err) {
        console.error(err)
        throw new Error(err.response?.data?.error || 'Failed to delete review')
      }
    },
  },
})
