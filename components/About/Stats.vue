<!-- components/About/Stats.vue -->
<template>
  <section class="py-16 bg-white -mt-12 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
              <component :is="stat.icon" :size="24" />
            </div>
            <div class="text-3xl md:text-4xl font-bold text-[#0066FF] mb-2">
              {{ stat.value }}
            </div>
            <div class="text-sm md:text-base text-gray-600 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, TrendingUp, Globe, Heart } from 'lucide-vue-next'

const stats = [
  { value: '50K+', label: 'Active Users', icon: Users },
  { value: '₦10B+', label: 'Transactions Processed', icon: TrendingUp },
  { value: '12', label: 'Countries Supported', icon: Globe },
  { value: '45+', label: 'Team Members', icon: Heart }
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