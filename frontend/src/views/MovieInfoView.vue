<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import MovieDetails from '@/components/MovieDetails.vue'
import ReviewsCard from '@/components/ReviewsCard.vue'
import WriteReviewForm from '@/components/WriteReviewForm.vue'

import { useReviewStore } from '@/stores/reviews'

const route = useRoute()
const movie = ref(null)
const reviewStore = useReviewStore()

const fetchMovie = async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:5000/api/movies/${id}`)
    movie.value = res.data
  } catch (err) {
    console.error('Error fetching movie:', err)
  }
}

const loadPageData = async () => {
  const id = route.params.id
  await fetchMovie()
  await reviewStore.fetchReviews(id) 
}

onMounted(loadPageData)

watch(
  () => route.params.id,
  async () => {
    await loadPageData()
  }
)
</script>


<template>
  <div v-if="movie" class="movie-info-page">
    
    <MovieDetails :movie="movie" />

    <div style="margin-top: 2rem;">
       <WriteReviewForm :movie-id="movie.id" />
    </div>

    <div>
       <ReviewsCard :movie-id="movie.id"/>
    </div>
    
  </div>

  <div v-else class="loading">
    Loading movie info...
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
