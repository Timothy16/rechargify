<!-- pages/transactions/index.vue -->
<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6">

      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
        <p class="text-gray-600">View and manage all your transaction history</p>
      </div>

      <!-- Stats -->
      <TransactionsStatsCards :stats="stats" />

      <!-- Filters -->
      <TransactionsFilterSection @filter-change="handleFilterChange" />

      <!-- Table -->
      <TransactionsTable :transactions="transactions" :is-loading="isLoading" />

    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const isLoading = ref(true)
const transactions = ref([])
const stats = ref({ totalIncome: 0, totalExpenses: 0 })
const filters = ref({})

const fetchTransactions = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/wallet/transactions', {
      params: filters.value
    })

    if (response.success) {
      transactions.value = response.data.transactions
      stats.value = response.data.stats
    }
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
  } finally {
    isLoading.value = false
  }
}

const handleFilterChange = (newFilters) => {
  filters.value = newFilters
  fetchTransactions()
}

onMounted(() => {
  fetchTransactions()
})

useHead({
  title: 'Transactions - Rechargify',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>