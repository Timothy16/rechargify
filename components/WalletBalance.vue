<!-- components/WalletBalance.vue -->
<template>
  <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
    <div class="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-4 relative z-10">
      <div class="flex items-center gap-3 text-gray-400">
        <Wallet :size="20" />
        <span class="text-sm font-medium">Wallet Balance</span>
      </div>
      <button
        @click="fetchBalance"
        :disabled="isLoading"
        class="text-gray-400 hover:text-white transition"
      >
        <RefreshCw :size="16" :class="{ 'animate-spin': isLoading }" />
      </button>
    </div>

    <!-- Balance -->
    <div class="relative z-10">
      <div v-if="isLoading" class="text-3xl font-bold text-white/50">Loading...</div>
      <div v-else class="text-3xl font-bold">₦{{ formatAmount(balance) }}</div>
      <div v-if="lastCreditedAt && !isLoading" class="flex items-center gap-1.5 text-gray-400 text-xs mt-2">
        <Clock :size="12" />
        <span>Last funded {{ formatDate(lastCreditedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Wallet, RefreshCw, Clock } from 'lucide-vue-next'

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

const formatAmount = (amount) => new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(amount)

const formatDate = (date) => new Date(date).toLocaleDateString('en-NG', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
})

onMounted(() => {
  fetchBalance()
})
</script>