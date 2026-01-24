<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movie = ref(null)

const fetchMovie = async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:5000/api/movies/${id}`)
    movie.value = res.data
  } catch (err) {
    console.error('Error fetching movie:', err)
  }
}

onMounted(() => {
  fetchMovie()
})
</script>

<template>
  <div v-if="movie" class="movie-details-container">
    <h1 class="title">{{ movie.name }}</h1>

    <div class="content">
      <img :src="movie.posterUrl" alt="Poster" class="poster" />

      <div class="info">
        <p class="description">{{ movie.description }}</p>
        <p class="launch-date">Release date: {{ movie.launchDate }}</p>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    Loading...
  </div>
</template>

<style scoped>
.movie-details-container {
  max-width: 1000px;
  margin: auto;
  padding: 24px;
  color: white;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 24px;
}

.content {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.poster {
  width: 300px;
  max-width: 100%;
  border-radius: 8px;
  flex-shrink: 0;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.description {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 12px;
}

.launch-date {
  font-size: 0.9rem;
  color: #888;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .poster {
    margin-bottom: 16px;
  }

  .info {
    align-items: center;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .launch-date {
    font-size: 0.85rem;
  }
}
</style>
