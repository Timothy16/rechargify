<!-- components/Dashboard/Navbar.vue -->
<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        @click="$emit('toggle-mobile-menu')"
      >
        <Menu :size="24" />
      </button>

      <!-- Mobile Logo -->
      <NuxtLink to="/dashboard" class="lg:hidden flex items-center space-x-2">
        <div class="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center text-white">
          <Wallet :size="20" />
        </div>
        <span class="text-lg font-bold text-gray-900">Rechargify</span>
      </NuxtLink>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-4 ml-auto">
        
        <!-- Notifications -->
        <NuxtLink 
          to="/notifications" 
          class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Bell :size="20" />
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </NuxtLink>

        <!-- Online Status (Hidden on mobile) -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-sm font-medium text-gray-700">Online</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, Wallet, Bell } from 'lucide-vue-next'

defineEmits(['toggle-mobile-menu'])
</script>