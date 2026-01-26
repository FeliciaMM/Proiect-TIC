<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination]

const slides = [1, 2, 3, 4, 5]
</script>

<template>
  <Swiper
  :class="hero-swiper"
  :modules="modules"
  :slides-per-view="1"
  :space-between="16"
  navigation
  pagination
>
     <SwiperSlide>
    <img src="../images/poster1.png" class="slide-img" />
    </SwiperSlide>
    <SwiperSlide>
    <img src="../images/poster2.png" class="slide-img" />
    </SwiperSlide>
    <SwiperSlide>
    <img src="../images/poster5.png" class="slide-img" />
    </SwiperSlide>
    <SwiperSlide>
    <img src="../images/poster6.png" class="slide-img" />
    </SwiperSlide>
    <SwiperSlide>
    <img src="../images/poster4.png" class="slide-img" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>

.hero-swiper {
  max-height: 300px;
  height: 300px;
}

.hero-swiper :deep(.swiper-slide) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px; 
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.card {
  max-height: 400px;
  border-radius: 12px;
  background: #222;
  border: 1px solid #333;
  color: white;
  display: grid;
  place-items: center;
  font-weight: 800;
}
</style>
