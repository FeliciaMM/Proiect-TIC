<script setup>
import { Film, Search, LogOut  } from 'lucide-vue-next'
</script>

<template>
  <header class="header">
    <div class="top">
      <Film class="icon" />
      <span class="logo-text">MovieManiac</span>
    </div>

    <div class="bottom">
      <nav class="nav">
         <router-link to="/" class="nav-btn">Home</router-link>
         <router-link to="/movies" class="nav-btn">Movies</router-link>
        <button class="nav-btn">Favorites</button>
        <button class="nav-btn">Random Movie</button>
      </nav>

      <div class="search">
        <input type="text" placeholder="Search movies..." />
        <Search class="search-icon" />
      </div>
      <button @click="logout" class="nav-btn">
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

.search {
  position: relative;
}

.search input {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 6px 34px 6px 12px;
  color: white;
  outline: none;
  min-width: 150px;
}

.search input::placeholder {
  color: #777;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #777;
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
