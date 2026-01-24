<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')

const register = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/register', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/') 
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed')
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Register</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>
</template>
