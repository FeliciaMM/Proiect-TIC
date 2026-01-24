<script setup>
import RegistrationCard from '@/components/RegistrationCard.vue'
</script>

<template>
  <div class="registration-page">
    <div class="container">
      <h1>Welcome to MovieManiac!</h1>
      <p>Create an account to start adding reviews and saving your favorite movies.</p>
      
      <RegistrationCard />
    </div>
  </div>
</template>

<style scoped>
.registration-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111;
  color: white;
}

.container {
  max-width: 400px;
  width: 90%;
  padding: 32px;
  background-color: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.6);
  text-align: center;
}

.container h1 {
  margin-bottom: 12px;
  font-size: 1.8rem;
}

.container p {
  margin-bottom: 24px;
  font-size: 0.95rem;
  color: #ccc;
}
</style>
