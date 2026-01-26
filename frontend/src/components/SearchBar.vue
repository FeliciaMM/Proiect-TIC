<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'

const router = useRouter()
const query = ref('')
const touched = ref(false)

const error = computed(() => {
  const q = query.value.trim()
  return null
})

const submit = () => {
  touched.value = true
  if (error.value) return
  router.push(`/search?query=${encodeURIComponent(query.value.trim())}`)
}
</script>

<template>
  <div class="search-wrapper">
    <div class="search">
         <Search class="search-icon" @click="submit" />
      <input
        v-model="query"
        type="text"
        placeholder="Search movies..."
        @keydown.enter.prevent="submit"
        @blur="touched = true"
      />
    </div>

    <small v-if="touched && error" class="error">
      {{ error }}
    </small>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  width: min(240px, 70vw);
  background: linear-gradient(180deg, #1f1f1f, #161616);
  border: 1px solid #333;
  border-radius: 999px;
  padding: 0 14px;
}

.search input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 6px;
  color: white;
  outline: none;
  font-size: 0.95rem;
}

.search input::placeholder {
  color: #888;
}

.search-icon {
  width: 22px;
  height: 22px;
  min-width: 20px;
  color: #aaa;
  cursor: pointer;
}


.error {
  font-size: 0.75rem;
  color: #ff6b6b;
  padding-left: 12px;
}

@media (max-width: 480px) {
  .search {
    width: 100%;
  }
}
</style>
