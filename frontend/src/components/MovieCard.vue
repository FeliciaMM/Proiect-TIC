<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="movie-card">
    <img :src="movie.posterUrl" alt="Movie Poster" class="poster" />

    <div class="details">
      <router-link :to="`/movies/${movie.id}`" class="nav-btn">{{ movie.name }}</router-link>
      <p class="description">{{ movie.description }}</p>
      <p class="launch-date">Released: {{ movie.launchDate }}</p>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  display: flex;
  gap: 20px;
  background-color: #1a1a1a;
  color: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
}

.poster {
  width: 150px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}


.details {
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.description {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 12px;
}

.launch-date {
  font-size: 12px;
  color: #888;
}

@media (max-width: 600px) {
  .movie-card {
    flex-direction: column;
    align-items: center; 
    text-align: center; 
  }

  .poster {
    width: 100%;        
    max-width: 300px;  
    margin-bottom: 12px;
  }

  .details {
    align-items: center;
  }
}
</style>
