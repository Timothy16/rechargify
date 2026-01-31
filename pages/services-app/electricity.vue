<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Pay Electricity Bill</h1>
        <p class="text-gray-600">Pay for electricity across all distribution companies</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          
          <div v-if="currentStep === 1" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all duration-300">
            <div class="space-y-6">
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Select Provider</label>
                <div class="relative">
                  <select v-model="form.provider" class="block w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-gray-900 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]">
                    <option value="" disabled>Select provider</option>
                    <option v-for="disco in discos" :key="disco.id" :value="disco">{{ disco.name }}</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Meter Type</label>
                <div class="relative">
                  <select v-model="form.meterType" class="block w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-gray-900 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]">
                    <option value="prepaid">Prepaid Meter</option>
                    <option value="postpaid">Postpaid Meter</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Meter Number</label>
                <input v-model="form.meterNumber" type="text" placeholder="Enter your meter number" class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" />
                <p class="mt-1.5 text-sm text-gray-500">11-digit meter number</p>
              </div>

              <div class="space-y-4">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Amount (₦)</label>
                  <input v-model.number="form.amount" type="number" placeholder="Enter amount" class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-700 mb-3">Quick Select</div>
                  <div class="grid grid-cols-3 gap-3">
                    <button v-for="val in quickAmounts" :key="val" @click="form.amount = val" class="px-2 py-3 rounded-lg border-2 font-semibold transition-all text-sm sm:text-base" :class="form.amount === val ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-200 text-gray-700 hover:border-gray-300'">
                      ₦{{ val.toLocaleString() }}
                    </button>
                  </div>
                </div>
              </div>

              <button @click="currentStep = 2" :disabled="!isFormValid" class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50">
                Continue <ArrowRight :size="20" />
              </button>
            </div>
          </div>

          <div v-if="currentStep === 2" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 animate-in slide-in-from-right-4 duration-300">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Confirm Payment</h2>
            <div class="space-y-4 mb-8">
              <div class="flex justify-between py-3 border-b border-gray-100">
                <span class="text-gray-600">Provider</span>
                <span class="font-semibold text-gray-900">{{ form.provider?.name }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <span class="text-gray-600">Meter Type</span>
                <span class="font-semibold text-gray-900 capitalize">{{ form.meterType }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <span class="text-gray-600">Meter Number</span>
                <span class="font-semibold text-gray-900 break-all ml-4 text-right">{{ form.meterNumber }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <span class="text-gray-600">Customer Name</span>
                <span class="font-semibold text-gray-900">John Doe</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <span class="text-gray-600">Amount</span>
                <span class="font-bold text-gray-900">₦{{ form.amount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-4 bg-blue-50 rounded-lg px-4 mt-4">
                <span class="font-semibold text-gray-900">Total</span>
                <span class="font-bold text-[#0066FF] text-xl">₦{{ form.amount.toLocaleString() }}</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="currentStep = 1" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Back</button>
              <button @click="handlePayment" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold hover:bg-[#0052CC] transition-all">Confirm & Pay</button>
            </div>
          </div>

          <div v-if="currentStep === 'processing'" class="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div class="relative w-24 h-24 mb-6">
              <div class="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Zap class="text-[#0066FF] animate-pulse" :size="32" />
              </div>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p class="text-gray-500">Communicating with {{ form.provider?.name }}...</p>
          </div>

          <div v-if="currentStep === 3" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center animate-in zoom-in duration-300">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CircleCheckBig class="text-green-600" :size="40" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
            <p class="text-gray-600 mb-2">₦{{ form.amount.toLocaleString() }} has been credited to</p>
            <p class="text-xl font-semibold text-gray-900 mb-2">Meter: {{ form.meterNumber }}</p>
            <p class="text-gray-600 mb-8">John Doe</p>

            <div v-if="form.meterType === 'prepaid'" class="bg-gray-50 rounded-lg p-4 mb-8">
              <div class="text-sm text-gray-600 mb-1">Token</div>
              <div class="text-2xl font-mono font-bold text-gray-900 tracking-wider">3646-0014-4699-3311</div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="resetForm" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Pay Again</button>
              <NuxtLink to="/transactions" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold flex items-center justify-center hover:bg-[#0052CC] transition-all">
                View Transactions
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-sm">
            <div class="flex items-center gap-3 mb-4"><Wallet :size="20" class="text-gray-400" /> <span class="text-gray-400 text-sm">Wallet Balance</span></div>
            <div class="text-3xl font-bold">₦254,350.00</div>
          </div>

          <div class="bg-orange-50 border border-orange-100 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <Info class="text-orange-600 flex-shrink-0 mt-0.5" :size="20" />
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Important Note</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Please ensure your meter number is correct. Payments to incorrect numbers are non-reversible.</p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Benefits</h3>
            <div class="space-y-3 text-sm">
              <div v-for="benefit in benefits" :key="benefit" class="flex items-start gap-2">
                <CircleCheckBig class="text-yellow-600 flex-shrink-0 mt-0.5" :size="16" />
                <span class="text-gray-700">{{ benefit }}</span>
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
import { ChevronDown, ArrowRight, CircleCheckBig, Wallet, Info, Zap } from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const currentStep = ref(1)
const form = ref({
  provider: null,
  meterType: 'prepaid',
  meterNumber: '',
  amount: ''
})

const discos = [
  { id: 'ekedc', name: 'Eko Electricity (EKEDC)' },
  { id: 'ikedc', name: 'Ikeja Electric (IKEDC)' },
  { id: 'aedc', name: 'Abuja Electricity (AEDC)' },
  { id: 'phed', name: 'Port Harcourt Electric (PHED)' },
  { id: 'ibedc', name: 'Ibadan Electricity (IBEDC)' },
  { id: 'kedco', name: 'Kano Electricity (KEDCO)' }
]

const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000]
const benefits = ['Instant token generation', 'All DISCOs supported', 'Zero service fees', '24/7 availability']

const isFormValid = computed(() => {
  return form.value.provider && 
         form.value.meterNumber.length >= 8 && 
         form.value.amount >= 100
})

const handlePayment = async () => {
  currentStep.value = 'processing'
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 3000))
  currentStep.value = 3
}

const resetForm = () => {
  form.value = { provider: null, meterType: 'prepaid', meterNumber: '', amount: '' }
  currentStep.value = 1
}
</script>

<style scoped>
.animate-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>