<!-- components/FundWallet/StepOne.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Enter Amount</h2>
      <p class="text-gray-600">How much would you like to add?</p>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1.5">Amount (₦)</label>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', Number($event.target.value))"
        type="number"
        placeholder="0.00"
        min="100"
        class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-2xl font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-colors"
      />
      <p class="text-xs text-gray-500 mt-1">Minimum amount: ₦100</p>
    </div>

    <div class="mb-8">
      <div class="text-sm font-medium text-gray-700 mb-3">Quick Select</div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
        <button
          v-for="preset in presets"
          :key="preset"
          @click="$emit('update:modelValue', preset)"
          class="px-4 py-3 rounded-lg border-2 font-semibold transition-all"
          :class="modelValue === preset ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-100 text-gray-700 hover:border-gray-200'"
        >
          ₦{{ preset.toLocaleString() }}
        </button>
      </div>
    </div>

    <button
      @click="$emit('next')"
      :disabled="!modelValue || modelValue < 100"
      class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-medium text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50 active:scale-[0.98]"
    >
      Continue <ArrowRight :size="20" />
    </button>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({ modelValue: Number })
defineEmits(['update:modelValue', 'next'])

const presets = [1000, 5000, 10000, 20000, 50000]
</script>