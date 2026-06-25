<!-- components/About/Mission.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

       <!-- Mission Card -->
<div
  class="bg-white rounded-xl shadow-sm overflow-hidden p-12
         border border-gray-100 border-2 border-blue-100
         bg-gradient-to-br from-blue-50 to-white"
>
  <Target :size="48" class="text-[#0066FF] mb-6" />
  <h3 class="text-3xl font-bold text-gray-900 mb-4">
    Our Mission
  </h3>
  <p class="text-gray-600 text-lg leading-relaxed">
    To make everyday bill payments simple, fast, and secure by providing a
    reliable platform that helps people manage all their utility services in
    one place.
  </p>
</div>

<!-- Vision Card -->
<div
  class="bg-white rounded-xl shadow-sm overflow-hidden p-12
         border border-gray-100 border-2 border-purple-100
         bg-gradient-to-br from-purple-50 to-white"
>
  <Globe :size="48" class="text-[#0066FF] mb-6" />
  <h3 class="text-3xl font-bold text-gray-900 mb-4">
    Our Vision
  </h3>
  <p class="text-gray-600 text-lg leading-relaxed">
    To become the most trusted platform for bill payments and utilities,
    empowering millions of people to pay for essential services effortlessly,
    anytime and anywhere.
  </p>
</div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { Target, Globe } from 'lucide-vue-next'
</script>
