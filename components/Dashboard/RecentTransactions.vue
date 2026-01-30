<!-- components/Dashboard/RecentTransactions.vue -->
<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">Recent Transactions</h2>
      <NuxtLink 
        to="/transactions"
        class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200 h-9 px-3 text-sm"
      >
        View All
      </NuxtLink>
    </div>

    <!-- Transactions List -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
      <div 
        v-for="(transaction, index) in transactions" 
        :key="index"
        class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
        :style="`opacity: 1; transform: none;`"
        @click="handleTransactionClick(transaction)"
      >
        <div class="flex items-center gap-4">
          <!-- Icon -->
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'"
          >
            <ArrowDownLeft 
              v-if="transaction.type === 'credit'"
              :size="20" 
              class="text-green-600" 
            />
            <ArrowUpRight 
              v-else
              :size="20" 
              class="text-red-600" 
            />
          </div>

          <!-- Transaction Details -->
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-900 mb-1">
              {{ transaction.title }}
            </div>
            <div class="text-sm text-gray-500">
              {{ transaction.date }}
            </div>
          </div>

          <!-- Amount & Status -->
          <div class="text-right">
            <div 
              class="font-bold mb-1"
              :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'"
            >
              {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
            </div>
            <span 
              class="inline-flex items-center rounded-full border font-medium px-2 py-0.5 text-xs"
              :class="getStatusClass(transaction.status)"
            >
              {{ transaction.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next'

const router = useRouter()

const transactions = ref([
  {
    title: 'Wallet Funding',
    date: 'Today, 2:30 PM',
    amount: 50000,
    type: 'credit',
    status: 'success',
    id: 'TXN001'
  },
  {
    title: 'Airtime Purchase - MTN',
    date: 'Today, 1:15 PM',
    amount: 1000,
    type: 'debit',
    status: 'success',
    id: 'TXN002'
  },
  {
    title: 'Electricity Bill - EKEDC',
    date: 'Yesterday, 6:45 PM',
    amount: 5000,
    type: 'debit',
    status: 'success',
    id: 'TXN003'
  },
  {
    title: 'Transfer from John',
    date: 'Yesterday, 3:20 PM',
    amount: 10000,
    type: 'credit',
    status: 'success',
    id: 'TXN004'
  },
  {
    title: 'Data Bundle - Airtel',
    date: 'Yesterday, 12:00 PM',
    amount: 2000,
    type: 'debit',
    status: 'pending',
    id: 'TXN005'
  }
])

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const getStatusClass = (status) => {
  const classes = {
    success: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    failed: 'bg-red-50 text-red-700 border-red-200'
  }
  return classes[status] || classes.pending
}

const handleTransactionClick = (transaction) => {
  router.push(`/transactions/${transaction.id}`)
}
</script>