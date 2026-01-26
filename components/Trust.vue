<!-- components/Trust.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Trusted by thousands across Africa
      </h2>
      <p class="text-xl text-gray-600 mb-12">
        Join the financial revolution
      </p>

      <!-- Partner Logos -->
      <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale">
        <span 
          v-for="partner in partners" 
          :key="partner"
          class="text-xl md:text-2xl font-bold text-gray-400 hover:opacity-100 transition-opacity duration-300"
        >
          {{ partner }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = [
  'TECHCABAL',
  'DISRUPT AFRICA',
  'VENTURES AFRICA',
  'TECHPOINT'
]
</script>