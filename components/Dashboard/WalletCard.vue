<!-- components/Dashboard/WalletCard.vue -->
<template>
  <div class="bg-[#0066FF] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg h-full">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-64 h-64 border-4 border-white rounded-full -translate-y-32 translate-x-32"></div>
      <div class="absolute top-0 right-0 w-48 h-48 border-4 border-white rounded-full -translate-y-24 translate-x-24"></div>
      <div class="absolute bottom-0 left-0 w-56 h-56 border-4 border-white rounded-full translate-y-28 -translate-x-28"></div>
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Wallet :size="24" class="text-white" />
          </div>
          <div>
            <p class="text-white/80 text-sm font-medium">Wallet Balance</p>
            <p class="text-white text-xs">Rechargify</p>
          </div>
        </div>
        <!-- Refresh Button -->
        <button
          @click="fetchBalance"
          :disabled="isLoading"
          class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition"
        >
          <RefreshCw :size="18" class="text-white" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>

      <!-- Balance Display -->
      <div class="flex-1 flex flex-col justify-center mb-8">
        <div class="mb-4">
          <p class="text-white/80 text-sm mb-2">Available Balance</p>
          <div class="flex items-baseline gap-2">
            <span v-if="isLoading" class="text-4xl font-bold opacity-50">Loading...</span>
            <span v-else class="text-5xl font-bold">₦{{ formatAmount(balance) }}</span>
          </div>
        </div>

        <div v-if="lastCreditedAt" class="flex items-center gap-2 text-white/70 text-xs">
          <Clock :size="14" />
          <span>Last funded {{ formatDate(lastCreditedAt) }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <div>
        <NuxtLink
          to="/virtual-account"
          class="w-full bg-white text-[#0066FF] hover:bg-white/95 rounded-xl px-6 py-3.5 font-semibold text-center transition-all duration-200 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
        >
          <Plus :size="20" />
          Fund Wallet
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, Plus, RefreshCw, Clock } from 'lucide-vue-next'

const balance = ref(0)
const isLoading = ref(true)
const lastCreditedAt = ref(null)

const fetchBalance = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/wallet/balance')
    if (response.success) {
      balance.value = response.data.balance
      lastCreditedAt.value = response.data.lastCreditedAt
    }
  } catch (error) {
    console.error('Failed to fetch wallet balance:', error)
  } finally {
    isLoading.value = false
  }
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchBalance()
})
</script>