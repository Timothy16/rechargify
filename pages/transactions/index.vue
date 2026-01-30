<!-- pages/transactions/index.vue -->
<template>
  <div>
    <main class="p-4 sm:p-6 lg:p-8">
      <div style="opacity: 1; transform: none;">
        <div class="max-w-7xl mx-auto space-y-6">
          
          <!-- Page Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                Transactions
              </h1>
              <p class="text-gray-600">
                View and manage all your transaction history
              </p>
            </div>
          </div>

          <!-- Stats Cards -->
          <TransactionsStatsCards />

          <!-- Filter Section -->
          <TransactionsFilterSection @filter-change="handleFilterChange" />

          <!-- Transactions Table -->
          <TransactionsTable />

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Set layout
definePageMeta({
  layout: 'dashboard'
})

// Handle filter changes
const handleFilterChange = (filters) => {
  console.log('Filters changed:', filters)
  // Add filter logic here - could filter transactions based on the selected filters
}

// SEO Configuration for Transactions Page
useHead({
  title: 'Transactions - Rechargify | Your Transaction History',
  meta: [
    {
      name: 'description',
      content: 'View and manage all your Rechargify transactions. Track your income, expenses, and pending transactions with detailed filters and search.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow' // Transactions page should not be indexed
    }
  ]
})
</script>