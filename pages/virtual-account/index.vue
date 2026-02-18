<!-- pages/virtual-account/index.vue -->
<template>
  <div>
    <main class="p-4 sm:p-6 lg:p-8">
      <div class="max-w-5xl mx-auto space-y-8">

        <!-- Page Header -->
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Virtual Account</h1>
          <p class="text-gray-600">Your dedicated account number for receiving payments</p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-20">
          <Loader2 :size="40" class="animate-spin text-[#0066FF]" />
        </div>

        <!-- No Virtual Account - BVN Form -->
        <div v-else-if="!hasAccount" class="max-w-md mx-auto">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard :size="36" class="text-[#0066FF]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Create Virtual Account</h2>
            <p class="text-gray-500 mb-8">
              Get a dedicated bank account number to fund your Rechargify wallet instantly.
            </p>

            <form @submit.prevent="handleCreateAccount" class="space-y-5 text-left">

              <!-- Error -->
              <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>

              <!-- BVN Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Verification Number (BVN)
                </label>
                <input
                  v-model="bvn"
                  type="text"
                  maxlength="11"
                  placeholder="Enter your 11-digit BVN"
                  required
                  class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
                />
                <p class="text-xs text-gray-500 mt-1">Dial *565*0# to get your BVN</p>
              </div>

              <!-- NIN Field (NEW - add after BVN field) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">
                  National Identification Number (NIN)
                </label>
                <input
                  v-model="nin"
                  type="text"
                  maxlength="11"
                  placeholder="Enter your 11-digit NIN"
                  required
                  class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] hover:border-gray-300"
                />
                <p class="text-xs text-gray-500 mt-1">Dial *346# to get your NIN</p>
              </div>

              <!-- Security Note -->
              <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <ShieldCheck :size="18" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
                <p class="text-xs text-gray-600">
                  Your BVN is only used for identity verification and is never stored in plain text. It's fully encrypted and secure.
                </p>
              </div>

              <button
                type="submit"
                :disabled="isCreating || bvn.length !== 11 || nin.length !== 11"  
                class="w-full bg-[#0066FF] text-white py-3 rounded-lg font-semibold hover:bg-[#0052CC] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Loader2 v-if="isCreating" :size="20" class="animate-spin" />
                {{ isCreating ? 'Creating Account...' : 'Create Virtual Account' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Has Virtual Account -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Account Card -->
            <div class="bg-[#0066FF] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
              <div class="absolute inset-0 opacity-10">
                <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="waves-page" width="100" height="100" patternUnits="userSpaceOnUse">
                      <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" stroke-width="2"/>
                      <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="white" stroke-width="1.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#waves-page)" />
                </svg>
                <div class="absolute top-0 right-0 w-64 h-64 border-4 border-white rounded-full -translate-y-32 translate-x-32"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 border-4 border-white rounded-full translate-y-32 -translate-x-32"></div>
              </div>

              <div class="relative z-10">
                <div class="flex items-center justify-between mb-6 sm:mb-8">
                  <div class="flex items-center gap-2">
                    <Building2 :size="20" class="text-blue-200" />
                    <span class="text-blue-100 font-medium">Virtual Account</span>
                  </div>
                  <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">Active</span>
                </div>

                <!-- Show first account by default, tab for multiple -->
                <div v-if="selectedAccount" class="space-y-5">
                  <div>
                    <p class="text-blue-100 text-sm mb-1.5">Bank Name</p>
                    <p class="text-2xl font-bold">{{ selectedAccount.bankName }}</p>
                  </div>

                  <div>
                    <p class="text-blue-100 text-sm mb-1.5">Account Number</p>
                    <div class="flex items-center gap-4">
                      <p class="text-3xl font-bold tracking-wider">{{ selectedAccount.accountNumber }}</p>
                      <button
                        @click="copyAccountNumber(selectedAccount.accountNumber)"
                        class="bg-white text-[#0066FF] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-white/90 transition"
                      >
                        <Check v-if="copied" :size="16" />
                        <Copy v-else :size="16" />
                        {{ copied ? 'Copied' : 'Copy' }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p class="text-blue-100 text-sm mb-1.5">Account Name</p>
                    <p class="text-xl font-semibold">{{ accountData.accountName }}</p>
                  </div>
                </div>

                <!-- Bank Tabs if multiple accounts -->
                <div v-if="accountData.accounts.length > 1" class="flex gap-2 mt-6">
                  <button
                    v-for="(acc, i) in accountData.accounts"
                    :key="i"
                    @click="selectedAccountIndex = i"
                    class="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    :class="selectedAccountIndex === i ? 'bg-white text-[#0066FF]' : 'bg-white/20 text-white'"
                  >
                    {{ acc.bankName }}
                  </button>
                </div>
              </div>
            </div>

            <!-- How to Use -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">How to Use Your Virtual Account</h2>
              <div class="space-y-6">
                <div v-for="(step, i) in steps" :key="i" class="flex gap-4">
                  <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[#0066FF]">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">{{ step.title }}</h3>
                    <p class="text-gray-600">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">

            <!-- Quick Actions -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 class="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <NuxtLink to="/wallet" class="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:border-[#0066FF]/30 hover:bg-blue-50/50 transition text-sm font-medium text-gray-700">
                  Wallet <ArrowRight :size="16" />
                </NuxtLink>
                <NuxtLink to="/transactions" class="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:border-[#0066FF]/30 hover:bg-blue-50/50 transition text-sm font-medium text-gray-700">
                  View Transactions <ArrowRight :size="16" />
                </NuxtLink>
              </div>
            </div>

            <!-- Important Note -->
            <div class="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <div class="flex items-start gap-3">
                <Info :size="20" class="text-[#0066FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">Important Note</h3>
                  <p class="text-sm text-gray-600">
                    This account number is unique to you and can only be used to fund your Rechargify wallet.
                  </p>
                </div>
              </div>
            </div>

            <!-- Benefits -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 class="font-semibold text-gray-900 mb-4">Benefits</h3>
              <div class="space-y-3">
                <div v-for="(benefit, i) in benefits" :key="i" class="flex items-start gap-2">
                  <CircleCheckBig :size="18" class="text-green-600 flex-shrink-0 mt-0.5" />
                  <span class="text-sm text-gray-600">{{ benefit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Building2, CreditCard, Copy, Check, CircleCheckBig, ArrowRight, Info, ShieldCheck, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const toast = useToast()
const isLoading = ref(true)
const isCreating = ref(false)
const hasAccount = ref(false)
const accountData = ref(null)
const bvn = ref('')
const errorMessage = ref('')
const copied = ref(false)
const selectedAccountIndex = ref(0)
const nin = ref('')

const selectedAccount = computed(() => {
  if (!accountData.value?.accounts?.length) return null
  return accountData.value.accounts[selectedAccountIndex.value]
})

const steps = [
  { title: 'Share Your Account Details', description: 'Share your virtual account number with anyone who wants to send you money. They can transfer from any Nigerian bank.' },
  { title: 'Receive Instant Credit', description: 'Once the transfer is made, your Rechargify wallet is credited instantly. No waiting, no delays.' },
  { title: 'Start Spending', description: 'Use your wallet balance to pay bills, buy airtime, or make purchases instantly.' }
]

const benefits = [
  'Receive payments from anyone in Nigeria',
  'Instant credit to your wallet',
  'No transaction fees for incoming transfers',
  'Works with all Nigerian banks',
  'Available 24/7'
]

const fetchVirtualAccount = async () => {
  try {
    const response = await $fetch('/api/monnify/get-virtual-account')
    hasAccount.value = response.hasAccount
    if (response.hasAccount) {
      accountData.value = response.data
    }
  } catch (error) {
    toast.error('Failed to load virtual account')
  } finally {
    isLoading.value = false
  }
}

const handleCreateAccount = async () => {
  isCreating.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/monnify/create-virtual-account', {
      method: 'POST',
      body: { 
        bvn: bvn.value,
        nin: nin.value      // ← add this
      }
    })

    if (response.success) {
      toast.success('Virtual account created successfully!')
      await fetchVirtualAccount()
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to create virtual account'
  } finally {
    isCreating.value = false
  }
}

const copyAccountNumber = async (number) => {
  try {
    await navigator.clipboard.writeText(number)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch {
    toast.error('Failed to copy account number')
  }
}

onMounted(() => {
  fetchVirtualAccount()
})

useHead({
  title: 'Virtual Account - Rechargify',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>