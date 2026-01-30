<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <div class="text-center space-y-2">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">How can we help you?</h1>
        <p class="text-lg md:text-xl text-gray-600">Our support team is here to assist you 24/7</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="method in contactMethods" 
          :key="method.title"
          class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 bg-gradient-to-br"
          :class="method.gradient"
        >
          <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm text-[#0066FF]">
            <component :is="method.icon" :size="24" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ method.title }}</h3>
          <p class="text-gray-700 mb-1 font-medium">{{ method.value }}</p>
          <p class="text-sm text-gray-600 mb-4">{{ method.availability }}</p>
          <button class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 h-10 px-4 text-sm w-full">
            {{ method.buttonText }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <div class="relative">
                <select class="block w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-gray-900 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] cursor-pointer">
                  <option value="general">General Inquiry</option>
                  <option value="transaction">Transaction Issue</option>
                  <option value="account">Account Problem</option>
                  <option value="technical">Technical Support</option>
                  <option value="security">Security Concern</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <input 
                type="text" 
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" 
                placeholder="Brief description of your issue" 
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea 
                rows="5" 
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" 
                placeholder="Please provide as much detail as possible..." 
                required
              ></textarea>
            </div>

            <button class="inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] h-14 px-8 text-lg w-full shadow-sm hover:shadow-md">
              Submit Ticket
              <Send class="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Quick Help</h3>
            <div class="space-y-2">
              <button 
                v-for="help in quickHelp" 
                :key="help.title"
                class="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
              >
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0066FF]">
                  <component :is="help.icon" :size="18" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 text-sm group-hover:text-[#0066FF] transition-colors">{{ help.title }}</div>
                  <div class="text-xs text-gray-600">{{ help.desc }}</div>
                </div>
              </button>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 class="font-semibold text-gray-900 mb-3">Need Immediate Help?</h3>
            <p class="text-sm text-gray-700 mb-4">
              For urgent issues, please call our 24/7 hotline or use live chat for instant support.
            </p>
            <button class="inline-flex items-center justify-center rounded-lg font-medium transition-all bg-white border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white h-10 px-4 text-sm w-full">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  Send, 
  CircleHelp, 
  FileText, 
  Shield 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const contactMethods = [
  {
    title: 'Live Chat',
    value: 'Chat with our support team',
    availability: 'Available 24/7',
    buttonText: 'Start Chat',
    icon: MessageCircle,
    gradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    title: 'Email Support',
    value: 'support@Rechargify.com',
    availability: 'Response within 24 hours',
    buttonText: 'Send Email',
    icon: Mail,
    gradient: 'from-purple-500/10 to-purple-600/10'
  },
  {
    title: 'Phone Support',
    value: '+234 800 123 4567',
    availability: 'Mon-Fri, 8am - 6pm',
    buttonText: 'Call Now',
    icon: Phone,
    gradient: 'from-green-500/10 to-green-600/10'
  }
]

const quickHelp = [
  { title: 'FAQs', desc: 'Find answers to common questions', icon: CircleHelp },
  { title: 'Transaction Issues', desc: 'Help with failed or pending transactions', icon: FileText },
  { title: 'Security', desc: 'Account security and fraud prevention', icon: Shield }
]

const handleSubmit = () => {
  // Logic to handle ticket submission
  console.log('Ticket submitted')
}
</script>