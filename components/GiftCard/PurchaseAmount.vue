<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 animate-in fade-in duration-300">
    <div class="space-y-6">
      <div :class="selectedCard?.color" class="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-xl">
        {{ selectedCard?.icon }}
      </div>
      
      <div class="w-full">
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Amount (USD)</label>
        <div class="relative">
          <input 
            :value="modelValue.amount"
            @input="updateAmount($event.target.value)"
            type="number" 
            placeholder="0.00" 
            class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
          />
        </div>
        <p v-if="modelValue.amount > 0" class="mt-2 text-sm text-gray-600">
          ≈ ₦{{ (modelValue.amount * exchangeRate).toLocaleString() }} (at ₦{{ exchangeRate }}/$USD)
        </p>
      </div>

      <div>
        <div class="text-sm font-medium text-gray-700 mb-3">Quick Select (USD)</div>
        <div class="grid grid-cols-3 gap-3">
          <button 
            v-for="val in [10, 25, 50, 100, 200, 500]" :key="val"
            @click="updateAmount(val)"
            class="px-4 py-3 rounded-lg border-2 font-semibold transition-all"
            :class="modelValue.amount == val ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-100 hover:border-gray-300 text-gray-700'"
          >
            ${{ val }}
          </button>
        </div>
      </div>

      <button 
        @click="$emit('next', 'recipient')"
        :disabled="!modelValue.amount || modelValue.amount <= 0" 
        class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50"
      >
        Continue <ArrowRight :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next';

const props = defineProps(['modelValue', 'selectedCard']);
const emit = defineEmits(['update:modelValue', 'next']);

// You can move this to a global state or inject it if the rate changes
const exchangeRate = 1500;

const updateAmount = (val) => {
  // Ensure we emit a number, but handle empty strings from input
  const numericValue = val === '' ? '' : Number(val);
  emit('update:modelValue', { ...props.modelValue, amount: numericValue });
};
</script>