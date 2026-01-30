<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Fund Wallet</h1>
        <p class="text-gray-600">Add money to your Rechargify wallet securely</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          
          <div v-if="step === 1" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Enter Amount</h2>
              <p class="text-gray-600">How much would you like to add?</p>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Amount (₦)</label>
              <input 
                v-model="amount"
                type="number" 
                placeholder="0.00"
                class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-2xl font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-colors"
              />
            </div>

            <div class="mb-8">
              <div class="text-sm font-medium text-gray-700 mb-3">Quick Select</div>
              <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
                <button 
                  v-for="preset in presets" 
                  :key="preset"
                  @click="amount = preset"
                  class="px-4 py-3 rounded-lg border-2 font-semibold transition-all"
                  :class="amount === preset ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]' : 'border-gray-100 text-gray-700 hover:border-gray-200'"
                >
                  ₦{{ preset.toLocaleString() }}
                </button>
              </div>
            </div>

            <button 
              @click="step = 2"
              :disabled="!amount || amount <= 0"
              class="w-full h-14 bg-[#0066FF] text-white rounded-lg font-medium text-lg flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              Continue <ArrowRight :size="20" />
            </button>
          </div>

          <div v-if="step === 2" class="bg-white rounded-xl border border-gray-100 shadow-sm p-8 transition-all">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Bank Transfer</h2>
              <p class="text-gray-600">Transfer ₦{{ Number(amount).toLocaleString() }} to your unique virtual account</p>
            </div>

            <div class="bg-[#0066FF] rounded-2xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
              <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              
              <div class="space-y-6 relative z-10">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-blue-100 text-xs uppercase tracking-wider font-semibold mb-1">Account Number</p>
                    <p class="text-3xl font-mono font-bold tracking-tight">{{ accountNumber }}</p>
                  </div>
                  <button 
                    @click="copyAccountNumber"
                    class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-inner"
                    :class="{ 'bg-green-500/40': copied }"
                  >
                    <Check v-if="copied" :size="22" class="text-white" />
                    <Copy v-else :size="22" class="text-white" />
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p class="text-blue-100 text-[10px] uppercase font-semibold">Bank Name</p>
                    <p class="font-bold">Wema Bank</p>
                  </div>
                  <div>
                    <p class="text-blue-100 text-[10px] uppercase font-semibold">Account Name</p>
                    <p class="font-bold truncate">Rechargify-JOHN DOE</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              @click="step = 1"
              class="w-full h-14 border border-gray-200 text-gray-600 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Back
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
            <div class="flex items-center gap-3 mb-4 text-gray-400">
              <Wallet :size="20" />
              <span class="text-sm">Current Balance</span>
            </div>
            <div class="text-3xl font-bold">₦254,350.00</div>
          </div>

          <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div class="flex items-start gap-3 text-[#0066FF]">
              <Shield :size="24" class="shrink-0" />
              <p class="text-sm text-gray-600">
                Bank transfer funding is instant. Once your transfer is confirmed, your wallet will be updated automatically.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-4">Steps</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :class="step === 1 ? 'bg-[#0066FF] text-white' : 'bg-green-100 text-green-600'"
                >
                  <Check v-if="step > 1" :size="16" />
                  <span v-else>1</span>
                </div>
                <span class="text-sm font-semibold" :class="step === 1 ? 'text-gray-900' : 'text-gray-500'">Enter Amount</span>
              </div>

              <div class="flex items-center gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :class="step === 2 ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-400'"
                >
                  2
                </div>
                <span class="text-sm font-semibold" :class="step === 2 ? 'text-gray-900' : 'text-gray-400'">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { 
  ArrowRight, 
  Wallet, 
  Shield, 
  Check, 
  Copy 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const step = ref(1)
const amount = ref('')
const copied = ref(false)
const accountNumber = ref('0123456789')
const presets = [1000, 5000, 10000, 20000, 50000]

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
</script>