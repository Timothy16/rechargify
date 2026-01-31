<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div class="relative max-w-xl">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search gift cards..." 
          class="block w-full rounded-lg border border-gray-200 pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
        />
      </div>
    </div>

    <div v-if="!searchQuery" class="space-y-4">
      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp class="w-5 h-5 text-[#0066FF]" /> Popular Gift Cards
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="card in popularCards" :key="'pop-'+card.id"
          @click="$emit('select-card', card)"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 group"
        >
          <div :class="card.color" class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
            {{ card.icon }}
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ card.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ card.desc }}</p>
          <span class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">{{ card.region }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-bold text-gray-900">{{ searchQuery ? 'Search Results' : 'All Gift Cards' }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="card in filteredCards" :key="card.id"
          @click="$emit('select-card', card)"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 group"
        >
          <div :class="card.color" class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
            {{ card.icon }}
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ card.name }}</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ card.desc }}</p>
          <span class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">{{ card.region }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, TrendingUp } from 'lucide-vue-next';

const emit = defineEmits(['select-card']);
const searchQuery = ref('');

const giftCards = [
  { id: 'amazon', name: 'Amazon', desc: 'Shop millions of products worldwide', icon: '🛒', color: 'bg-gradient-to-br from-orange-500 to-orange-600', region: 'Global', popular: true },
  { id: 'apple', name: 'Apple', desc: 'iTunes, App Store, Apple Music', icon: '🍎', color: 'bg-gradient-to-br from-gray-700 to-gray-900', region: 'Global', popular: true },
  { id: 'google', name: 'Google Play', desc: 'Apps, games, movies, and more', icon: '▶️', color: 'bg-gradient-to-br from-blue-500 to-blue-600', region: 'Global', popular: true },
  { id: 'netflix', name: 'Netflix', desc: 'Stream movies and TV shows', icon: '🎬', color: 'bg-gradient-to-br from-red-600 to-red-700', region: 'Global', popular: true },
  { id: 'spotify', name: 'Spotify', desc: 'Music streaming service', icon: '🎵', color: 'bg-gradient-to-br from-green-500 to-green-600', region: 'Global' },
  { id: 'steam', name: 'Steam', desc: 'PC gaming platform', icon: '🎮', color: 'bg-gradient-to-br from-indigo-600 to-indigo-700', region: 'Global' },
  { id: 'xbox', name: 'Xbox', desc: 'Games and subscriptions', icon: '🎮', color: 'bg-gradient-to-br from-green-600 to-green-700', region: 'Global' },
  { id: 'uber', name: 'Uber', desc: 'Rides and Uber Eats', icon: '🚗', color: 'bg-gradient-to-br from-black to-gray-800', region: 'Nigeria' },
  { id: 'jumia', name: 'Jumia', desc: 'Online shopping in Nigeria', icon: '🛍️', color: 'bg-gradient-to-br from-orange-500 to-orange-600', region: 'Nigeria' }
];

const popularCards = computed(() => giftCards.filter(c => c.popular));
const filteredCards = computed(() => {
  if (!searchQuery.value) return giftCards;
  return giftCards.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>