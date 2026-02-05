<!-- pages/reset-password.vue -->
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
        <div v-if="resetSuccess" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleCheckBig :size="32" class="text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
          <p class="text-gray-600 mb-6">
            Your password has been updated. You can now log in with your new password.
          </p>
          <NuxtLink 
            to="/login"
            class="inline-flex items-center justify-center w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition"
          >
            Continue to Login
            <ArrowRight :size="20" class="ml-2" />
          </NuxtLink>
        </div>

        <!-- Form State -->
        <div v-else>
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound :size="32" class="text-[#0066FF]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
            <p class="text-gray-600">
              Enter your new password below to reset your account.
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            
            <!-- New Password Field -->
            <div class="relative">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <input 
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter new password"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 pr-12"
              >
              <button 
                type="button"
                class="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>

            <!-- Confirm Password Field -->
            <div class="relative">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm New Password
              </label>
              <input 
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm new password"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 pr-12"
              >
              <button 
                type="button"
                class="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <Eye v-if="!showConfirmPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>

            <!-- Password Requirements -->
            <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Info :size="18" class="text-gray-500 flex-shrink-0 mt-0.5" />
              <div class="text-xs text-gray-600 space-y-1">
                <p class="font-medium">Password must contain:</p>
                <ul class="list-disc list-inside space-y-0.5">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter (A-Z)</li>
                  <li>One lowercase letter (a-z)</li>
                  <li>One number (0-9)</li>
                  <li>One special character (@$!%*?&#)</li>
                </ul>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Resetting Password...' : 'Reset Password' }}
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
import { Wallet, KeyRound, CircleCheckBig, Eye, EyeOff, Info, ArrowRight, ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const route = useRoute()
const isLoading = ref(false)
const resetSuccess = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = ref({
  password: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  errorMessage.value = ''

  // Validate passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // Validate password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  if (!passwordRegex.test(formData.value.password)) {
    errorMessage.value = 'Password does not meet requirements'
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: route.query.token,
        password: formData.value.password
      }
    })

    if (response.success) {
      resetSuccess.value = true
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to reset password'
  } finally {
    isLoading.value = false
  }
}

// Check if token exists on mount
onMounted(() => {
  if (!route.query.token) {
    errorMessage.value = 'Invalid reset link'
  }
})

useHead({
  title: 'Reset Password - Rechargify',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>