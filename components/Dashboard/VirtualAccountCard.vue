<!-- components/Dashboard/VirtualAccountCard.vue -->
<template>
  <div class="bg-[#0066FF] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg h-full">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" stroke-width="2"/>
            <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="white" stroke-width="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
      <div class="absolute top-0 left-0 w-32 h-32 border-4 border-white transform rotate-45 -translate-x-16 -translate-y-16"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 border-4 border-white transform rotate-12 translate-x-20 translate-y-20"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <CreditCard :size="24" class="text-white" />
          </div>
          <div>
            <p class="text-white/80 text-sm font-medium">Virtual Account</p>
            <p class="text-white text-xs">Rechargify</p>
          </div>
        </div>
        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Building :size="20" class="text-white" />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <Loader2 :size="28" class="text-white/70 animate-spin" />
      </div>

      <!-- No Account State -->
      <div v-else-if="!hasAccount" class="flex-1 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
          <Plus :size="28" class="text-white" />
        </div>
        <p class="text-white font-semibold mb-1">No Virtual Account</p>
        <p class="text-white/70 text-sm mb-6">Create your dedicated bank account to receive payments</p>
        <NuxtLink
          to="/virtual-account"
          class="bg-white text-[#0066FF] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition active:scale-95"
        >
          Create Account
        </NuxtLink>
      </div>

      <!-- Has Account State -->
      <template v-else>
        <div class="flex-1 flex flex-col justify-center mb-8">
          <div class="mb-6">
            <p class="text-white/80 text-sm mb-2">Bank Name</p>
            <p class="text-xl font-semibold">{{ primaryAccount?.bankName }}</p>
          </div>

          <div class="mb-4">
            <p class="text-white/80 text-sm mb-2">Account Number</p>
            <div class="flex items-center gap-3">
              <p class="text-3xl font-bold tracking-wider">{{ primaryAccount?.accountNumber }}</p>
              <button
                @click="copyAccountNumber"
                class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                :class="{ 'bg-green-500/30': copied }"
              >
                <Check v-if="copied" :size="18" class="text-white" />
                <Copy v-else :size="18" class="text-white" />
              </button>
            </div>
          </div>

          <div>
            <p class="text-white/80 text-sm mb-2">Account Name</p>
            <p class="text-base font-medium">{{ accountData?.accountName }}</p>
          </div>
        </div>

        <!-- Info Banner -->
        <div class="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 flex items-start gap-3">
          <Info :size="18" class="text-white/80 flex-shrink-0 mt-0.5" />
          <p class="text-white/90 text-xs leading-relaxed">
            Transfer funds to this account to automatically credit your wallet
          </p>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { CreditCard, Building, Copy, Check, Info, Plus, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification';


const toast = useToast()
const isLoading = ref(true)
const hasAccount = ref(false)
const accountData = ref(null)
const copied = ref(false)

const primaryAccount = computed(() => {
  return accountData.value?.accounts?.[0] || null
})

const fetchVirtualAccount = async () => {
  try {
    const response = await $fetch('/api/monnify/get-virtual-account')
    hasAccount.value = response.hasAccount
    if (response.hasAccount) {
      accountData.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch virtual account:', error)
  } finally {
    isLoading.value = false
  }
}

const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(primaryAccount.value.accountNumber)
    copied.value = true
    toast.success('Account number copied!')
    setTimeout(() => copied.value = false, 2000)
  } catch {
    toast.error('Failed to copy')
  }
}

onMounted(() => {
  fetchVirtualAccount()
})
</script>