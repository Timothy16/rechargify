<!-- pages/login.vue -->
<template>
  <div class="min-h-screen bg-white flex">

    <!-- Left Side - Info Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 bg-[#0066FF] p-12 items-center justify-center relative overflow-hidden">

      <!-- Background decoration -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 translate-x-1/3" />
        <div class="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      <div class="relative z-10 max-w-lg w-full">

        <!-- Headline -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <Zap :size="12" />
            Nigeria's #1 Bill Payment Platform
          </div>
          <h2 class="text-4xl font-bold text-white mb-4 leading-tight">
            Your Bills.<br>Always On Time.
          </h2>
          <p class="text-blue-100 text-lg leading-relaxed">
            From electricity to cable TV — pay all your utility bills in seconds, get instant confirmation, and never miss a due date.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
            <div class="text-2xl font-bold text-white mb-1">50K+</div>
            <div class="text-xs text-blue-200">Active Users</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
            <div class="text-2xl font-bold text-white mb-1">₦10B+</div>
            <div class="text-xs text-blue-200">Bills Paid</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
            <div class="text-2xl font-bold text-white mb-1">99.9%</div>
            <div class="text-xs text-blue-200">Uptime</div>
          </div>
        </div>

        <!-- Feature List -->
        <div class="space-y-3 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Pay electricity, water, cable, internet & more</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Instant e-receipts delivered to your inbox</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Due date reminders so you're never cut off</span>
          </div>
        </div>

        <!-- Image -->
        <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 mb-8">
          <NuxtImg
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769592381/Gemini_Generated_Image_6eg0wh6eg0wh6eg0_a7lrbg.png"
            alt="Nigerian professional using Rechargify bill payment app"
            class="w-full h-48 object-cover object-top"
            loading="eager"
          />
        </div>

        <!-- Security Badge -->
        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div class="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield :size="18" class="text-white" />
          </div>
          <div>
            <p class="text-white text-sm font-semibold">Bank-Grade Security</p>
            <p class="text-blue-200 text-xs">256-bit encryption on every transaction</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8 lg:p-12">
      <div class="w-full max-w-md">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 mb-10">
          <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Wallet :size="24" />
          </div>
          <span class="text-2xl font-bold text-gray-900">Rechargify</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-[#0066FF] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap :size="12" />
            Secure · Fast · Reliable
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            Welcome back
          </h1>
          <p class="text-gray-500">
            Sign in to pay your bills and manage your utilities.
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-red-600 text-xs font-bold">!</span>
          </div>
          <div>
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
            <button
              v-if="showResendLink"
              @click="resendVerification"
              :disabled="isResending"
              class="text-sm text-[#0066FF] font-semibold hover:underline mt-1.5 disabled:opacity-50"
            >
              {{ isResending ? 'Sending...' : 'Resend verification email' }}
            </button>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CircleCheckBig :size="12" class="text-green-600" />
          </div>
          <p class="text-sm text-green-800">{{ successMessage }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div class="relative">
              <Mail :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                required
                class="block w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 text-gray-900 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 bg-gray-50 focus:bg-white"
              >
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <NuxtLink
                to="/forgot-password"
                class="text-xs text-[#0066FF] font-semibold hover:underline"
              >
                Forgot password?
              </NuxtLink>
            </div>
            <div class="relative">
              <Lock :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="block w-full rounded-xl border border-gray-200 pl-11 pr-12 py-3 text-gray-900 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 bg-gray-50 focus:bg-white"
              >
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                @click="togglePassword"
              >
                <Eye v-if="!showPassword" :size="16" />
                <EyeOff v-else :size="16" />
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full h-12 bg-[#0066FF] text-white rounded-xl font-semibold text-sm hover:bg-[#0052CC] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 focus:ring-offset-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            </button>
          </div>
        </form>

        <!-- Sign Up Link -->
        <p class="text-center text-sm text-gray-500 mt-5">
          Don't have an account?
          <NuxtLink to="/signup" class="text-[#0066FF] font-semibold hover:underline">
            Create free account
          </NuxtLink>
        </p>

        <!-- Trust Badges -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <div class="flex items-center justify-center gap-6">
            <div class="flex items-center gap-1.5 text-xs text-gray-400">
              <Shield :size="13" />
              256-bit SSL
            </div>
            <div class="flex items-center gap-1.5 text-xs text-gray-400">
              <BadgeCheck :size="13" />
              CBN Compliant
            </div>
            <div class="flex items-center gap-1.5 text-xs text-gray-400">
              <Lock :size="13" />
              Data Protected
            </div>
          </div>

          <!-- Mobile Stats -->
          <div class="lg:hidden mt-5 flex items-center justify-center gap-6 text-xs text-gray-400">
            <div class="flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full" />
              50K+ Users
            </div>
            <div class="flex items-center gap-1.5">
              <Zap :size="11" />
              Instant Payments
            </div>
            <div class="flex items-center gap-1.5">
              <Shield :size="11" />
              Secure
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, Shield, Lock, Eye, EyeOff, Mail, Zap, CircleCheckBig, BadgeCheck } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const showPassword = ref(false)
const isLoading = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showResendLink = ref(false)

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  showResendLink.value = false

  const result = await authStore.login(formData.value)

  isLoading.value = false

  if (result.success) {
    navigateTo('/dashboard')
  } else {
    errorMessage.value = result.error

    if (result.error.includes('verify your email')) {
      showResendLink.value = true
    }
  }
}

const resendVerification = async () => {
  isResending.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await $fetch('/api/auth/resend-verification', {
      method: 'POST',
      body: { email: formData.value.email }
    })

    if (response.success) {
      successMessage.value = 'Verification email sent! Please check your inbox.'
      showResendLink.value = false
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to resend verification email'
  } finally {
    isResending.value = false
  }
}

useHead({
  title: 'Sign In - Rechargify | Pay Your Bills Instantly',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your Rechargify account. Pay electricity, water, cable TV, internet, and airtime bills instantly and securely.'
    }
  ]
})
</script>
