<!-- components/About/Team.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
          OUR TEAM
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Built by Africans, for Africans
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our diverse team of engineers, designers, and financial experts is united by a common goal: making financial services accessible to everyone.
        </p>
      </div>

      <!-- Team Image -->
      <div class="relative">
        <NuxtImg 
          src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769595423/ChatGPT_Image_Jan_28_2026_11_13_00_AM_s5kxft.png" 
          alt="Rechargify team collaborating on financial solutions" 
          class="rounded-3xl shadow-2xl border border-gray-100 w-full h-auto object-cover"
          loading="lazy"
          width="1400"
          height="600"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
</script>