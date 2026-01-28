<!-- components/Services/WhyChooseUs.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left Content -->
        <div>
          <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
            WHY CHOOSE US
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            More than just a payment platform
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            We're building the financial infrastructure that Africa deserves. Fast, secure, and designed with you in mind.
          </p>

          <!-- Reasons List -->
          <div class="space-y-6">
            <div 
              v-for="(reason, index) in reasons" 
              :key="reason.title"
              class="flex gap-4"
            >
              <div class="w-12 h-12 bg-[#0066FF] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-1">
                  {{ reason.title }}
                </h4>
                <p class="text-gray-600">
                  {{ reason.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <NuxtImg 
            src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769461164/ChatGPT_Image_Jan_26_2026_09_58_24_PM_m4l0np.png" 
            alt="African professional using Rechargify services confidently" 
            class="rounded-3xl shadow-2xl w-full h-auto object-cover"
            loading="lazy"
            width="800"
            height="1000"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reasons = [
  {
    title: 'Lightning Fast',
    description: 'Transactions complete in seconds, not minutes'
  },
  {
    title: 'Bank-Grade Security',
    description: 'Your money is protected with military-grade encryption'
  },
  {
    title: '24/7 Support',
    description: 'Our team is always here to help you succeed'
  },
  {
    title: 'Zero Hidden Fees',
    description: 'Transparent pricing with no surprises'
  }
]
</script>