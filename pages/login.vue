<!-- pages/login.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    
    <!-- Left Side - Info Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 bg-[#0066FF] p-12 items-center justify-center relative overflow-hidden">
      <div class="relative z-10 max-w-lg">
        <h2 class="text-4xl font-bold text-white mb-6">
          Welcome back to Rechargify
        </h2>
        <p class="text-xl text-blue-100 mb-10">
          Access your account and continue managing your finances with Africa's most trusted fintech platform.
        </p>

        <!-- Image -->
        <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mb-10">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000" 
            alt="African professional using secure Rechargify banking" 
            class="w-full h-auto object-cover"
            loading="eager"
            width="800"
            height="1000"
          >
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 mb-10">
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">50K+</div>
            <div class="text-sm text-blue-200">Active Users</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">₦10B+</div>
            <div class="text-sm text-blue-200">Processed</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white mb-1">99.9%</div>
            <div class="text-sm text-blue-200">Uptime</div>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="flex items-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Shield :size="24" />
          <div>
            <div class="font-semibold">Bank-Grade Security</div>
            <div class="text-sm text-blue-200">Your data is protected with 256-bit encryption</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 mb-8">
          <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Wallet :size="24" />
          </div>
          <span class="text-2xl font-bold text-gray-900">Rechargify</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            Welcome back
          </h1>
          <p class="text-lg text-gray-600">
            Log in to your account to continue
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          
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

          <!-- Password Field -->
          <div>
            <div class="relative">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input 
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 pr-12"
              >
              <button 
                type="button"
                class="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
                @click="togglePassword"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  v-model="formData.rememberMe"
                  type="checkbox"
                  class="w-4 h-4 text-[#0066FF] border-gray-300 rounded focus:ring-[#0066FF]"
                >
                <span class="text-sm text-gray-600">Remember me</span>
              </label>
              <NuxtLink 
                to="/forgot-password" 
                class="text-sm text-[#0066FF] font-semibold hover:underline"
              >
                Forgot password?
              </NuxtLink>
            </div>
          </div>

          <!-- Security Info -->
          <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Lock :size="20" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
            <p class="text-sm text-gray-700">
              We use multi-factor authentication to keep your account secure.
            </p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-8 text-lg w-full group"
          >
            Log In
            <ArrowRight :size="20" class="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <!-- Sign Up Link -->
        <p class="text-center text-gray-600 mt-6">
          Don't have an account? 
          <NuxtLink to="/signup" class="text-[#0066FF] font-semibold hover:underline">
            Create free account
          </NuxtLink>
        </p>

        <!-- Mobile Stats (Only visible on mobile) -->
        <div class="lg:hidden mt-8 pt-8 border-t border-gray-200">
          <div class="flex items-center justify-center gap-6 text-gray-500 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>50K+ Users</span>
            </div>
            <div class="flex items-center gap-2">
              <Shield :size="16" />
              <span>Secure</span>
            </div>
            <div class="flex items-center gap-2">
              <Lock :size="16" />
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, Shield, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const showPassword = ref(false)
const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  console.log('Login submitted:', formData.value)
  // Add login logic here
}

// SEO Configuration
useHead({
  title: 'Login - Rechargify | Access Your Account',
  meta: [
    {
      name: 'description',
      content: 'Log in to your Rechargify account. Access your digital wallet, manage transactions, and control your finances securely.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>