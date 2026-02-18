<!-- components/FundWallet/StepTwo.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
      <p class="text-gray-600">
        Fund your wallet with <strong>₦{{ Number(amount).toLocaleString() }}</strong>
      </p>
    </div>

    <!-- Option 1: Bank Transfer -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <div class="h-px flex-1 bg-gray-100"></div>
        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bank Transfer</span>
        <div class="h-px flex-1 bg-gray-100"></div>
      </div>

      <!-- Bank Tabs -->
      <div class="flex gap-2 mb-4">
        <button
          v-for="(account, i) in accounts"
          :key="i"
          @click="$emit('update:selectedBank', i)"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          :class="selectedBank === i ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ account.bankName }}
        </button>
      </div>

      <!-- Account Card -->
      <div class="bg-[#0066FF] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

        <div class="space-y-5 relative z-10">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-blue-100 text-xs uppercase tracking-wider font-semibold mb-1">Account Number</p>
              <p class="text-3xl font-mono font-bold tracking-tight">{{ selectedAccount?.accountNumber }}</p>
            </div>
            <button
              @click="copyAccountNumber"
              class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl flex items-center justify-center transition-all active:scale-95"
              :class="{ 'bg-green-500/40': copied }"
            >
              <Check v-if="copied" :size="22" class="text-white" />
              <Copy v-else :size="22" class="text-white" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
            <div>
              <p class="text-blue-100 text-[10px] uppercase font-semibold">Bank Name</p>
              <p class="font-bold">{{ selectedAccount?.bankName }}</p>
            </div>
            <div>
              <p class="text-blue-100 text-[10px] uppercase font-semibold">Account Name</p>
              <p class="font-bold truncate">{{ accountName }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
        <Info :size="18" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
        <p class="text-sm text-gray-600">
          Transfer exactly <strong>₦{{ Number(amount).toLocaleString() }}</strong>. Your wallet will be credited automatically once confirmed.
        </p>
      </div>
    </div>

    <!-- Divider -->
    <div class="flex items-center gap-3 my-6">
      <div class="h-px flex-1 bg-gray-200"></div>
      <span class="text-sm font-semibold text-gray-400">OR</span>
      <div class="h-px flex-1 bg-gray-200"></div>
    </div>

    <!-- Option 2: Monnify Checkout -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-4">
        <div class="h-px flex-1 bg-gray-100"></div>
        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pay Online</span>
        <div class="h-px flex-1 bg-gray-100"></div>
      </div>

      <button
        @click="$emit('pay')"
        :disabled="isPayLoading"
        class="w-full h-14 bg-gray-900 text-white rounded-lg font-medium text-base flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:opacity-50 active:scale-[0.98]"
      >
        <Loader2 v-if="isPayLoading" :size="20" class="animate-spin" />
        <CreditCard v-else :size="20" />
        {{ isPayLoading ? 'Loading...' : 'Pay with Card / USSD' }}
      </button>
      <p class="text-xs text-center text-gray-400 mt-2">Secured by Monnify • Card, USSD & more</p>
    </div>

    <!-- Back Button -->
    <button
      @click="$emit('back')"
      class="w-full h-12 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all active:scale-[0.98]"
    >
      Back
    </button>
  </div>
</template>

<script setup>
import { Copy, Check, Info, CreditCard, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification';


const props = defineProps({
  amount: Number,
  accounts: Array,
  accountName: String,
  selectedBank: Number,
  isPayLoading: Boolean
})

const emit = defineEmits(['update:selectedBank', 'pay', 'back'])
const toast = useToast()
const copied = ref(false)

const selectedAccount = computed(() => {
  return props.accounts?.[props.selectedBank] || null
})

const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(selectedAccount.value.accountNumber)
    copied.value = true
    toast.success('Account number copied!')
    setTimeout(() => copied.value = false, 2000)
  } catch {
    toast.error('Failed to copy')
  }
}
</script>