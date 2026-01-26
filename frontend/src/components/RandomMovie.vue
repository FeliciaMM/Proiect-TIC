<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const loading = ref(false)
const error = ref('')
const movie = ref(null)

const getRandomMovie = async () => {
  error.value = ''
  movie.value = null

  try {
    loading.value = true
    const res = await axios.get('http://localhost:5000/api/movies/random')
    movie.value = res.data
  } catch (e) {
    error.value = e.response?.data?.error || 'Failed to get random movie'
  } finally {
    loading.value = false
  }
}

const openMovie = () => {
  if (!movie.value?.id) return
  router.push(`/movies/${movie.value.id}`)
}
</script>

<template>
  <div class="random-card">
    <button class="random-movie-btn" :disabled="loading" @click="getRandomMovie">
      {{ loading ? 'Picking...' : 'Random Movie' }}
    </button>   

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="movie" class="movie">
      <img :src="movie.posterUrl" alt="poster" class="poster" />
      <div class="info">
        <h3 class="title">{{ movie.name }}</h3>
        <p class="date">Release: {{ movie.launchDate }}</p>
        <button class="info-btn" @click="openMovie">See Info</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.random-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: white;
  flex-grow: 1;
}

.random-movie-btn {
  width: 300px;
  padding: 14px 20px;
  border-radius: 14px;
  border: none;

  background: linear-gradient(
    120deg,
    #fffbd5,
    #f8fb61,
    #ffd6a5,
    #fffbd5
  );
  background-size: 300% 300%;

  color: #2b2500;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;

  cursor: pointer;
  margin-left: auto;
  margin-right: auto;

  box-shadow:
    0 0 15px rgba(248, 251, 97, 0.6),
    0 0 35px rgba(248, 251, 97, 0.4),
    inset 0 0 8px rgba(255, 255, 255, 0.6);

  position: relative;
  overflow: hidden;
}

.movie {
  display: flex;
  gap: 18px;
  align-items: center;
  border-radius: 16px;
  padding: 18px;
  max-width: 520px;
  margin: 0 auto;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    width: 520px;         
  min-height: 320px;
}

.poster {
  width: 200px;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.05),
    0 12px 30px rgba(0, 0, 0, 0.6);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.date {
  margin: 0;
  color: #bbb;
  font-size: 0.9rem;
}

.info-btn {
  margin-top: 10px;
  width: fit-content;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4b2c83, #6a3fbf);
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}



.error {
  color: #ff6b6b;
  text-align: center;
}

@media (max-width: 600px) {
  .movie {
    flex-direction: column;
    text-align: center;
  }

  .poster {
    width: 140px;
    height: 210px;
  }

  .open {
    align-self: center;
  }
}

</style>
