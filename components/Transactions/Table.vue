<!-- components/Transactions/Table.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    
    <div class="block md:hidden">
      <div 
        v-for="(transaction, index) in transactions" 
        :key="'mob-' + index"
        class="p-4 border-b border-gray-100 active:bg-gray-50 transition-colors"
        @click="handleRowClick(transaction)"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div 
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'"
            >
              <ArrowDownLeft v-if="transaction.type === 'credit'" :size="16" class="text-green-600" />
              <ArrowUpRight v-else :size="16" class="text-red-600" />
            </div>
            <div>
              <div class="font-semibold text-gray-900 text-sm leading-tight">
                {{ transaction.title }}
              </div>
              <div class="text-xs text-gray-500">{{ transaction.date }} • {{ transaction.time }}</div>
            </div>
          </div>
          <div 
            class="font-bold text-sm"
            :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'"
          >
            {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
          </div>
        </div>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs font-mono text-gray-400">{{ transaction.reference }}</span>
          <span 
            class="inline-flex items-center rounded-full border font-medium px-2 py-0.5 text-[10px] uppercase tracking-wider"
            :class="getStatusClass(transaction.status)"
          >
            {{ transaction.status }}
          </span>
        </div>
      </div>
    </div>

    <div class="hidden md:block overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reference</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr 
            v-for="(transaction, index) in transactions" 
            :key="index"
            class="hover:bg-gray-50 cursor-pointer transition-colors"
            @click="handleRowClick(transaction)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'">
                  <ArrowDownLeft v-if="transaction.type === 'credit'" :size="20" class="text-green-600" />
                  <ArrowUpRight v-else :size="20" class="text-red-600" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900">{{ transaction.title }}</div>
                  <div class="text-sm text-gray-500">{{ transaction.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">{{ transaction.date }}</div>
              <div class="text-sm text-gray-500">{{ transaction.time }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm font-mono text-gray-600">{{ transaction.reference }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="font-bold" :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'">
                {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center rounded-full border font-medium px-3 py-1 text-sm" :class="getStatusClass(transaction.status)">
                {{ transaction.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="px-4 py-4 md:px-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-600 order-2 sm:order-1">
        Showing <span class="font-medium text-gray-900">{{ startIndex }}</span> to <span class="font-medium text-gray-900">{{ endIndex }}</span> of {{ totalTransactions }}
      </div>
      <div class="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
        <button 
          class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg font-medium transition-all border border-[#0066FF] text-[#0066FF] h-9 px-4 text-sm disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Previous
        </button>
        <button 
          class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg font-medium transition-all border border-[#0066FF] text-[#0066FF] h-9 px-4 text-sm disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const router = useRouter()
const transactions = ref([
  { id: 'TXN001', title: 'Wallet Funding via Bank Transfer', date: '2024-01-15', time: '2:30 PM', reference: 'REF-2024-001', amount: 50000, type: 'credit', status: 'success' },
  { id: 'TXN002', title: 'Airtime Purchase - MTN', date: '2024-01-15', time: '1:15 PM', reference: 'REF-2024-002', amount: 1000, type: 'debit', status: 'success' },
  { id: 'TXN003', title: 'Electricity Bill - EKEDC', date: '2024-01-14', time: '6:45 PM', reference: 'REF-2024-003', amount: 5000, type: 'debit', status: 'success' },
  { id: 'TXN004', title: 'Transfer from John Adeyemi', date: '2024-01-14', time: '3:20 PM', reference: 'REF-2024-004', amount: 10000, type: 'credit', status: 'success' },
  { id: 'TXN005', title: 'Data Bundle - Airtel 10GB', date: '2024-01-14', time: '12:00 PM', reference: 'REF-2024-005', amount: 2000, type: 'debit', status: 'pending' }
])

const currentPage = ref(1)
const itemsPerPage = 5
const totalTransactions = ref(47)

const totalPages = computed(() => Math.ceil(totalTransactions.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage, totalTransactions.value))

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

const handleRowClick = (transaction) => {
  // console.log('Navigating to:', transaction.id)
  router.push(`/transactions/${transaction.id}`)
}

const prevPage = () => currentPage.value--
const nextPage = () => currentPage.value++
</script>