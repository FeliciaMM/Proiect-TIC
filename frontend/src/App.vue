<script setup>
import { onMounted } from 'vue';
import api from '@/api/axios';
import Header from './components/Header.vue';

onMounted(async () => {
 
});
</script>

<template>
  <Header />
  <RouterView />
</template>

