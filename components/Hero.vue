<!-- components/Hero.vue -->
<template>
  <section class="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left Content -->
        <div 
          class="text-center lg:text-left"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <!-- Trust Badge -->
          <span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-[#0066FF] text-sm font-semibold mb-6 border border-blue-100">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Trusted by 50,000+ Africans
          </span>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            Banking made
            <br>
            <span class="text-[#0066FF] relative inline-block">
              simple
              <svg 
                class="absolute -bottom-2 left-0 w-full" 
                height="12" 
                viewBox="0 0 300 12" 
                fill="none"
              >
                <path 
                  d="M2 10C100 2 200 2 298 10" 
                  stroke="#0066FF" 
                  stroke-width="3" 
                  stroke-linecap="round" 
                  opacity="0.3"
                />
              </svg>
            </span>
            for Africa
          </h1>

          <!-- Subtitle -->
          <p class="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Send money, pay bills, and manage your finances with the speed of a tech startup and the security of a bank.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
            <button 
              class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-8 text-lg group"
              @click="handleCreateAccount"
            >
              Create Free Account
              <ArrowRight :size="20" class="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] h-14 px-8 text-lg"
              @click="handleWatchDemo"
            >
              Watch Demo
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div class="flex items-center gap-2 text-gray-600">
              <div class="text-[#0066FF]">
                <Lock :size="20" />
              </div>
              <span class="text-sm font-medium">256-bit SSL Encryption</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="text-[#0066FF]">
                <Shield :size="20" />
              </div>
              <span class="text-sm font-medium">PCI DSS Compliant</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="text-[#0066FF]">
                <CircleCheckBig :size="20" />
              </div>
              <span class="text-sm font-medium">Licensed by CBN</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="text-[#0066FF]">
                <Clock :size="20" />
              </div>
              <span class="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        <!-- Right Content - Hero Image -->
        <div 
          class="relative"
          :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
        >
          <NuxtImg 
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769461839/ChatGPT_Image_Jan_26_2026_10_10_10_PM_zfpzdq.png" 
            alt="African woman using Rechargify mobile banking app on smartphone" 
            class="rounded-3xl shadow-2xl border border-gray-100 w-full h-auto object-cover"
            loading="eager"
            width="1200"
            height="800"
          />
          
          <!-- Floating Stats Card -->
          <div 
            class="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 animate-float"
          >
            <div class="flex items-center gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp :size="24" class="text-green-600" />
              </div>
              <div>
                <div class="text-xl sm:text-2xl font-bold text-gray-900">₦10B+</div>
                <div class="text-xs sm:text-sm text-gray-600">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div 
        class="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 p-6 lg:p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
        :class="{ 'animate-fade-in-up animation-delay-400': isVisible }"
      >
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="text-center"
        >
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0066FF] mb-2">
            {{ stat.value }}
          </div>
          <div class="text-sm sm:text-base text-gray-600 font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup >
import { ArrowRight, Lock, Shield, CircleCheckBig, Clock, TrendingUp } from 'lucide-vue-next'

const router = useRouter()
const isVisible = ref(false)

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '₦10B+', label: 'Transactions Processed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<1min', label: 'Average Transfer Time' }
]

const handleCreateAccount = () => {
  router.push('/signup')
}

const handleWatchDemo = () => {
  // Handle demo video or modal
  console.log('Watch demo clicked')
}

onMounted(() => {
  // Trigger animations on mount
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>