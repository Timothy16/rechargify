<!-- components/Services/WalletServices.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
          Wallet & Accounts
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Core financial services for everyday transactions
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
import { Wallet, CreditCard, CircleCheckBig } from 'lucide-vue-next'

const services = [
  {
    title: 'Digital Wallet',
    description: 'Fund your wallet via bank transfer, card, or USSD. Hold multiple currencies and switch between them instantly with real-time exchange rates.',
    icon: Wallet,
    iconBg: 'bg-blue-500',
    features: [
      'Instant deposits',
      'Multi-currency support',
      'Zero maintenance fees',
      'Real-time balance updates'
    ]
  },
  {
    title: 'Virtual Account Numbers',
    description: 'Get a dedicated virtual bank account number to receive payments from anyone, anywhere. Perfect for freelancers and businesses.',
    icon: CreditCard,
    iconBg: 'bg-indigo-500',
    features: [
      'Unique account number',
      'Instant notifications',
      'Unlimited transactions',
      'Business-ready'
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