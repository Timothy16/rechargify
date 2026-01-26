<!-- components/FAQ/FAQCTA.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl border-2 border-blue-100 shadow-sm overflow-hidden p-8 md:p-12 text-center bg-blue-50">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">
          Still have questions?
        </h3>
        <p class="text-xl text-gray-600 mb-8">
          Can't find the answer you're looking for? Our friendly support team is here to help 24/7.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-8 text-lg"
            @click="handleContactSupport"
          >
            Contact Support
          </button>
          <button 
            class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-100 focus:ring-[#0066FF] h-14 px-8 text-lg"
            @click="handleScheduleCall"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()

const handleContactSupport = () => {
  router.push('/contact')
}

const handleScheduleCall = () => {
  // Implement scheduling functionality
  console.log('Scheduling call...')
}
</script>