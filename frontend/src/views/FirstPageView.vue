<script setup>
import FirstPageCallToAction from '@/components/FirstPageCallToAction.vue';
import FirstPageCarousel from '@/components/FirstPageCarousel.vue'
import Footer from '@/components/Footer.vue';
import MoviesDisplay from '@/components/MoviesDisplay.vue';
import RandomMovie from '@/components/RandomMovie.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="home">
    <FirstPageCarousel />


        <div class="section">
        <h2 class="title">Tonight’s picks</h2>
        <p class="subtitle">Jump into one of the movies from our collection</p>
      </div>
        <MoviesDisplay />

    <div class="section">
        <h2 class="title">Or let us choose one for you</h2>
        <p class="subtitle">It can be a plesant surprise</p>
        <RandomMovie />
    </div>
    <div>
        <FirstPageCallToAction />
    </div>
    <Footer />
  </div>
</template>
<style>
.title {
  margin-left: 30px;
  font-size: 2rem;
  font-weight: 800;
  color: white;
}

.subtitle {
    margin-left: 30px;
  color: #aaa;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.701);
}

.section{
    margin-top: 20px;

}
</style>