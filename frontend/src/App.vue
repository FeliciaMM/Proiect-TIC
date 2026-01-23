<script setup>
import { onMounted } from 'vue';
import api from '@/api/axios';

onMounted(async () => {
  console.log("🚀 Încerc să contactez serverul...");
  
  try {
    const response = await api.get('/movies'); 
    
    console.log("Răspuns primit:", response.data);
  } catch (error) {
    console.error(" Eroare:", error);
  }
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">


    </div>
  </header>

  <RouterView />
</template>

