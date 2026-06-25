<!-- pages/signup.vue -->
<template>
  <div class="min-h-screen bg-white flex">

    <!-- Left Side - Sign Up Form -->
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
            Free forever. No hidden charges.
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            Start paying bills smarter
          </h1>
          <p class="text-gray-500">
            Join 50,000+ Nigerians who never miss a utility bill again.
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-red-600 text-xs font-bold">!</span>
          </div>
          <p class="text-sm text-red-800">{{ errorMessage }}</p>
        </div>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignup" class="space-y-4">

          <!-- Name Row -->
          <div class="grid grid-cols-2 gap-3">
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
                class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 bg-gray-50 focus:bg-white"
              >
            </div>
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
                class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300 bg-gray-50 focus:bg-white"
              >
            </div>
          </div>

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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div class="relative">
              <Lock :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a strong password"
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

            <!-- Password Strength Bar -->
            <div v-if="formData.password" class="mt-2.5">
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-all duration-300"
                  :class="i <= passwordStrengthLevel ? passwordStrengthColor : 'bg-gray-200'"
                />
              </div>
              <p class="text-xs font-medium" :class="passwordStrengthTextColor">
                {{ passwordStrengthLabel }}
              </p>
            </div>
            <p v-else class="text-xs text-gray-400 mt-1.5">
              Min. 8 characters with uppercase, number & special character
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full h-12 bg-[#0066FF] text-white rounded-xl font-semibold text-sm hover:bg-[#0052CC] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 focus:ring-offset-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="!isLoading">Create Free Account</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating Account...
              </span>
            </button>
          </div>
        </form>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-500 mt-5">
          Already have an account?
          <NuxtLink to="/login" class="text-[#0066FF] font-semibold hover:underline">
            Sign in
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
          <p class="text-xs text-gray-400 text-center mt-3">
            By signing up, you agree to our
            <NuxtLink to="/legal/terms" class="text-[#0066FF] hover:underline">Terms</NuxtLink>
            and
            <NuxtLink to="/legal/privacy" class="text-[#0066FF] hover:underline">Privacy Policy</NuxtLink>
          </p>
        </div>

      </div>
    </div>

    <!-- Right Side - Info Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 bg-[#0066FF] p-12 items-center justify-center relative overflow-hidden">

      <!-- Background decoration -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      <div class="relative z-10 max-w-lg w-full">

        <!-- Headline -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <Zap :size="12" />
            Trusted by 50,000+ Nigerians
          </div>
          <h2 class="text-4xl font-bold text-white mb-4 leading-tight">
            Pay Every Bill.<br>One Account.
          </h2>
          <p class="text-blue-100 text-lg leading-relaxed">
            Electricity, water, cable TV, internet, airtime — manage all your utility payments from a single dashboard, instantly.
          </p>
        </div>

        <!-- Bill Categories Grid -->
        <div class="grid grid-cols-3 gap-3 mb-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Zap :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Electricity</p>
            <p class="text-blue-200 text-[10px] mt-0.5">NEPA · EKEDC</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Droplets :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Water</p>
            <p class="text-blue-200 text-[10px] mt-0.5">State Boards</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Tv :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Cable TV</p>
            <p class="text-blue-200 text-[10px] mt-0.5">DSTV · Startimes</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Wifi :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Internet</p>
            <p class="text-blue-200 text-[10px] mt-0.5">Spectranet · Smile</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Smartphone :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Airtime & Data</p>
            <p class="text-blue-200 text-[10px] mt-0.5">MTN · Airtel · Glo</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Building2 :size="20" class="text-white" />
            </div>
            <p class="text-white text-xs font-semibold">Taxes & Levies</p>
            <p class="text-blue-200 text-[10px] mt-0.5">LGA · State</p>
          </div>
        </div>

        <!-- Feature List -->
        <div class="space-y-3 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Instant payment confirmation & e-receipts</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Smart reminders before your due dates</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheckBig :size="16" class="text-white" />
            </div>
            <span class="text-blue-100 text-sm">Full payment history & spending insights</span>
          </div>
        </div>

        <!-- Image -->
        <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
          <NuxtImg
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769592381/Gemini_Generated_Image_6eg0wh6eg0wh6eg0_a7lrbg.png"
            alt="Nigerian woman using Rechargify bill payment app"
            class="w-full h-48 object-cover object-top"
            loading="eager"
          />
        </div>

      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CircleCheckBig :size="32" class="text-[#0066FF]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">You're almost in!</h2>
            <p class="text-gray-500 text-sm mb-1">We sent a verification link to</p>
            <p class="text-gray-900 font-semibold mb-4">{{ formData.email }}</p>
            <p class="text-gray-500 text-sm mb-6">
              Click the link in your email to activate your account and start paying bills instantly.
            </p>
            <button
              @click="closeModal"
              class="w-full bg-[#0066FF] text-white py-3 rounded-xl font-semibold hover:bg-[#0052CC] transition-all active:scale-[0.98]"
            >
              Got it, check my email
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { Wallet, Shield, Eye, EyeOff, CircleCheckBig, Mail, Lock, Zap, Droplets, Tv, Wifi, Smartphone, Building2, BadgeCheck } from 'lucide-vue-next'
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

const passwordStrengthLevel = computed(() => {
  const p = formData.value.password
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[@$!%*?&#]/.test(p)) score++
  return score
})

const passwordStrengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrengthLevel.value] || 'Strong'
})

const passwordStrengthColor = computed(() => {
  const colors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
  return colors[passwordStrengthLevel.value] || 'bg-green-500'
})

const passwordStrengthTextColor = computed(() => {
  const colors = ['text-gray-400', 'text-red-500', 'text-orange-500', 'text-yellow-600', 'text-green-600']
  return colors[passwordStrengthLevel.value] || 'text-green-600'
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
  title: 'Sign Up - Rechargify | Pay All Your Bills in One Place',
  meta: [
    {
      name: 'description',
      content: 'Create your free Rechargify account. Pay electricity, water, cable TV, internet, and airtime bills instantly. Join 50,000+ Nigerians.'
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
