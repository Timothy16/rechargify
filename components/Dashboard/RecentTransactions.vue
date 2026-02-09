<!-- components/Dashboard/RecentTransactions.vue -->
<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">
        Recent Transactions
      </h2>

      <NuxtLink
        v-if="transactions.length"
        to="/transactions"
        class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-transparent text-gray-600 hover:bg-gray-100 h-9 px-3 text-sm"
      >
        View All
      </NuxtLink>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-if="!transactions.length"
      class="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center"
    >
      <div
        class="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
      >
        <ArrowDownLeft class="text-gray-400" :size="20" />
      </div>

      <h3 class="font-semibold text-gray-900 mb-1">
        No transactions yet
      </h3>

      <p class="text-sm text-gray-500 mb-6">
        Your recent transactions will appear here
      </p>

      <NuxtLink
        to="/fund-wallet"
        class="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white font-medium h-10 px-4 text-sm hover:bg-gray-800 transition"
      >
        Fund Wallet
      </NuxtLink>
    </div>

    <!-- TRANSACTIONS LIST -->
    <div
      v-else
      class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100"
    >
      <div
        v-for="(transaction, index) in transactions"
        :key="index"
        class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
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

          <!-- Details -->
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

// EMPTY ARRAY → EMPTY STATE ONLY
const transactions = ref([])

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
