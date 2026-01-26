<!-- components/Contact/ContactForm.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Contact Form - 2/3 width -->
        <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8 md:p-12">
          <div class="flex items-center gap-3 mb-8">
            <Headphones :size="32" class="text-[#0066FF]" />
            <h2 class="text-3xl font-bold text-gray-900">
              Send us a message
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- First Name & Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name
                </label>
                <input 
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name
                </label>
                <input 
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input 
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
              >
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1.5">
                Subject
              </label>
              <input 
                id="subject"
                v-model="formData.subject"
                type="text"
                placeholder="How can we help you?"
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
              >
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1.5">
                Message
              </label>
              <textarea 
                id="message"
                v-model="formData.message"
                rows="6"
                placeholder="Tell us more about your inquiry..."
                required
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-12 text-lg w-full md:w-auto group"
            >
              Send Message
              <Send :size="16" class="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <!-- Sidebar - 1/3 width -->
        <div class="space-y-8">
          
          <!-- Office Locations -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8">
            <div class="flex items-center gap-3 mb-6">
              <MapPin :size="24" class="text-[#0066FF]" />
              <h3 class="text-xl font-bold text-gray-900">
                Our Offices
              </h3>
            </div>

            <div class="space-y-6">
              <!-- Lagos Office -->
              <div class="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h4 class="font-bold text-gray-900 mb-2">
                  Lagos
                </h4>
                <p class="text-gray-600 text-sm mb-2">
                  123 Victoria Island, Lagos, Nigeria
                </p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <Clock :size="16" />
                  <span>Mon-Fri: 9am - 6pm</span>
                </div>
              </div>

              <!-- Abuja Office -->
              <div class="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h4 class="font-bold text-gray-900 mb-2">
                  Abuja
                </h4>
                <p class="text-gray-600 text-sm mb-2">
                  456 Central Business District, Abuja, Nigeria
                </p>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <Clock :size="16" />
                  <span>Mon-Fri: 9am - 6pm</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 24/7 Support Card -->
          <div class="bg-white rounded-xl border-2 border-blue-100 shadow-sm overflow-hidden p-8 bg-blue-50">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              24/7 Support
            </h3>
            <p class="text-gray-600 mb-6">
              Our support team is available around the clock to assist you with any questions or issues.
            </p>
            <button 
              class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-100 focus:ring-[#0066FF] h-11 px-5 text-base w-full"
              @click="handleStartChat"
            >
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Headphones, Send, MapPin, Clock } from 'lucide-vue-next'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // Add form submission logic here
}

const handleStartChat = () => {
  console.log('Starting live chat...')
  // Add live chat logic here
}
</script>