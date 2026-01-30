<template>
  <div class="max-w-2xl mx-auto p-4 md:py-8">
    <div class="flex items-center justify-between mb-6">
      <button 
        @click="$router.back()" 
        class="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
      >
        <ChevronLeft :size="20" />
        Back to Transactions
      </button>
      
      <div class="flex gap-2">
        <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 :size="20" />
        </button>
        <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Download :size="20" />
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-6 py-8 text-center border-b border-gray-50 bg-gray-50/30">
        <div 
          class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          :class="transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'"
        >
          <ArrowDownLeft v-if="transaction.type === 'credit'" :size="32" class="text-green-600" />
          <ArrowUpRight v-else :size="32" class="text-red-600" />
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900">
          {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
        </h2>
        <p class="text-gray-500 text-sm mt-1">{{ transaction.title }}</p>
        
        <div class="mt-4">
          <span 
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            :class="getStatusClass(transaction.status)"
          >
            {{ transaction.status }}
          </span>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-400 uppercase font-bold tracking-wider">Transaction Date</label>
              <p class="text-gray-900 font-medium">{{ transaction.date }}, {{ transaction.time }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-400 uppercase font-bold tracking-wider">Transaction ID</label>
              <p class="text-gray-900 font-mono text-sm">{{ transaction.id }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-400 uppercase font-bold tracking-wider">Reference Number</label>
              <div class="flex items-center gap-2">
                <p class="text-gray-900 font-mono text-sm">{{ transaction.reference }}</p>
                <button @click="copyRef" class="text-blue-600 hover:text-blue-700">
                  <Copy :size="14" />
                </button>
              </div>
            </div>
            <div>
              <label class="text-xs text-gray-400 uppercase font-bold tracking-wider">Payment Method</label>
              <p class="text-gray-900 font-medium">Wallet Balance</p>
            </div>
          </div>
        </div>

        <hr class="border-gray-50" />

        <div class="bg-blue-50/50 rounded-xl p-4">
          <div class="flex items-start gap-3">
            <Info :size="18" class="text-blue-600 mt-0.5" />
            <div class="text-sm text-blue-800">
              <p class="font-semibold mb-1">Note</p>
              <p class="opacity-80">This transaction was processed securely. For any issues, please contact support with the Reference Number above.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-gray-50/50 border-t border-gray-50">
        <button class="w-full py-3 px-4 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl font-semibold transition-all active:scale-[0.98]">
          Download Receipt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ChevronLeft, ArrowDownLeft, ArrowUpRight, 
  Share2, Download, Copy, Info 
} from 'lucide-vue-next'

// Mock Data - In a real app, fetch this using the route param (useRoute().params.id)
const transaction = ref({
  id: 'TXN001',
  title: 'Wallet Funding via Bank Transfer',
  date: 'January 15, 2024',
  time: '2:30 PM',
  reference: 'REF-2024-0018829910',
  amount: 50000,
  type: 'credit',
  status: 'success'
})

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG').format(amount)
}

const getStatusClass = (status) => {
  const classes = {
    success: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    failed: 'bg-red-50 text-red-700 border-red-200'
  }
  return classes[status] || classes.pending
}

const copyRef = () => {
  navigator.clipboard.writeText(transaction.value.reference)
  alert('Reference copied to clipboard!')
}

definePageMeta({
  layout: 'dashboard'
})
</script>