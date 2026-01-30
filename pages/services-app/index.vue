<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Services</h1>
        <p class="text-gray-600">Pay bills and purchase value-added services instantly</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink 
          v-for="service in services" 
          :key="service.title"
          :to="service.link"
          class="group relative"
        >
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-8 h-full">
            
            <div v-if="service.popular" class="absolute top-4 right-4">
              <div class="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                <TrendingUp class="w-3 h-3" />
                Popular
              </div>
            </div>

            <div 
              class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
              :class="service.bgGradient"
            >
              <component :is="service.icon" class="w-8 h-8 text-white" />
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-gray-600 mb-6">{{ service.description }}</p>

            <div class="flex items-center text-[#0066FF] font-semibold group-hover:gap-2 transition-all">
              <span>Get Started</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-900">Recent Activity</h2>
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
          <div 
            v-for="(activity, index) in recentActivities" 
            :key="index"
            class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div>
              <div class="font-semibold text-gray-900">{{ activity.name }}</div>
              <div class="text-sm text-gray-500">{{ activity.time }}</div>
            </div>
            <div class="font-bold text-gray-900">
              ₦{{ activity.amount }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { 
  Smartphone, 
  Wifi, 
  Gift, 
  Zap, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const services = [
  {
    title: 'Airtime',
    description: 'Recharge airtime for all networks instantly',
    link: '/services-app/airtime',
    icon: Smartphone,
    bgGradient: 'bg-gradient-to-br from-green-500 to-green-600',
    popular: true
  },
  {
    title: 'Data Bundles',
    description: 'Buy data plans at discounted rates',
    link: '/services-app/data',
    icon: Wifi,
    bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    popular: true
  },
  {
    title: 'Gift Cards',
    description: 'Purchase gift cards for top brands',
    link: '/services-app/gift-cards',
    icon: Gift,
    bgGradient: 'bg-gradient-to-br from-pink-500 to-pink-600',
    popular: false
  },
  {
    title: 'Electricity',
    description: 'Pay electricity bills for all DISCOs',
    link: '/services-app/electricity',
    icon: Zap,
    bgGradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
    popular: false
  }
]

const recentActivities = [
  { name: 'MTN Airtime', time: 'Today', amount: '1,000' },
  { name: 'Airtel Data 10GB', time: 'Yesterday', amount: '2,000' },
  { name: 'EKEDC Prepaid', time: '2 days ago', amount: '5,000' }
]
</script>