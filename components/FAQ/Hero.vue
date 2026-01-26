<!-- components/FAQ/Hero.vue -->
<template>
  <section class="bg-gray-50 py-24 border-b border-gray-100">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#0066FF] text-sm font-semibold mb-6 border border-blue-100">
        Help Center
      </span>
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        How can we help you?
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
        Find answers to the most common questions about Rechargify. Can't find what you're looking for? Our support team is always here to help.
      </p>

      <!-- Search Bar -->
      <div class="relative max-w-2xl mx-auto">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search for answers..."
          class="block w-full rounded-lg border px-4 py-4 pl-14 text-lg text-gray-900 shadow-lg transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] border-gray-200 hover:border-gray-300 bg-white"
          @input="handleSearch"
        >
        <Search :size="24" class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

const searchQuery = ref('')

const handleSearch = () => {
  // Search functionality can be implemented here
  console.log('Searching for:', searchQuery.value)
}
</script>