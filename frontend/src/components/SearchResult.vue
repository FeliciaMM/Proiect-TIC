<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const movies = ref([])
const loading = ref(false)
const error = ref('')

const fetchResults = async () => {
  const q = String(route.query.query || '').trim()

  if (!q) {
    movies.value = []
    return
  }

  try {
    loading.value = true
    error.value = ''

    const res = await axios.get('http://localhost:5000/api/movies/search', {
      params: { query: q }
    })

    movies.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    error.value = e.response?.data?.error || 'Search failed'
    movies.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.query.query, fetchResults, { immediate: true })

const goToMovie = (id) => router.push(`/movies/${id}`)
</script>

<template>
  <div style="padding: 24px; color: white;">
    <h2>Results for: "{{ route.query.query }}"</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color:#ff6b6b;">{{ error }}</div>

    <div v-else-if="movies.length === 0">
      No movies found.
    </div>

    <div v-else class="grid">
      <div v-for="m in movies" :key="m.id" class="card" @click="goToMovie(m.id)">
        <img :src="m.posterUrl" alt="poster" />
        <div class="title">{{ m.name }}</div>
        <div class="date">Release: {{ m.launchDate }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.card {
  cursor: pointer;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 10px;
  overflow: hidden;
}
.card:hover {
  border-color: #5c6bc0;
  transform: translateY(-2px);
}
.card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}
.title {
  padding: 10px 10px 0 10px;
  font-weight: 700;
}
.date {
  padding: 0 10px 10px 10px;
  color: #aaa;
  font-size: 0.85rem;
}
</style>
