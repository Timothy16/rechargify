<!-- components/About/Story.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Image -->
        <div class="relative">
          <NuxtImg 
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769444452/ChatGPT_Image_Jan_26_2026_05_13_10_PM_ety7fa.png"
            alt="Nigerian fintech team collaborating"
            class="relative rounded-3xl shadow-2xl border border-gray-100 w-full h-auto object-cover"
            loading="lazy"
            width="1200"
            height="800"
            />

          
          <!-- Floating Badge -->
          <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center gap-3">
              <Award :size="40" class="text-[#0066FF]" />
              <div>
                <div class="font-bold text-gray-900">CBN Licensed</div>
                <div class="text-sm text-gray-600">Fully Regulated</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <!-- Content -->
<div>
  <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
    WHY WE EXIST
  </span>

  <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
    Making bill payments effortless
  </h2>

  <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
    <p>
      Paying for everyday services shouldn't be complicated. We built Rechargify to make paying for electricity, internet, airtime, data, and other utilities fast, secure, and convenient.
    </p>

    <p class="font-semibold text-gray-900">
      One trusted platform for all your everyday payments.
    </p>
  </div>
</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Award } from 'lucide-vue-next'
</script>