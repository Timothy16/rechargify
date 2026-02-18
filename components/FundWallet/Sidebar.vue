<!-- components/FundWallet/Sidebar.vue -->
<template>
  <div class="space-y-6">

    <!-- Wallet Balance -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3 text-gray-400">
          <Wallet :size="20" />
          <span class="text-sm">Current Balance</span>
        </div>
        <button @click="$emit('refresh')" :disabled="isLoading" class="text-gray-400 hover:text-white transition">
          <RefreshCw :size="16" :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
      <div class="text-3xl font-bold">
        <span v-if="isLoading" class="opacity-50 text-xl">Loading...</span>
        <span v-else>₦{{ formatAmount(balance) }}</span>
      </div>
    </div>

    <!-- Security Info -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
      <div class="flex items-start gap-3">
        <Shield :size="24" class="text-[#0066FF] shrink-0" />
        <p class="text-sm text-gray-600">
          All payments are secured and encrypted. Your wallet is credited automatically once payment is confirmed.
        </p>
      </div>
    </div>

    <!-- Steps -->
    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h3 class="font-semibold text-gray-900 mb-4">Steps</h3>
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            :class="step === 1 ? 'bg-[#0066FF] text-white' : 'bg-green-100 text-green-600'"
          >
            <Check v-if="step > 1" :size="16" />
            <span v-else>1</span>
          </div>
          <span class="text-sm font-semibold" :class="step === 1 ? 'text-gray-900' : 'text-gray-500'">
            Enter Amount
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            :class="step === 2 ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-400'"
          >
            2
          </div>
          <span class="text-sm font-semibold" :class="step === 2 ? 'text-gray-900' : 'text-gray-400'">
            Payment Method
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Wallet, Shield, Check, RefreshCw } from 'lucide-vue-next'

defineProps({
  balance: Number,
  isLoading: Boolean,
  step: Number
})

defineEmits(['refresh'])

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}
</script>