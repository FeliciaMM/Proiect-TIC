<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth' // ajustează path-ul după proiectul tău

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})

const auth = useAuthStore()

const userId = computed(() => auth.userId)
const token = computed(() => auth.token)

const hoverRating = ref(0)

const title = ref('')
const body = ref('')
const rating = ref(5)
const error = ref(null)
const success = ref(false)

const submitReview = async () => {
  error.value = null
  success.value = false

  if (!auth.isAuthenticated) {
    error.value = 'Trebuie să fii logat ca să adaugi un review.'
    return
  }

  if (!title.value.trim()) {
    error.value = 'Title is required'
    return
  }

  try {
    await axios.post(
      'http://localhost:5000/api/reviews',
      {
        title: title.value,
        body: body.value,
        rating: rating.value,
        userId: auth.userId,
        movieId: props.movieId
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )

    title.value = ''
    body.value = ''
    rating.value = 5
    success.value = true
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to submit review'
  }
}
</script>


<template>
  <div class="create-review">
    <h2>Add a review</h2>

    <form @submit.prevent="submitReview">
      <input
        v-model="title"
        type="text"
        placeholder="Review title"
      />

      <textarea
        v-model="body"
        placeholder="Write your review..."
        rows="4"
      />

      <div class="stars">
        <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: star <= (hoverRating || rating) }"
            @click="rating = star"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
        >
            ★
        </span>
        </div>

      <button type="submit" @click="debugIds">Submit Review</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Review added successfully!</p>
  </div>
</template>

<style scoped>
.create-review {
  margin-top: 32px;
  padding: 24px;
  background: #1e1e1e;
  border-radius: 10px;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

input,
textarea,
select {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #2a2a2a;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

button {
  padding: 10px;
  background: #f5c518;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

.error {
  color: #ff6b6b;
  margin-top: 10px;
}

.success {
  color: #4caf50;
  margin-top: 10px;
}

.stars {
  display: flex;
  gap: 6px;
  font-size: 1.8rem;
  cursor: pointer;
}

.star {
  color: #555;
  transition: color 0.2s ease;
}

.star.active {
  color: #f5c518;
}
</style>
