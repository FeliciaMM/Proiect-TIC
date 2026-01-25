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
        <div class="header">
          <h3>{{ review.title }}</h3>
          <span class="rating">⭐ {{ review.rating }}/5</span>
        </div>

        <p class="body">{{ review.body }}</p>

        <small class="date">
          {{review.createdAt.seconds}}
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-card {
  margin-top: 40px;
  padding: 24px;
  background: #1e1e1e;
  border-radius: 10px;
  color: white;
}

h2 {
  margin-bottom: 16px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review {
  background: #2a2a2a;
  padding: 16px;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.body {
  margin: 8px 0;
  color: #ccc;
}

.date {
  color: #888;
  font-size: 0.8rem;
}

.loading,
.error,
.empty {
  text-align: center;
  color: #aaa;
}
</style>
