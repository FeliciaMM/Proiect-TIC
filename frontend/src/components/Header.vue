<script setup>
import { Film, LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SearchBar from './SearchBar.vue'

const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="top">
      <Film class="icon" />
      <span class="logo-text">MovieManiac</span>
    </div>

    <div class="bottom">
      <nav class="nav">
        <router-link v-if="!auth.isAuthenticated" to="/login" class="nav-btn">Log in</router-link>
        <router-link v-if="!auth.isAuthenticated" to="/registration" class="nav-btn">Register</router-link>
        <router-link to="/" class="nav-btn">Home</router-link>
        <router-link to="/movies" class="nav-btn">Movies</router-link>
        <router-link v-if="auth.isAuthenticated" to="/randomMovie" class="nav-btn">Random Movie</router-link>
      </nav>

      <div class="search">
        <SearchBar />
      </div>

      <button v-if="auth.isAuthenticated" @click="logout" class="nav-btn">
        <LogOut :size="20" />
      </button>
    </div>
  </header>
</template>


<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background-color: #111;
  border-bottom: 1px solid #222;
  padding: 10px 24px;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 8px;
}

.icon {
  width: 28px;
  height: 28px;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.nav {
  display: flex;
  gap: 15px; 
}

.nav-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  padding: 6px 10px;
  transition: color 0.2s;
  text-decoration: none;
}

.nav-btn:hover {
  color: white;
}

@media (max-width: 600px) {
  .bottom {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .search {
    margin-top: 8px;
  }
}
</style>
