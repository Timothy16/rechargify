<!-- components/Services/ServicesCTA.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Ready to experience the difference?
      </h2>
      <p class="text-xl text-gray-600 mb-10">
        Join thousands of Africans who have simplified their financial lives with Rechargify.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md text-lg px-12 h-16"
          @click="handleCreateAccount"
        >
          Create Free Account
        </button>
        <button 
          class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-50 focus:ring-[#0066FF] text-lg px-12 h-16"
          @click="handleContactSales"
        >
          Contact Sales
        </button>
      </div>

      <!-- Trust Message -->
      <p class="text-gray-500 mt-6">
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

const handleContactSales = () => {
  router.push('/contact')
}
</script>