<!-- components/About/Trust.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-blue-50 rounded-3xl p-8 md:p-12 lg:p-16 text-center border-2 border-blue-100">
        
        <!-- Icon -->
        <Award :size="64" class="text-[#0066FF] mx-auto mb-6" />
        
        <!-- Content -->
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Licensed, Regulated & Trusted
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          We operate with full compliance to Nigerian and international financial regulations. Your funds are insured and protected by industry-leading security measures and regulatory oversight.
        </p>

        <!-- Compliance Badges -->
        <div class="flex flex-wrap justify-center gap-6 md:gap-8 opacity-60 grayscale">
          <div 
            v-for="badge in badges" 
            :key="badge"
            class="h-16 w-32 md:w-40 bg-white rounded-lg flex items-center justify-center shadow-sm"
          >
            <span class="font-bold text-gray-600">{{ badge }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Award } from 'lucide-vue-next'

const badges = ['CBN', 'NDIC', 'PCI DSS']
</script>