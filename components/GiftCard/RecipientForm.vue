<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 animate-in fade-in duration-300">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Recipient Details</h2>
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Recipient Name</label>
        <input 
          v-model="modelValue.recipientName"
          type="text" 
          placeholder="John Doe"
          class="block w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Recipient Email</label>
        <input 
          v-model="modelValue.recipientEmail"
          type="email" 
          placeholder="john@example.com"
          class="block w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none"
        />
        <p class="mt-1.5 text-sm text-gray-500">Gift card will be sent to this email</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Personal Message (Optional)</label>
        <textarea 
          v-model="modelValue.message"
          rows="4" 
          placeholder="Add a personal message..."
          class="block w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none resize-none"
        ></textarea>
      </div>

      <div class="flex gap-3 pt-4">
        <button @click="$emit('prev')" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
          Back
        </button>
        <button 
          @click="$emit('next', 'confirm')"
          :disabled="!modelValue.recipientName || !modelValue.recipientEmail"
          class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50"
        >
          Continue <ArrowRight class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next';
defineProps(['modelValue']);
defineEmits(['next', 'prev', 'update:modelValue']);
</script>