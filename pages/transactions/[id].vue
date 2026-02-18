<!-- pages/transactions/[id].vue -->
<template>
  <div class="max-w-2xl mx-auto p-4 md:py-8">

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <Loader2 :size="40" class="animate-spin text-[#0066FF]" />
    </div>

    <!-- Content -->
    <template v-else-if="transaction">
      <div class="flex items-center justify-between mb-6">
        <button @click="$router.back()" class="flex items-center text-gray-600 hover:text-gray-900 transition text-sm font-medium">
          <ChevronLeft :size="20" />
          Back to Transactions
        </button>
        <button @click="copyRef" class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Copy :size="20" />
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <!-- Header -->
        <div class="px-6 py-8 text-center border-b bg-gray-50/30">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" :class="transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'">
            <ArrowDownLeft v-if="transaction.type === 'credit'" :size="32" class="text-green-600" />
            <ArrowUpRight v-else :size="32" class="text-red-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
          </h2>
          <p class="text-gray-500 text-sm mt-1">{{ transaction.description }}</p>
          <div class="mt-4">
            <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase" :class="getStatusClass(transaction.status)">
              {{ transaction.status }}
            </span>
          </div>
        </div>

        <!-- Details -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Date</label>
                <p class="text-gray-900 font-medium">{{ formatDate(transaction.createdAt) }}</p>
              </div>
              <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Transaction ID</label>
                <p class="text-gray-900 font-mono text-sm">{{ transaction._id }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Reference</label>
                <p class="text-gray-900 font-mono text-sm">{{ transaction.reference }}</p>
              </div>
              <div>
                <label class="text-xs text-gray-400 uppercase font-bold">Source</label>
                <p class="text-gray-900 font-medium">{{ transaction.source }}</p>
              </div>
            </div>
          </div>

          <hr class="border-gray-50" />

          <div>
            <label class="text-xs text-gray-400 uppercase font-bold">Balance Change</label>
            <p class="text-sm text-gray-600 mt-1">
              ₦{{ formatAmount(transaction.balanceBefore) }} → ₦{{ formatAmount(transaction.balanceAfter) }}
            </p>
          </div>

          <div class="bg-blue-50/50 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <Info :size="18" class="text-blue-600 mt-0.5" />
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-1">Note</p>
                <p class="opacity-80">This transaction was processed securely. For issues, contact support with the Reference Number.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>

  </div>
</template>

<script setup>
import { ChevronLeft, ArrowDownLeft, ArrowUpRight, Copy, Info, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const route = useRoute()
const toast = useToast()
const isLoading = ref(true)
const transaction = ref(null)

const fetchTransaction = async () => {
  try {
    const response = await $fetch(`/api/wallet/transactions/${route.params.id}`)
    if (response.success) {
      transaction.value = response.data
    }
  } catch (error) {
    toast.error('Transaction not found')
  } finally {
    isLoading.value = false
  }
}

const formatAmount = (amount) => new Intl.NumberFormat('en-NG').format(amount)

const formatDate = (date) => new Date(date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const getStatusClass = (status) => ({
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  failed: 'bg-red-50 text-red-700 border-red-200'
}[status] || 'bg-gray-50 text-gray-700 border-gray-200')

const copyRef = () => {
  navigator.clipboard.writeText(transaction.value.reference)
  toast.success('Reference copied!')
}

onMounted(() => {
  fetchTransaction()
})
</script>