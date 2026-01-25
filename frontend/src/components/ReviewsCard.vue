<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})

const reviews = ref([])
const loading = ref(false)
const error = ref(null)

const currentUserId = localStorage.getItem('userId')
const token = localStorage.getItem('token')

const editingReviewId = ref(null)
const editForm = ref({
  title: '',
  body: '',
  rating: 1
})

const fetchReviews = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await axios.get(
      `http://localhost:5000/api/reviews/movie/${props.movieId}`
    )
    reviews.value = res.data
  } catch (err) {
    error.value = 'Failed to load reviews'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const startEdit = (review) => {
  editingReviewId.value = review.id
  editForm.value = {
    title: review.title,
    body: review.body,
    rating: review.rating
  }
}

const cancelEdit = () => {
  editingReviewId.value = null
}

const saveEdit = async (reviewId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/reviews/${reviewId}`,
      {
        ...editForm.value,
        userId: currentUserId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    editingReviewId.value = null
    await fetchReviews()
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.error || 'Failed to update review')
  }
}

const deleteReview = async (reviewId) => {
  if (!confirm('Are you sure you want to delete this review?')) return

  try {
    await axios.delete(
      `http://localhost:5000/api/reviews/${reviewId}`,
      {
        data: {
          userId: currentUserId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    await fetchReviews()
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.error || 'Failed to delete review')
  }
}

onMounted(fetchReviews)
watch(() => props.movieId, fetchReviews)
</script>

<template>
  <div class="reviews-card">
    <h2>Reviews</h2>

    <div v-if="loading" class="loading">Loading reviews...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="reviews.length === 0" class="empty">
      No reviews yet for this movie.
    </div>

    <div v-else class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review">
        <div v-if="editingReviewId === review.id" class="edit-form">
          <input v-model="editForm.title" />
          <textarea v-model="editForm.body"></textarea>
          <input type="number" min="1" max="5" v-model="editForm.rating" />

          <div class="actions">
            <button class="save" @click="saveEdit(review.id)">Save</button>
            <button class="cancel" @click="cancelEdit">Cancel</button>
          </div>
        </div>

        <div v-else>
          <div class="header">
            <h3>{{ review.title }}</h3>
            <span class="rating">⭐ {{ review.rating }}/5</span>
          </div>

          <p class="body">{{ review.body }}</p>

          <div
            class="review-actions"
            v-if="review.userId === currentUserId"
          >
            <button class="edit-btn" @click="startEdit(review)">
              Edit
            </button>
            <button class="delete-btn" @click="deleteReview(review.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.delete-btn {
  background: #a33;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
