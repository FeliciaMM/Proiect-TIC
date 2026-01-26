import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    login({ userId, token }) {
      this.userId = userId
      this.token = token

      localStorage.setItem('userId', userId)
      localStorage.setItem('token', token)
    },

    logout() {
      this.userId = null
      this.token = null

      localStorage.removeItem('userId')
      localStorage.removeItem('token')
    }
  }
})
