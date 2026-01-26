<!-- components/FAQ/ContactOptions.vue -->
<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Live Chat -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-8 text-center">
          <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
            <MessageCircle :size="24" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Live Chat
          </h3>
          <p class="text-gray-600 mb-4">
            Chat with our support team
          </p>
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] h-9 px-4 text-sm w-full"
            @click="handleStartChat"
          >
            Start Chat
          </button>
        </div>

        <!-- Email Support -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-8 text-center">
          <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
            <Mail :size="24" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Email Support
          </h3>
          <p class="text-gray-600 mb-4">
            support@Rechargify.com
          </p>
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] h-9 px-4 text-sm w-full"
            @click="handleSendEmail"
          >
            Send Email
          </button>
        </div>

        <!-- Call Us -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-8 text-center">
          <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
            <Phone :size="24" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Call Us
          </h3>
          <p class="text-gray-600 mb-4">
            +234 800 123 4567
          </p>
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] h-9 px-4 text-sm w-full"
            @click="handleCallNow"
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MessageCircle, Mail, Phone } from 'lucide-vue-next'

const handleStartChat = () => {
  // Implement live chat functionality
  console.log('Starting chat...')
}

const handleSendEmail = () => {
  window.location.href = 'mailto:support@Rechargify.com'
}

const handleCallNow = () => {
  window.location.href = 'tel:+2348001234567'
}
</script>