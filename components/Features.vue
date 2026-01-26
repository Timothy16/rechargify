<!-- components/Features.vue -->
<template>
  <section class="py-24 bg-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
          FEATURES
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Everything you need, all in one place
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We've built a comprehensive suite of financial tools designed to make your life easier and your business more profitable.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-8 h-full group">
            <!-- Icon -->
            <div 
              class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              :class="feature.iconBg"
            >
              <component :is="feature.icon" :size="28" class="text-white" />
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Smartphone, CreditCard, Zap, PiggyBank, TrendingUp, Shield } from 'lucide-vue-next'

const features = [
  {
    title: 'Digital Wallet',
    description: 'Store funds securely with instant access. Send and receive money in seconds across Africa.',
    icon: Smartphone,
    iconBg: 'bg-blue-500'
  },
  {
    title: 'Virtual Cards',
    description: 'Create unlimited virtual cards for safe online shopping and subscription management worldwide.',
    icon: CreditCard,
    iconBg: 'bg-purple-500'
  },
  {
    title: 'Instant Payments',
    description: 'Pay utility bills, buy airtime, and transfer money instantly with zero delays across all networks.',
    icon: Zap,
    iconBg: 'bg-orange-500'
  },
  {
    title: 'Bank-Grade Security',
    description: 'Your money is protected with 256-bit encryption and real-time fraud monitoring 24/7.',
    icon: Shield,
    iconBg: 'bg-red-500'
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