<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReviewStore } from '@/stores/reviews'

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})

const auth = useAuthStore()
const reviewStore = useReviewStore()

const reviews = computed(() => reviewStore.reviews)
const loading = computed(() => reviewStore.loading)
const error = computed(() => reviewStore.error)

const editingReviewId = ref(null)
const editForm = ref({
  title: '',
  body: '',
  rating: 1
})

const fetchReviews = async () => {
  await reviewStore.fetchReviews(props.movieId)
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
    await reviewStore.updateReview(reviewId, {
      ...editForm.value,
      movieId: props.movieId 
    })
    editingReviewId.value = null
  } catch (e) {
    alert(e.message || 'Failed to update review')
  }
}

const deleteReview = async (reviewId) => {
  if (!confirm('Are you sure you want to delete this review?')) return

  try {
    await reviewStore.deleteReview(reviewId, props.movieId)
  } catch (e) {
    alert(e.message || 'Failed to delete review')
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

          <div class="review-actions" v-if="review.userId === auth.userId">
            <button class="edit-btn" @click="startEdit(review)">Edit</button>
            <button class="delete-btn" @click="deleteReview(review.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 10px;
  color: white;
}

.reviews-card h2 {
  margin: 0 0 12px 0;
}

.loading,
.empty {
  padding: 12px;
  background: #222;
  border: 1px solid #333;
  border-radius: 8px;
  color: #bbb;
}

.error {
  padding: 12px;
  background: #2a0f0f;
  border: 1px solid #ff4d4d;
  border-radius: 8px;
  color: #ffd1d1;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review {
  padding: 12px;
  background: #222;
  border: 1px solid #333;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.header h3 {
  margin: 0;
  font-size: 1rem;
}

.rating {
  white-space: nowrap;
  color: #f5c518;
  font-size: 0.9rem;
}

.body {
  margin: 8px 0 0 0;
  color: #ccc;
  line-height: 1.4;
}

.review-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.edit-btn,
.delete-btn,
.save,
.cancel {
  border: none;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 600;
  color: white;
}

.edit-btn {
  background: #7110c6;
}

.delete-btn {
  background: #a33;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: white;
  outline: none;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    gap: 6px;
  }
}

</style>