<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 animate-in fade-in duration-300">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Confirm Purchase</h2>
    
    <div class="space-y-4 mb-8">
      <div class="flex justify-between py-3 border-b border-gray-100">
        <span class="text-gray-600">Gift Card</span>
        <span class="font-semibold text-gray-900">{{ selectedCard?.name }}</span>
      </div>
      <div class="flex justify-between py-3 border-b border-gray-100">
        <span class="text-gray-600">Amount</span>
        <span class="font-bold text-gray-900">${{ modelValue.amount }}</span>
      </div>
      <div class="flex justify-between py-3 border-b border-gray-100">
        <span class="text-gray-600">Recipient</span>
        <span class="font-semibold text-gray-900">{{ modelValue.recipientName }}</span>
      </div>
      <div class="flex justify-between py-3 border-b border-gray-100">
        <span class="text-gray-600">Email</span>
        <span class="font-semibold text-gray-900 text-right">{{ modelValue.recipientEmail }}</span>
      </div>
      <div class="flex justify-between py-4 bg-blue-50 rounded-lg px-4 mt-6">
        <span class="font-semibold text-gray-900">Total (NGN)</span>
        <span class="font-bold text-[#0066FF] text-xl">₦{{ (modelValue.amount * 1550).toLocaleString() }}</span>
      </div>
    </div>

    <div class="flex gap-3">
      <button @click="$emit('prev')" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold text-lg hover:bg-blue-50">
        Back
      </button>
      <button @click="$emit('next', 'processing')" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg hover:bg-[#0052CC]">
        Confirm & Pay
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'selectedCard']);
defineEmits(['next', 'prev']);
</script>