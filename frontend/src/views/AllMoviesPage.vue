<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])

const fetchMovies = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/movies')
    movies.value = res.data
  } catch (err) {
    console.error('Error fetching movies:', err)
  }
}

onMounted(() => {
  fetchMovies()
})
</script>


<template>
  <div class="page">
    <h1 class="page-title">Movies</h1>
    <div class="movies-list">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  min-height: 100vh;
  background-color: #222;
}

.page-title {
  color: white;
  margin-bottom: 16px;
}

.movies-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>