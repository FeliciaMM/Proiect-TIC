<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import MovieDetails from '@/components/MovieDetails.vue'
import ReviewsCard from '@/components/ReviewsCard.vue'

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
  <div v-if="movie" class="movie-info-page">
    <MovieDetails :movie="movie" />
  </div>
  <div v-else class="loading">
    Loading movie info...
  </div>
  <div>
    <ReviewsCard :movie-id="movie.id"/>
  </div>

  
</template>

<style scoped>
.movie-info-page {
  max-width: 1200px;
  margin: auto;
  padding: 24px;
  color: white;
}

.loading {
  color: white;
  text-align: center;
  padding: 100px 0;
}
</style>
