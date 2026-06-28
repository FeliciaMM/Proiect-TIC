<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])

const minRating = ref(0)
const filterYear = ref('')

const fetchMovies = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/movies')
    movies.value = res.data
  } catch (err) {
    console.error('Error fetching movies:', err)
  }
}

const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    const matchRating = movie.rating >= minRating.value
    const matchYear = filterYear.value === '' || (movie.launchDate && movie.launchDate.includes(filterYear.value))
    return matchRating && matchYear
  })
})

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Movies</h1>

    <div class="filters">
      <div class="filter-group">
        <label>Rating:</label>
        <select v-model="minRating">
          <option :value="0">Any rating</option>
          <option :value="3">above 3 ⭐</option>
          <option :value="4">above 4 ⭐</option>
          <option :value="4.5">above 4.5 ⭐</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Launch year:</label>
        <input 
          type="text" 
          v-model="filterYear" 
          placeholder="Any year"
        />
      </div>
    </div>

    <div class="movies-list">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
      
      <div v-if="filteredMovies.length === 0" class="no-results">
       No movies match the filters.
      </div>
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

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
  background-color: #333;
  padding: 16px;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 600;
}

.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #1a1a1a;
  color: white;
  outline: none;
}

.filter-group select:focus,
.filter-group input:focus {
  border-color: #6a5acd;
}

.movies-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-results {
  color: #ffb3b3;
  padding: 12px;
  border: 1px dashed #ffb3b3;
  border-radius: 8px;
  text-align: center;
}
</style>