<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center animate-in zoom-in duration-300">
    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CircleCheckBig class="w-10 h-10 text-green-600" />
    </div>
    <h2 class="text-3xl font-bold text-gray-900 mb-3">Purchase Successful!</h2>
    <p class="text-gray-600 mb-2">Your ${{ modelValue.amount }} {{ selectedCard?.name }} gift card has been sent to</p>
    <p class="text-xl font-semibold text-gray-900 mb-8">{{ modelValue.recipientEmail }}</p>
    
    <div class="flex flex-col sm:flex-row gap-3">
      <button @click="resetFlow" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold text-lg hover:bg-blue-50">
        Buy Another
      </button>
      <button @click="browseAll" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg hover:bg-[#0052CC]">
        Browse Gift Cards
      </button>
    </div>
  </div>
</template>

<script setup>
import { CircleCheckBig } from 'lucide-vue-next';
const props = defineProps(['modelValue', 'selectedCard']);
const emit = defineEmits(['next']);

const resetFlow = () => { window.location.reload(); }; // Simplest reset
const browseAll = () => { emit('next', 'list'); };
</script>