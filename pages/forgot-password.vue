<!-- pages/forgot-password.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center space-x-2 mb-8">
        <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
          <Wallet :size="24" />
        </div>
        <span class="text-2xl font-bold text-gray-900">Rechargify</span>
      </NuxtLink>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        
        <!-- Success State -->
        <div v-if="emailSent" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail :size="32" class="text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p class="text-gray-600 mb-6">
            We've sent password reset instructions to <strong>{{ formData.email }}</strong>
          </p>
          <p class="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div class="space-y-3">
            <button 
              @click="resetForm"
              class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition"
            >
              Try Another Email
            </button>
            <NuxtLink 
              to="/login"
              class="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Back to Login
            </NuxtLink>
          </div>
        </div>

        <!-- Form State -->
        <div v-else>
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound :size="32" class="text-[#0066FF]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p class="text-gray-600">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input 
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
              >
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Sending...' : 'Send Reset Instructions' }}
            </button>
          </form>

          <!-- Back to Login -->
          <div class="mt-6 text-center">
            <NuxtLink 
              to="/login"
              class="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
            >
              <ArrowLeft :size="16" />
              Back to Login
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, KeyRound, Mail, ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const isLoading = ref(false)
const emailSent = ref(false)
const errorMessage = ref('')

const formData = ref({
  email: ''
})

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: formData.value.email }
    })

    if (response.success) {
      emailSent.value = true
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to send reset email'
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  emailSent.value = false
  formData.value.email = ''
  errorMessage.value = ''
}

useHead({
  title: 'Forgot Password - Rechargify',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>