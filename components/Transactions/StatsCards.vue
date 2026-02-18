<!-- components/Transactions/StatsCards.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
      <div class="text-sm text-gray-600 mb-2">Total Income</div>
      <div class="text-3xl font-bold text-green-600 mb-2">
        ₦{{ formatAmount(stats.totalIncome) }}
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
      <div class="text-sm text-gray-600 mb-2">Total Expenses</div>
      <div class="text-3xl font-bold text-red-600 mb-2">
        ₦{{ formatAmount(stats.totalExpenses) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({ totalIncome: 0, totalExpenses: 0 })
  }
})

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>