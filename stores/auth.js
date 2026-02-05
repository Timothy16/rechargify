// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    userName: (state) => {
      if (!state.user) return ''
      return state.user.name || state.user.email
    },
    isAuthenticated: (state) => !!state.user,
    userType: (state) => state.user?.type || null,
  },

  actions: {
    async fetchProfile() {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch('/api/auth/profile', {
          method: 'GET'
        })

        if (response.success) {
          this.user = response.user
          return true
        }
        return false
      } catch (error) {
        this.error = error.message
        this.clearProfile()
        return false
      } finally {
        this.loading = false
      }
    },

    async register(credentials) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: credentials
        })

        if (response.success) {
          return { success: true, message: response.message }
        }
        return { success: false, error: 'Registration failed' }
      } catch (error) {
        this.error = error.data?.message || error.message
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })

        if (response.success) {
          await this.fetchProfile()
          return { success: true, user: response.user }
        }
        return { success: false, error: 'Login failed' }
      } catch (error) {
        this.error = error.data?.message || error.message
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST'
        })
        this.clearProfile()
        return true
      } catch (error) {
        console.error('Logout error:', error)
        return false
      }
    },

    clearProfile() {
      this.user = null
      this.error = null
      this.loading = false
    }
  },
})