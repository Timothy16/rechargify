<!-- components/Services/Hero.vue -->
<template>
  <section class="relative bg-[#0066FF] py-24 text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Content -->
        <div :class="{ 'animate-fade-in-up': isVisible }">
          <span class="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
            Our Services
          </span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Everything you need in one platform
          </h1>
          <p class="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
            A complete suite of financial tools designed to make your life simpler, faster, and more secure. From payments to utilities, we've got you covered.
          </p>
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-white text-[#0066FF] hover:bg-gray-50 shadow-sm hover:shadow-md h-14 px-8 text-lg group"
            @click="handleGetStarted"
          >
            Get Started Free
            <ArrowRight :size="20" class="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <!-- Right Image -->
        <div 
          class="relative"
          :class="{ 'animate-fade-in-up animation-delay-200': isVisible }"
        >
          <img 
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769460604/ChatGPT_Image_Jan_26_2026_09_49_21_PM_gxerq5.png" 
            alt="African woman using Rechargify mobile app for payments" 
            class="rounded-3xl shadow-2xl w-full h-auto object-cover"
            loading="eager"
            width="800"
            height="1000"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const isVisible = ref(false)

const handleGetStarted = () => {
  router.push('/signup')
}

onMounted(() => {
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}
</style>