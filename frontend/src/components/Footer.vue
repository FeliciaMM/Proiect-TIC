<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="brand">
        <h3>🎬 MovieManiac</h3>
        <p>
          Discover, rate and review your favorite movies.
        </p>
      </div>

      <div class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/movies">Movies</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>

    <div class="bottom">
      <span>© {{ year }} MovieManiac</span>
      <span class="divider">•</span>
      <span>Built with Vue & Express</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 60px;
  padding: 32px 24px 18px;
  background: #0f0f0f;
  border-top: 1px solid #222;
  color: #bbb;
}

.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.brand {
  max-width: 400px;
}

.brand h3 {
  margin: 0 0 8px 0;
  color: white;
  font-size: 1.2rem;
}

.brand p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  align-items: center;
}

.links a {
  color: #bbb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.links a:hover {
  color: white;
}

.bottom {
  margin-top: 28px;
  padding-top: 14px;
  border-top: 1px solid #222;
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #888;
  flex-wrap: wrap;
}

.divider {
  opacity: 0.5;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }

  .links {
    justify-content: center;
  }

  .brand {
    text-align: center;
    max-width: none;
  }
}
</style>
