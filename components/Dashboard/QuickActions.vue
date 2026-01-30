<!-- components/Dashboard/QuickActions.vue -->
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div 
      v-for="(action, index) in quickActions" 
      :key="index"
      style="opacity: 1; transform: none;"
    >
      <NuxtLink
        :to="action.route"
        class="block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-6 text-center group"
      >
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
          :class="action.bgGradient"
        >
          <component :is="action.icon" :size="20" />
        </div>
        <div class="font-semibold text-gray-900">
          {{ action.title }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { Wallet, Zap, Smartphone, CreditCard } from 'lucide-vue-next'

const quickActions = ref([
  {
    title: 'Fund Wallet',
    icon: Wallet,
    bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    route: '/wallet'
  },
  {
    title: 'Pay Bills',
    icon: Zap,
    bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    route: '/services-app/bills'
  },
  {
    title: 'Buy Airtime',
    icon: Smartphone,
    bgGradient: 'bg-gradient-to-br from-green-500 to-green-600',
    route: '/services-app/airtime'
  },
  {
    title: 'Virtual Card',
    icon: CreditCard,
    bgGradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
    route: '/virtual-card'
  }
])
</script>