<!-- components/Services/DigitalProducts.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
          Digital Products & Utilities
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Gift cards and utility payments made simple
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div 
          v-for="(service, index) in services" 
          :key="service.title"
          class="opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-10 h-full flex flex-col group">
            
            <!-- Icon -->
            <div 
              class="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              :class="service.iconBg"
            >
              <component :is="service.icon" :size="40" class="text-white" />
            </div>

            <!-- Title -->
            <h3 class="text-3xl font-bold text-gray-900 mb-4">
              {{ service.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">
              {{ service.description }}
            </p>

            <!-- Features List -->
            <div class="space-y-3">
              <div 
                v-for="feature in service.features" 
                :key="feature"
                class="flex items-center gap-3"
              >
                <CircleCheckBig :size="20" class="text-green-500 flex-shrink-0" />
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Gift, Zap, CircleCheckBig } from 'lucide-vue-next'

const services = [
  {
    title: 'Gift Cards',
    description: 'Purchase gift cards for Amazon, Apple, Netflix, Steam, and more. Send them instantly via email or redeem them yourself.',
    icon: Gift,
    iconBg: 'bg-pink-500',
    features: [
      '50+ brands available',
      'Instant email delivery',
      'Secure redemption',
      'Perfect for gifting'
    ]
  },
  {
    title: 'Utility Bills',
    description: 'Pay for electricity, water, cable TV, and internet from the comfort of your home. Zero service fees and instant confirmation.',
    icon: Zap,
    iconBg: 'bg-orange-500',
    features: [
      'All DISCOs supported',
      'Cable TV subscriptions',
      'Internet bills',
      'Zero service fees'
    ]
  }
]
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
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>