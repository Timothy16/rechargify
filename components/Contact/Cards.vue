<!-- components/Contact/ContactCards.vue -->
<template>
  <section class="py-16 -mt-12 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Email Card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8 bg-blue-500/10 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <Mail :size="28" class="text-[#0066FF]" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Email Us
          </h3>
          <p class="text-gray-600 mb-4">
            Our support team is here to help
          </p>
          <p class="text-gray-700 font-medium">
            support@Rechargify.com
          </p>
          <p class="text-gray-700 font-medium">
            partners@Rechargify.com
          </p>
        </div>

        <!-- Phone Card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8 bg-green-500/10 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <Phone :size="28" class="text-[#0066FF]" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Call Us
          </h3>
          <p class="text-gray-600 mb-4">
            Speak with our team directly
          </p>
          <p class="text-gray-700 font-medium">
            +234 800 123 4567
          </p>
          <p class="text-gray-700 font-medium">
            +234 800 765 4321
          </p>
        </div>

        <!-- Live Chat Card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8 bg-purple-500/10 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <MessageCircle :size="28" class="text-[#0066FF]" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Live Chat
          </h3>
          <p class="text-gray-600 mb-4">
            Get instant answers
          </p>
          <p class="text-gray-700 font-medium">
            Available 24/7
          </p>
          <p class="text-gray-700 font-medium">
            Average response: 2 min
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Mail, Phone, MessageCircle } from 'lucide-vue-next'
</script>