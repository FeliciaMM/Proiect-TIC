<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')

const touched = ref({ email: false, password: false })
const loading = ref(false)
const serverError = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  const e = {}
  const eNorm = email.value.trim().toLowerCase()

  if (!eNorm) e.email = 'Email is required'
  else if (!emailRegex.test(eNorm)) e.email = 'Email format is invalid'
  else if (eNorm.length > 254) e.email = 'Email is too long'

  if (!password.value) e.password = 'Password is required'
  else if (password.value.length < 8) e.password = 'Password must be at least 8 characters'
  else if (password.value.length > 72) e.password = 'Password is too long'

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const markTouched = (field) => (touched.value[field] = true)

const register = async () => {
  serverError.value = ''
  touched.value.email = true
  touched.value.password = true
  if (!isValid.value) return

  try {
    loading.value = true
    const res = await axios.post('http://localhost:5000/api/users/register', {
      email: email.value.trim().toLowerCase(),
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    serverError.value = err.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Register</h2>

    <div v-if="serverError" class="error-box">{{ serverError }}</div>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
      @blur="markTouched('email')"
      :class="{ invalid: touched.email && errors.email }"
    />
    <small v-if="touched.email && errors.email" class="error">{{ errors.email }}</small>

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      @blur="markTouched('password')"
      :class="{ invalid: touched.password && errors.password }"
    />
    <small v-if="touched.password && errors.password" class="error">{{ errors.password }}</small>

    <button :disabled="loading || !isValid" @click="register">
      {{ loading ? 'Creating...' : 'Register' }}
    </button>
  </div>
</template>

<style scoped>
.auth-form { display:flex; flex-direction:column; gap:12px; }
.auth-form input {
  padding:10px 12px; border-radius:6px; border:1px solid #333;
  background:#1a1a1a; color:white; outline:none;
}
.invalid { border-color:#ff4d4d; }
.error { color:#ff8080; }
.error-box { background:#2a0f0f; border:1px solid #ff4d4d; padding:10px; border-radius:6px; color:white; }
.auth-form button {
  padding:10px; border-radius:6px; border:none; background:#3f51b5;
  color:white; font-weight:bold; cursor:pointer;
}
.auth-form button:disabled { opacity:0.6; cursor:not-allowed; }
</style>
