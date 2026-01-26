<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const movies = ref([])
const loading = ref(false)
const error = ref('')

const fetchPromoMovies = async () => {
  loading.value = true
  error.value = ''
  movies.value = []

  try {
    const unique = new Map()
    for (let i = 0; i < 10 && unique.size < 3; i++) {
      const res = await axios.get('http://localhost:5000/api/movies/random')
      const m = res.data
      if (m?.id) unique.set(m.id, m)
    }

    movies.value = Array.from(unique.values()).slice(0, 3)

    if (movies.value.length < 3) {
      error.value = 'Not enough movies to generate 3 unique picks.'
    }
  } catch (e) {
    error.value = e.response?.data?.error || 'Failed to load promotional movies'
  } finally {
    loading.value = false
  }
}

const goToMovie = (id) => {
  if (!id) return
  router.push(`/movies/${id}`)
}

onMounted(fetchPromoMovies)
</script>

<template>
  <section class="promo">
    <div class="promo-header">
      

      <button class="refresh" :disabled="loading" @click="fetchPromoMovies">
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <div v-if="loading" class="state">Loading...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <div v-else class="grid">
      <article
        v-for="m in movies"
        :key="m.id"
        class="card"
        @click="goToMovie(m.id)"
      >
        <div class="poster">
          <img :src="m.posterUrl" :alt="m.name" loading="lazy" />
        </div>

        <div class="movie-details">
          <h3 class="movie-title">{{ m.name }}</h3>
          <p class="date">{{ m.launchDate }}</p>

          <button class="info-btn" @click.stop="goToMovie(m.id)">
            Info
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.promo {
  margin-top: 28px;
  padding: 16px;
  color: white;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.promo-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}



.refresh {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: white;
  cursor: pointer;
  white-space: nowrap;
}

.refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.state {
  padding: 12px;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 10px;
  color: #bbb;
}

.state.error {
  color: #ff6b6b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 25vw));
  justify-content: center;
  gap: 16px;
}

.card {
  cursor: pointer;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #111;
  overflow: hidden;
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.movie-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  overflow: hidden;
}

.date {
  margin: 0;
  color: #aaa;
  font-size: 0.85rem;
}

.info-btn {
  margin-top: 6px;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #6a5acd, #7b6ee6);
  color: white;
  cursor: pointer;
  font-weight: 700;
}

.info-btn:hover {
  opacity: 0.95;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 220px));
  }
  .promo-header {
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: minmax(0, 320px);
  }
}
</style>
