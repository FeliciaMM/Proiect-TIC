<script setup>
import RandomMovie from '@/components/RandomMovie.vue';
</script>
<template>
    <div>
        <h1 class="random-text">Movie Gods, please help me chose a movie!</h1>
        <RandomMovie />
    </div>
</template>
<style>
.random-text{
    margin-top: 20px;
   text-align: center;
   margin-bottom:20px;
   color: white;
   font-weight: 600;
}
</style>