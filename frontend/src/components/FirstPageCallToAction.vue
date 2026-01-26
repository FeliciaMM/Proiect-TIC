<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <section v-if="!auth.isAuthenticated" class="cta">
    <h2 class="title">Join MovieManiac</h2>
    <p class="text">
      Discover, rate and review your favorite movies.
    </p>

    <router-link to="/registration" class="cta-btn">
      Create account
    </router-link>
  </section>
</template>

<style scoped>
.cta {
  margin: 60px auto 0;
  padding: 40px 24px;
  max-width: 800px;
  text-align: center;

  background: linear-gradient(135deg, #1f1f1f, #151515);
  border: 1px solid #333;
  border-radius: 18px;

  color: white;
}

.title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
}

.text {
  margin: 12px 0 20px;
  color: #ccc;
  font-size: 1rem;
  line-height: 1.5;
}

.cta-btn {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 999px;

  background: linear-gradient(135deg, #5a18f5, #578fff);
  color: #ffffff;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: 0.4px;
}

@media (max-width: 600px) {
  .cta {
    padding: 32px 18px;
  }

  .title {
    font-size: 1.3rem;
  }
}
</style>
