<template>
  <div class="movie-card">
    <div class="card-header">
      <img 
        :src="movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'" 
        alt="Movie Poster" 
        class="poster-image"
      />
      <span class="rating-badge" :class="getRatingClass(movie.rating)">
        ⭐ {{ movie.rating ? movie.rating.toFixed(1) : 'N/A' }}
      </span>
    </div>

    <div class="card-body">
      <h3 class="movie-title">{{ movie.name }}</h3>
      
      <p class="movie-description">
        {{ truncateText(movie.description, 80) }}
      </p>
    </div>

    <div class="card-footer">
      <div class="review-info">
        <span class="text-muted">Vezi recenziile</span>
      </div>

      <RouterLink :to="`/movies/${movie.id}`" class="details-btn">
        Detalii
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  movie: {
    type: Object,
    required: true,

  }
})

const truncateText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  height: 100%;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.card-header {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
}

.high-rating { color: #4ade80; } 
.mid-rating { color: #facc15; }  
.low-rating { color: #f87171; } 

.card-body {
  padding: 1rem;
  flex-grow: 1; 
}

.movie-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.movie-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.card-footer {
  padding: 1rem;
  background-color: #f9fafb;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-muted {
  font-size: 0.8rem;
  color: #888;
}

.details-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.details-btn:hover {
  background-color: #2563eb;
}
</style>