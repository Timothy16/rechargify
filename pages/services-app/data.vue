<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Buy Data Bundle</h1>
        <p class="text-gray-600">Purchase affordable data plans for any network</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          
          <div v-if="currentStep === 1" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all">
            <div class="space-y-6">
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Select Network</label>
                <div class="relative">
                  <select v-model="form.network" class="block w-full rounded-lg border border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]">
                    <option value="" disabled>Select network</option>
                    <option value="mtn">MTN</option>
                    <option value="glo">Glo</option>
                    <option value="airtel">Airtel</option>
                    <option value="9mobile">9mobile</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="080XXXXXXXX" class="block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Select Data Plan</label>
                <div class="grid grid-cols-2 gap-4">
                  <button 
                    v-for="plan in dataPlans" :key="plan.id"
                    @click="form.plan = plan"
                    class="p-4 rounded-xl border-2 text-left transition-all"
                    :class="form.plan?.id === plan.id ? 'border-[#0066FF] bg-blue-50/50' : 'border-gray-100 hover:border-gray-300'"
                  >
                    <div class="font-bold text-gray-900 text-lg mb-1">{{ plan.size }}</div>
                    <div class="text-sm text-gray-600 mb-2">{{ plan.validity }}</div>
                    <div class="font-bold text-[#0066FF]">₦{{ plan.price.toLocaleString() }}</div>
                  </button>
                </div>
              </div>

              <button @click="currentStep = 2" :disabled="!isFormValid" class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50">
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
                <span class="text-gray-500">Plan</span>
                <span class="font-bold text-gray-900">{{ form.plan?.size }} ({{ form.plan?.validity }})</span>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-50">
                <span class="text-gray-500">Phone Number</span>
                <span class="font-bold text-gray-900">{{ form.phone }}</span>
              </div>
              <div class="flex justify-between py-4 bg-blue-50 rounded-xl px-4 mt-4">
                <span class="font-bold text-gray-900">Total</span>
                <span class="font-extrabold text-[#0066FF] text-xl">₦{{ form.plan?.price.toLocaleString() }}</span>
              </div>
            </div>
            <div class="flex gap-3">
              <button @click="currentStep = 1" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Back</button>
              <button @click="processPayment" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold hover:bg-[#0052CC] transition-all">Confirm & Pay</button>
            </div>
          </div>

          <div v-if="currentStep === 'processing'" class="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
            <div class="relative w-24 h-24 mb-6">
              <div class="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Wifi class="text-[#0066FF] animate-pulse" :size="32" />
              </div>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Activating Data</h2>
            <p class="text-gray-500 italic">Verifying with network provider...</p>
          </div>

          <div v-if="currentStep === 3" class="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center animate-in zoom-in duration-300">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CircleCheckBig class="text-green-600" :size="40" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Purchase Successful!</h2>
            <p class="text-gray-600 mb-2">{{ form.plan?.size }} data bundle has been sent to</p>
            <p class="text-xl font-semibold text-gray-900 mb-8">{{ form.phone }}</p>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="resetForm" class="flex-1 h-14 border border-[#0066FF] text-[#0066FF] rounded-lg font-bold hover:bg-blue-50 transition-all">Buy Again</button>
              <NuxtLink to="/transactions" class="flex-1 h-14 bg-[#0066FF] text-white rounded-lg font-bold flex items-center justify-center hover:bg-[#0052CC] transition-all shadow-lg shadow-blue-100">
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
          <div class="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Benefits</h3>
            <div class="space-y-3 text-sm">
              <div v-for="benefit in benefits" :key="benefit" class="flex items-start gap-2">
                <CircleCheckBig class="text-purple-600 flex-shrink-0 mt-0.5" :size="16" />
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
import { ChevronDown, ArrowRight, CircleCheckBig, Wallet, Wifi } from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const currentStep = ref(1)
const form = ref({ network: '', phone: '', plan: null })
const dataPlans = [
  { id: 1, size: '1GB', validity: '1 Day', price: 300 },
  { id: 2, size: '2GB', validity: '2 Days', price: 500 },
  { id: 3, size: '3GB', validity: '7 Days', price: 1000 },
  { id: 4, size: '5GB', validity: '7 Days', price: 1500 },
  { id: 5, size: '10GB', validity: '30 Days', price: 2500 },
  { id: 6, size: '20GB', validity: '30 Days', price: 4500 }
]
const benefits = ['Instant activation', 'Discounted rates', 'All networks supported', 'Auto-renewal available']

const isFormValid = computed(() => form.value.network && form.value.phone.length >= 10 && form.value.plan)

const processPayment = async () => {
  currentStep.value = 'processing'
  await new Promise(resolve => setTimeout(resolve, 3000))
  currentStep.value = 3
}

const resetForm = () => {
  form.value = { network: '', phone: '', plan: null }
  currentStep.value = 1
}
</script>

<style scoped>
.animate-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>