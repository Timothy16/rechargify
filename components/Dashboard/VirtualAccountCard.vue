<!-- components/Dashboard/VirtualAccountCard.vue -->
<template>
  <div class="bg-[#0066FF] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg h-full">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <!-- Wave Patterns -->
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" stroke-width="2"/>
            <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="white" stroke-width="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
      
      <!-- Hexagon Patterns -->
      <div class="absolute top-0 left-0 w-32 h-32 border-4 border-white transform rotate-45 -translate-x-16 -translate-y-16"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 border-4 border-white transform rotate-12 translate-x-20 translate-y-20"></div>
      
      <!-- Dots Pattern -->
      <div class="absolute inset-0">
        <div class="absolute top-10 right-10 w-2 h-2 bg-white rounded-full"></div>
        <div class="absolute top-20 right-24 w-2 h-2 bg-white rounded-full"></div>
        <div class="absolute bottom-16 left-16 w-2 h-2 bg-white rounded-full"></div>
        <div class="absolute bottom-32 left-32 w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <CreditCard :size="24" class="text-white" />
          </div>
          <div>
            <p class="text-white/80 text-sm font-medium">Virtual Account</p>
            <p class="text-white text-xs">Rechargify</p>
          </div>
        </div>
        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Building :size="20" class="text-white" />
        </div>
      </div>

      <!-- Account Details -->
      <div class="flex-1 flex flex-col justify-center mb-8">
        <!-- Bank Name -->
        <div class="mb-6">
          <p class="text-white/80 text-sm mb-2">Bank Name</p>
          <p class="text-xl font-semibold">{{ bankName }}</p>
        </div>

        <!-- Account Number with Copy Button -->
        <div class="mb-4">
          <p class="text-white/80 text-sm mb-2">Account Number</p>
          <div class="flex items-center gap-3">
            <p class="text-3xl font-bold tracking-wider">{{ accountNumber }}</p>
            <button 
              @click="copyAccountNumber"
              class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95"
              :class="{ 'bg-green-500/30': copied }"
            >
              <Check v-if="copied" :size="18" class="text-white" />
              <Copy v-else :size="18" class="text-white" />
            </button>
          </div>
        </div>

        <!-- Account Name -->
        <div>
          <p class="text-white/80 text-sm mb-2">Account Name</p>
          <p class="text-base font-medium">{{ accountName }}</p>
        </div>
      </div>

      <!-- Info Banner -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-start gap-3">
        <Info :size="18" class="text-white/80 flex-shrink-0 mt-0.5" />
        <p class="text-white/90 text-xs leading-relaxed">
          Transfer funds to this account to automatically credit your wallet
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard, Building, Copy, Check, Info } from 'lucide-vue-next'

const bankName = ref('Wema Bank')
const accountNumber = ref('7823456789')
const accountName = ref('John Doe')
const copied = ref(false)

const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(accountNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>