<template>
  <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
    <div class="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
    <div class="flex items-center gap-3 mb-4 text-gray-400 relative z-10">
      <Wallet :size="20" />
      <span class="text-sm font-medium">Wallet Balance</span>
    </div>
    <div class="text-3xl font-bold relative z-10">₦254,350.00</div>
  </div>
</template>

<script setup>
import { Wallet } from 'lucide-vue-next'
</script>