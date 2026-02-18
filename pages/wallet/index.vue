<!-- pages/wallet/index.vue -->
<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Fund Wallet</h1>
        <p class="text-gray-600">Add money to your Rechargify wallet securely</p>
      </div>

      <!-- Loading State -->
      <div v-if="isPageLoading" class="flex items-center justify-center py-20">
        <Loader2 :size="40" class="animate-spin text-[#0066FF]" />
      </div>

      <!-- No Virtual Account -->
      <div v-else-if="!hasVirtualAccount" class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard :size="36" class="text-[#0066FF]" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">No Virtual Account Yet</h2>
          <p class="text-gray-500 mb-8">
            You need a virtual account before you can fund your wallet.
          </p>
          <NuxtLink
            to="/virtual-account"
            class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-semibold hover:bg-[#0052CC] transition flex items-center justify-center gap-2"
          >
            Create Virtual Account
            <ArrowRight :size="18" />
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">

          <!-- Step 1 -->
          <FundWalletStepOne
            v-if="step === 1"
            v-model="amount"
            @next="step = 2"
          />

          <!-- Step 2 -->
          <FundWalletStepTwo
            v-if="step === 2"
            :amount="amount"
            :accounts="virtualAccounts"
            :account-name="accountName"
            v-model:selected-bank="selectedBankIndex"
            :is-pay-loading="isPayLoading"
            @pay="handleMonnifyCheckout"
            @back="step = 1"
          />

        </div>

        <!-- Sidebar -->
        <FundWalletSidebar
          :balance="balance"
          :is-loading="isBalanceLoading"
          :step="step"
          @refresh="fetchBalance"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { CreditCard, ArrowRight, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const toast = useToast()

const step = ref(1)
const amount = ref(0)
const isPageLoading = ref(true)
const isBalanceLoading = ref(false)
const isPayLoading = ref(false)
const hasVirtualAccount = ref(false)
const virtualAccounts = ref([])
const accountName = ref('')
const balance = ref(0)
const selectedBankIndex = ref(0)

// Load Monnify SDK
useHead({
  script: [
    {
      src: 'https://sdk.monnify.com/plugin/monnify.js',
      defer: true
    }
  ]
})

const fetchVirtualAccount = async () => {
  try {
    const response = await $fetch('/api/monnify/get-virtual-account')
    hasVirtualAccount.value = response.hasAccount
    if (response.hasAccount) {
      virtualAccounts.value = response.data.accounts
      accountName.value = response.data.accountName
    }
  } catch (error) {
    toast.error('Failed to load account details')
  }
}

const fetchBalance = async () => {
  isBalanceLoading.value = true
  try {
    const response = await $fetch('/api/wallet/balance')
    if (response.success) {
      balance.value = response.data.balance
    }
  } catch (error) {
    console.error('Failed to fetch balance:', error)
  } finally {
    isBalanceLoading.value = false
  }
}

const handleMonnifyCheckout = async () => {
  isPayLoading.value = true

  try {
    // Get payment details from backend
    const response = await $fetch('/api/monnify/initialize-payment', {
      method: 'POST',
      body: { amount: amount.value }
    })

    if (!response.success) return

    const { apiKey, contractCode, paymentReference, customerName, customerEmail, paymentDescription } = response.data

    isPayLoading.value = false

    // Open Monnify checkout
    const MonnifySDK = window.MonnifySDK || {};

MonnifySDK.initialize({
  amount: amount.value,
  currency: 'NGN',
  reference: paymentReference,
  customerFullName: customerName,
  customerEmail,
  apiKey,
  contractCode,
  paymentDescription,
  isTestMode: true,
  paymentMethods: ['CARD', 'ACCOUNT_TRANSFER', 'USSD', 'PHONE_NUMBER'],
  onLoadStart: function() {
    console.log('Monnify checkout loading...')
  },
  onLoadComplete: function() {
    console.log('Monnify checkout ready')
  },
  onComplete: function(response) {
    (async () => {
      if (response.paymentStatus === 'PAID') {
        await verifyPayment(response.transactionReference)
      } else {
        toast.error('Payment was not completed')
      }
    })()
  },
  onClose: function(data) {
    console.log('Monnify checkout closed', data)
  }
})

  } catch (error) {
    toast.error(error.data?.message || 'Failed to initialize payment')
    isPayLoading.value = false
  }
}

const verifyPayment = async (transactionReference) => {
  try {
    const response = await $fetch('/api/monnify/verify-payment', {
      method: 'POST',
      body: { transactionReference }
    })

    if (response.success) {
      await fetchBalance()
      toast.success(`Wallet funded successfully! ₦${amount.value.toLocaleString()} added.`)
      step.value = 1
      amount.value = 0
    }
  } catch (error) {
    toast.error(error.data?.message || 'Payment verification failed')
  }
}

onMounted(async () => {
  await Promise.all([fetchVirtualAccount(), fetchBalance()])
  isPageLoading.value = false
})
</script>