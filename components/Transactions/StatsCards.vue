<!-- components/Transactions/StatsCards.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div 
      v-for="(stat, index) in stats" 
      :key="index"
      style="opacity: 1; transform: none;"
    >
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
        <div class="text-sm text-gray-600 mb-2">
          {{ stat.label }}
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">
          ₦{{ formatAmount(stat.amount) }}
        </div>
        <div 
          class="text-sm font-medium"
          :class="stat.changeColor"
        >
          {{ stat.change }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = ref([
  {
    label: 'Total Income',
    amount: 0,
    change: '+0%',
    changeColor: 'text-green-600'
  },
  {
    label: 'Total Expenses',
    amount: 0,
    change: '0%',
    changeColor: 'text-red-600'
  },
  {
    label: 'Pending',
    amount: 0,
    change: '1 transaction',
    changeColor: 'text-yellow-600'
  }
])

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>