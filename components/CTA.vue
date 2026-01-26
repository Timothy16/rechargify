<!-- components/CTA.vue -->
<template>
  <section class="py-32 bg-white">
    <div class="max-w-5xl mx-auto px-4 text-center">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Ready to take control of your finances?
      </h2>
      <p class="text-xl md:text-2xl text-gray-600 mb-12">
        Join 50,000+ Africans who trust Rechargify for their daily financial needs.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md text-lg px-12 h-16"
          @click="handleCreateAccount"
        >
          Create Your Free Account
        </button>
        <button 
          class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] text-lg px-12 h-16"
          @click="handleTalkToSales"
        >
          Talk to Sales
        </button>
      </div>

      <!-- Trust Message -->
      <p class="text-gray-500 mt-6 text-sm md:text-base">
        No credit card required • Free forever • Cancel anytime
      </p>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()

const handleCreateAccount = () => {
  router.push('/signup')
}

const handleTalkToSales = () => {
  router.push('/contact')
}
</script>