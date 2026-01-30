<!-- pages/virtual-account/index.vue -->
<template>
  <div>
    <main class="p-4 sm:p-6 lg:p-8">
      <div style="opacity: 1; transform: none;">
        <div class="max-w-5xl mx-auto space-y-8">
          
          <!-- Page Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Virtual Account
            </h1>
            <p class="text-gray-600">
              Your dedicated account number for receiving payments
            </p>
          </div>

          <!-- Main Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Column - Main Content -->
            <div class="lg:col-span-2 space-y-6">
              
              <!-- Virtual Account Card -->
              <div style="opacity: 1; transform: none;">
                <div class="bg-[#0066FF] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
                  <!-- Background Pattern -->
                  <div class="absolute inset-0 opacity-10">
                    <!-- Wave Patterns -->
                    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="waves-page" width="100" height="100" patternUnits="userSpaceOnUse">
                          <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" stroke-width="2"/>
                          <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="white" stroke-width="1.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#waves-page)" />
                    </svg>
                    
                    <!-- Decorative Shapes -->
                    <div class="absolute top-0 right-0 w-64 h-64 border-4 border-white rounded-full -translate-y-32 translate-x-32"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 border-4 border-white rounded-full translate-y-32 -translate-x-32"></div>
                  </div>

                  <!-- Content -->
                  <div class="relative z-10">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-6 sm:mb-8">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <Building2 :size="20" class="text-blue-200 sm:w-6 sm:h-6" />
                        <span class="text-blue-100 font-medium text-sm sm:text-base">Virtual Account</span>
                      </div>
                      <div class="px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                        Active
                      </div>
                    </div>

                    <!-- Account Details -->
                    <div class="space-y-5 sm:space-y-6">
                      <!-- Bank Name -->
                      <div>
                        <div class="text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">Bank Name</div>
                        <div class="text-xl sm:text-2xl font-bold">{{ bankName }}</div>
                      </div>

                      <!-- Account Number with Copy -->
                      <div>
                        <div class="text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">Account Number</div>
                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider break-all">{{ accountNumber }}</div>
                          <button 
                            @click="copyAccountNumber"
                            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-gray-900 hover:bg-gray-50 shadow-sm h-9 px-3 text-sm w-full sm:w-auto flex-shrink-0"
                          >
                            <Check v-if="copied" :size="16" class="mr-2" />
                            <Copy v-else :size="16" class="mr-2" />
                            {{ copied ? 'Copied' : 'Copy' }}
                          </button>
                        </div>
                      </div>

                      <!-- Account Name -->
                      <div>
                        <div class="text-xs sm:text-sm text-blue-100 mb-1.5 sm:mb-2">Account Name</div>
                        <div class="text-base sm:text-lg md:text-xl font-semibold break-words">{{ accountName }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- How to Use Section -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                  How to Use Your Virtual Account
                </h2>
                <div class="space-y-6">
                  <div class="flex gap-4">
                    <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[#0066FF]">
                      1
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-2">Share Your Account Details</h3>
                      <p class="text-gray-600">
                        Share your virtual account number with anyone who wants to send you money. They can transfer from any Nigerian bank.
                      </p>
                    </div>
                  </div>

                  <div class="flex gap-4">
                    <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[#0066FF]">
                      2
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-2">Receive Instant Credit</h3>
                      <p class="text-gray-600">
                        Once the transfer is made, your Rechargify wallet is credited instantly. No waiting, no delays.
                      </p>
                    </div>
                  </div>

                  <div class="flex gap-4">
                    <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[#0066FF]">
                      3
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-2">Start Spending</h3>
                      <p class="text-gray-600">
                        Use your wallet balance to pay bills, buy airtime, send money, or make purchases instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Benefits Section -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8 bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Benefits</h2>
                <div class="space-y-3">
                  <div 
                    v-for="(benefit, index) in benefits" 
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <CircleCheckBig :size="20" class="text-green-600 flex-shrink-0 mt-0.5" />
                    <span class="text-gray-700">{{ benefit }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Sidebar -->
            <div class="space-y-6">
              
              <!-- Quick Actions -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <h3 class="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div class="space-y-3">
                  <NuxtLink
                    to="/wallet"
                    class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 focus:ring-[#0066FF] h-11 px-5 text-base w-full justify-between"
                  >
                    Wallet
                    <ArrowRight :size="16" />
                  </NuxtLink>
                  
                  <NuxtLink
                    to="/transactions"
                    class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 focus:ring-[#0066FF] h-11 px-5 text-base w-full justify-between"
                  >
                    View Transactions
                    <ArrowRight :size="16" />
                  </NuxtLink>
                </div>
              </div>

              <!-- Important Note -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 bg-blue-50 border-blue-100">
                <div class="flex items-start gap-3">
                  <Info :size="20" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-2">Important Note</h3>
                    <p class="text-sm text-gray-600">
                      This account number is unique to you and can only be used to fund your Rechargify wallet. Do not use it for any other purpose.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Need Help -->
              <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <h3 class="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p class="text-sm text-gray-600 mb-4">
                  Having trouble with your virtual account? Our support team is here to help.
                </p>
                <NuxtLink
                  to="/support"
                  class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-transparent border border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 focus:ring-[#0066FF] h-9 px-3 text-sm w-full"
                >
                  Contact Support
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Building2, Copy, Check, CircleCheckBig, ArrowRight, Info } from 'lucide-vue-next'

// Set layout
definePageMeta({
  layout: 'dashboard'
})

// Account data
const bankName = ref('Wema Bank')
const accountNumber = ref('7823456789')
const accountName = ref('John Doe - Rechargify')
const copied = ref(false)

const benefits = ref([
  'Receive payments from anyone, anywhere in Nigeria',
  'Instant credit to your Rechargify wallet',
  'No transaction fees for incoming transfers',
  'Works with all Nigerian banks',
  'Available 24/7, including weekends'
])

// Copy account number
const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(accountNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// SEO Configuration
useHead({
  title: 'Virtual Account - Rechargify | Your Dedicated Account Number',
  meta: [
    {
      name: 'description',
      content: 'Access your Rechargify virtual account. Receive instant payments from any Nigerian bank directly to your wallet.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>