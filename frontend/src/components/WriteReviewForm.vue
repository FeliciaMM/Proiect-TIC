<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReviewStore } from '@/stores/reviews'

const props = defineProps({
  movieId: { type: String, required: true }
})

const auth = useAuthStore()
const reviewStore = useReviewStore()

const hoverRating = ref(0)
const title = ref('')
const body = ref('')
const rating = ref(5)

const touched = ref({ title: false, body: false, rating: false })
const error = ref(null)
const success = ref(false)
const loading = ref(false)

const errors = computed(() => {
  const e = {}

  const t = title.value.trim()
  if (!t) e.title = 'Title is required'
  else if (t.length < 3) e.title = 'Title must be at least 3 characters'
  else if (t.length > 100) e.title = 'Title is too long (max 100)'

  const b = body.value.trim()
  if (!b) e.body = 'Review text is required'
  else if (b.length < 10) e.body = 'Review text must be at least 10 characters'
  else if (b.length > 2000) e.body = 'Review text is too long (max 2000)'

  const r = Number(rating.value)
  if (!Number.isFinite(r)) e.rating = 'Rating must be a number'
  else if (r < 1 || r > 5) e.rating = 'Rating must be between 1 and 5'

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const markTouched = (field) => (touched.value[field] = true)

const submitReview = async () => {
  error.value = null
  success.value = false

  touched.value.title = true
  touched.value.body = true
  touched.value.rating = true

  if (!auth.isAuthenticated) {
    error.value = 'Trebuie să fii logat ca să adaugi un review.'
    return
  }

  if (!isValid.value) return

  try {
    loading.value = true
    await reviewStore.addReview({
      movieId: props.movieId,
      title: title.value.trim(),
      body: body.value.trim(),
      rating: Number(rating.value)
    })

    title.value = ''
    body.value = ''
    rating.value = 5
    touched.value = { title: false, body: false, rating: false }
    success.value = true
  } catch (e) {
    error.value = e.message || 'Failed to submit review'
  } finally {
    loading.value = false
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
        @blur="markTouched('title')"
        :class="{ invalid: touched.title && errors.title }"
      />
      <small v-if="touched.title && errors.title" class="error">{{ errors.title }}</small>

      <textarea
        v-model="body"
        placeholder="Write your review..."
        rows="4"
        @blur="markTouched('body')"
        :class="{ invalid: touched.body && errors.body }"
      />
      <small v-if="touched.body && errors.body" class="error">{{ errors.body }}</small>

      <div class="stars" @mouseleave="hoverRating = 0">
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ active: star <= (hoverRating || rating) }"
          @click="rating = star"
          @mouseover="hoverRating = star"
        >
          ★
        </span>
      </div>
      <small v-if="touched.rating && errors.rating" class="error">{{ errors.rating }}</small>

      <button type="submit" :disabled="loading || !auth.isAuthenticated || !isValid">
        {{ loading ? 'Posting...' : 'Submit Review' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Review added successfully!</p>
  </div>
</template>

<style scoped>
.create-review { 
  margin-top:32px; 
  padding:24px; 
  background:#1e1e1e; 
  border-radius:10px; 
  color:white; 
}

form { 
  display:flex; 
  flex-direction:column; 
  gap:12px; 
  font-family: system-ui; 
}

input, textarea {
  padding:10px; 
  border-radius:6px; 
  border:1px solid transparent;
  background:#2a2a2a; 
  color:white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.invalid { 
  border-color:#ff4d4d; 
}

button { 
  padding:10px; 
  background:#f5c518; 
  border:none; 
  border-radius:6px; 
  cursor:pointer; 
  font-weight:bold; 
}

button:disabled { 
  opacity:0.6; 
  cursor:not-allowed; 
}

.error { color:#ff6b6b; margin-top:6px; }
.success { color:#4caf50; margin-top:10px; }

.stars { display:flex; gap:6px; font-size:1.8rem; cursor:pointer; }
.star { color:#555; transition:color .2s ease; }
.star.active { color:#f5c518; }
</style>
