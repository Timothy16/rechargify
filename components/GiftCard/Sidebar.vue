<template>
  <div class="space-y-6">
    <WalletBalance />

    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 bg-pink-50 border-pink-100">
      <h3 class="font-semibold text-gray-900 mb-4">How It Works</h3>
      <div class="space-y-3 text-sm">
        <div v-for="step in steps" :key="step" class="flex items-start gap-2">
          <CircleCheckBig class="text-pink-600 flex-shrink-0 mt-0.5" :size="16" />
          <span class="text-gray-700">{{ step }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleCheckBig } from 'lucide-vue-next';

const steps = [
  'Instant digital delivery', 
  'Sent via email', 
  'No expiration date', 
  'Secure transaction'
];
</script>