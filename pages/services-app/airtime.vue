<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Buy Airtime</h1>
        <p class="text-gray-600">Recharge airtime for any network instantly</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          
          <div v-if="currentStep === 1" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Select Network</label>
                <div class="relative">
                  <select v-model="form.network" class="appearance-none block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-colors cursor-pointer">
                    <option value="" disabled>Select a network</option>
                    <option value="mtn">MTN</option>
                    <option value="glo">Glo</option>
                    <option value="airtel">Airtel</option>
                    <option value="9mobile">9mobile</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="20" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="080XXXXXXXX" class="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Amount (₦)</label>
                <input v-model="form.amount" type="number" placeholder="Enter amount" class="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" />
                
                <div class="mt-4">
                  <div class="text-sm font-medium text-gray-700 mb-3">Quick Select</div>
                  <div class="grid grid-cols-3 gap-3">
                    <button 
                      v-for="amt in quickAmounts" :key="amt"
                      @click="form.amount = amt"
                      class="px-4 py-3 rounded-lg border-2 font-semibold transition-all"
                      :class="form.amount === amt ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-100 text-gray-700 hover:border-gray-200'"
                    >
                      ₦{{ amt }}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                @click="currentStep = 2"
                :disabled="!isFormValid"
                class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50"
              >
                Continue <ArrowRight :size="20" />
              </button>
            </div>
          </div>

          <div v-if="currentStep === 2" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Confirm Purchase</h2>
            <div class="space-y-4 mb-8">
              <div class="flex justify-between py-3 border-b border-gray-50">
                <span class="text-gray-500">Network</span>
                <span class="font-bold text-gray-900 uppercase">{{ form.network }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-50">
                <span class="text-gray-500">Phone Number</span>
                <span class="font-bold text-gray-900">{{ form.phone }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-50">
                <span class="text-gray-500">Amount</span>
                <span class="font-bold text-gray-900">₦{{ Number(form.amount).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-4 bg-blue-50 rounded-xl px-4 mt-4">
                <span class="font-bold text-gray-900">Total</span>
                <span class="font-extrabold text-[#0066FF] text-xl">₦{{ Number(form.amount).toLocaleString() }}</span>
              </div>
            </div>

            <div class="flex gap-3">
              <button @click="currentStep = 1" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Back</button>
              <button @click="processPayment" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold hover:bg-[#0052CC] transition-all">Confirm & Pay</button>
            </div>
          </div>

          <div v-if="currentStep === 'processing'" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[450px] transition-all">
            <div class="relative w-24 h-24 mb-6">
              <div class="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Smartphone class="text-[#0066FF] animate-pulse" :size="32" />
              </div>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p class="text-gray-500">Please wait while we process your request...</p>
          </div>

          <div v-if="currentStep === 3" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center animate-in zoom-in duration-300">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CircleCheckBig class="text-green-600" :size="40" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Purchase Successful!</h2>
            <p class="text-gray-600 mb-1">₦{{ Number(form.amount).toLocaleString() }} airtime has been sent to</p>
            <p class="text-xl font-bold text-gray-900 mb-8">{{ form.phone }}</p>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="resetForm" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Buy Again</button>
              <NuxtLink to="/transactions" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold flex items-center justify-center hover:bg-[#0052CC] transition-all shadow-lg shadow-blue-100">
                View Transactions
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <WalletBalance />

          <div class="bg-green-50 border border-green-100 rounded-xl p-6">
            <h3 class="font-bold text-gray-900 mb-4">Benefits</h3>
            <div class="space-y-4">
              <div v-for="benefit in benefits" :key="benefit" class="flex items-start gap-3">
                <CircleCheckBig class="text-green-600 shrink-0 mt-0.5" :size="18" />
                <span class="text-sm text-gray-700 font-medium">{{ benefit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDown, ArrowRight, CircleCheckBig, Smartphone } from 'lucide-vue-next'
import WalletBalance from '~/components/WalletBalance.vue'

definePageMeta({ layout: 'dashboard' })

const currentStep = ref(1)
const quickAmounts = [100, 200, 500, 1000, 2000, 5000]
const benefits = [
  'Instant delivery',
  'All networks supported',
  '3% cashback on purchases'
]

const form = ref({
  network: '',
  phone: '',
  amount: ''
})

const isFormValid = computed(() => {
  return form.value.network && form.value.phone.length >= 10 && form.value.amount > 0
})

const processPayment = async () => {
  // Set to processing state
  currentStep.value = 'processing'
  
  // Simulate 3 second delay for "Realness"
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Logic for API call success
  currentStep.value = 3
}

const resetForm = () => {
  form.value = { network: '', phone: '', amount: '' }
  currentStep.value = 1
}
</script>