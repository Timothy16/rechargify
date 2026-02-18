<!-- pages/signup.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    
    <!-- Left Side - Sign Up Form -->
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
            Create your account
          </h1>
          <p class="text-lg text-gray-600">
            Join 50,000+ Africans managing their finances with Rechargify
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-800">{{ errorMessage }}</p>
        </div>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignup" class="space-y-5">
          
          <!-- First Name Field -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5">
              First Name
            </label>
            <input 
              id="firstName"
              v-model="formData.firstName"
              type="text"
              placeholder="John"
              required
              class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
            >
          </div>

          <!-- Last Name Field -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1.5">
              Last Name
            </label>
            <input 
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Doe"
              required
              class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
            >
          </div>

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
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input 
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a strong password"
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

          <!-- Security Info -->
          <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Shield :size="20" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
            <p class="text-sm text-gray-700">
              Your data is protected with 256-bit encryption. We never share your information with third parties.
            </p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="isLoading"
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-8 text-lg w-full group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Create Free Account</span>
            <span v-else>Creating Account...</span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center text-gray-600 mt-6">
          Already have an account? 
          <NuxtLink to="/login" class="text-[#0066FF] font-semibold hover:underline">
            Log in
          </NuxtLink>
        </p>

        <!-- Terms & Privacy -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-xs text-gray-500 text-center">
            By creating an account, you agree to our 
            <NuxtLink to="/legal/terms" class="text-[#0066FF] hover:underline">
              Terms of Service
            </NuxtLink> 
            and 
            <NuxtLink to="/legal/privacy" class="text-[#0066FF] hover:underline">
              Privacy Policy
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Info Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 bg-[#0066FF] p-12 items-center justify-center relative overflow-hidden">
      <div class="relative z-10 max-w-lg">
        <h2 class="text-4xl font-bold text-white mb-6">
          Start your financial journey today
        </h2>
        <p class="text-xl text-blue-100 mb-10">
          Join thousands of Africans who trust Rechargify for fast, secure, and affordable financial services.
        </p>

        <!-- Feature List -->
        <div class="space-y-4 mb-10">
          <div class="flex items-center gap-3 text-white">
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <CircleCheckBig :size="20" />
            </div>
            <span class="text-lg">Free account with no hidden fees</span>
          </div>
          <div class="flex items-center gap-3 text-white">
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Shield :size="20" />
            </div>
            <span class="text-lg">Bank-grade security & encryption</span>
          </div>
          <div class="flex items-center gap-3 text-white">
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Wallet :size="20" />
            </div>
            <span class="text-lg">Instant transactions 24/7</span>
          </div>
        </div>

        <!-- Image -->
        <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mb-10">
          <NuxtImg 
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769592381/Gemini_Generated_Image_6eg0wh6eg0wh6eg0_a7lrbg.png" 
            alt="African woman confidently using Rechargify mobile banking app" 
            class="w-full h-auto object-cover"
            loading="eager"
            width="800"
            height="1000"
          />
        </div>

     
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CircleCheckBig :size="32" class="text-green-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p class="text-gray-600 mb-6">
              We've sent a verification email to <strong>{{ formData.email }}</strong>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
            <button 
              @click="closeModal"
              class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] transition"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { Wallet, Shield, Eye, EyeOff, CircleCheckBig, Info } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const showSuccessModal = ref(false)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSignup = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const result = await authStore.register(formData.value)
  
  isLoading.value = false

  if (result.success) {
    showSuccessModal.value = true
  } else {
    errorMessage.value = result.error
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  navigateTo('/login')
}

useHead({
  title: 'Sign Up - Rechargify | Create Your Free Account',
  meta: [
    {
      name: 'description',
      content: 'Create your free Rechargify account in minutes. Join 50,000+ Africans managing their finances with secure digital banking.'
    }
  ]
})
</script>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
</style>