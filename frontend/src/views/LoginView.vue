<script setup>
import LoginCard from '@/components/LoginCard.vue'
</script>

<template>
  <div class="login-page">
    <div class="container">
      <h1>Welcome back!</h1>
      <p>Enter your credentials to log in to MovieManiac.</p>
      <LoginCard />
      <p class="redirect">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
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
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: #ccc;
}

.redirect {
  margin-top: 16px;
  font-size: 0.9rem;
  color: #bbb;
}

.redirect a {
  color: #3f51b5;
  text-decoration: underline;
}
</style>
