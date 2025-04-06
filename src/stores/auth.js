import { defineStore } from 'pinia'
import { Auth } from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const user = localStorage.getItem('user')
    return {
      user: user ? JSON.parse(user) : null,
      success: null,
      loading: false,
      error: null,
    }
  },
  actions: {
    async login({ username, password }) {
      this.loading = true
      try {
        const response = await Auth({ username, password })
        const data = {
          username: response.data.username,
          role: response.data.role,
          userId: response.data.userId,
        }
        localStorage.setItem('user', JSON.stringify(data))
        this.user = data
        this.success = true
        return response
      } catch (error) {
        this.error = error.data.message
        throw error.data.message
      } finally {
        this.loading = false
      }
    },
  },
})
