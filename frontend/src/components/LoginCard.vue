<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userId', res.data.id)
    router.push('/') 
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed')
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: white;
  outline: none;
}

.auth-form input::placeholder {
  color: #777;
}

.auth-form button {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-form button:hover {
  background-color: #5c6bc0;
}
</style>
