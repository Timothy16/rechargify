<!-- components/Dashboard/RecentTransactions.vue -->
<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">Recent Transactions</h2>
      <NuxtLink
        v-if="transactions.length"
        to="/transactions"
        class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-transparent text-gray-600 hover:bg-gray-100 h-9 px-3 text-sm"
      >
        View All
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex justify-center">
      <Loader2 :size="32" class="animate-spin text-[#0066FF]" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!transactions.length"
      class="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center"
    >
      <div class="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        <ArrowDownLeft class="text-gray-400" :size="20" />
      </div>
      <h3 class="font-semibold text-gray-900 mb-1">No transactions yet</h3>
      <p class="text-sm text-gray-500 mb-6">Your recent transactions will appear here</p>
      <NuxtLink
        to="/wallet"
        class="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white font-medium h-10 px-4 text-sm hover:bg-gray-800 transition"
      >
        Fund Wallet
      </NuxtLink>
    </div>

    <!-- Transactions List -->
    <div
      v-else
      class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100"
    >
      <div
        v-for="transaction in transactions"
        :key="transaction._id"
        class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
        @click="$router.push(`/transactions/${transaction._id}`)"
      >
        <div class="flex items-center gap-4">
          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'"
          >
            <ArrowDownLeft v-if="transaction.type === 'credit'" :size="20" class="text-green-600" />
            <ArrowUpRight v-else :size="20" class="text-red-600" />
          </div>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-900 mb-1 truncate">{{ transaction.description }}</div>
            <div class="text-sm text-gray-500">{{ formatDate(transaction.createdAt) }}</div>
          </div>

          <!-- Amount & Status -->
          <div class="text-right">
            <div class="font-bold mb-1" :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'">
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
import { ArrowDownLeft, ArrowUpRight, Loader2 } from 'lucide-vue-next'

const isLoading = ref(true)
const transactions = ref([])

const fetchTransactions = async () => {
  try {
    const response = await $fetch('/api/wallet/transactions')
    if (response.success) {
      transactions.value = response.data.transactions.slice(0, 5)
    }
  } catch (error) {
    console.error('Failed to fetch recent transactions:', error)
  } finally {
    isLoading.value = false
  }
}

const formatAmount = (amount) => new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(amount)

const formatDate = (date) => new Date(date).toLocaleDateString('en-NG', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

const getStatusClass = (status) => ({
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  failed: 'bg-red-50 text-red-700 border-red-200'
}[status] || 'bg-gray-50 text-gray-700 border-gray-200')

onMounted(() => {
  fetchTransactions()
})
</script>