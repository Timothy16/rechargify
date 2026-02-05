<!-- pages/verify-email.vue -->
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
        
        <!-- Loading State -->
        <div v-if="isVerifying" class="text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 :size="32" class="text-[#0066FF] animate-spin" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
          <p class="text-gray-600">Please wait while we verify your account.</p>
        </div>

        <!-- Success State -->
        <div v-else-if="isSuccess" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleCheckBig :size="32" class="text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
          <p class="text-gray-600 mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <NuxtLink 
            to="/login"
            class="inline-flex items-center justify-center w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition"
          >
            Continue to Login
            <ArrowRight :size="20" class="ml-2" />
          </NuxtLink>
        </div>

        <!-- Error State -->
        <div v-else class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle :size="32" class="text-red-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
          <div class="space-y-3">
            <NuxtLink 
              to="/signup"
              class="inline-flex items-center justify-center w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition"
            >
              Back to Sign Up
            </NuxtLink>
            <NuxtLink 
              to="/login"
              class="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Go to Login
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, CircleCheckBig, XCircle, Loader2, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const route = useRoute()
const isVerifying = ref(true)
const isSuccess = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const token = route.query.token

  if (!token) {
    isVerifying.value = false
    errorMessage.value = 'No verification token provided'
    return
  }

  try {
    const response = await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: { token }
    })

    if (response.success) {
      isSuccess.value = true
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Invalid or expired verification link'
  } finally {
    isVerifying.value = false
  }
})

useHead({
  title: 'Verify Email - Rechargify',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>