<!-- components/Transactions/FilterSection.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <Funnel :size="20" class="text-gray-600" />
      <h3 class="font-semibold text-gray-900">Filters</h3>
    </div>

    <!-- Filter Controls -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div class="relative">
        <div class="w-full">
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search transactions..."
              class="block w-full rounded-lg border px-4 py-3 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 hover:border-gray-300 pl-10"
              @input="handleFilterChange"
            />
          </div>
        </div>
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <!-- Type Filter -->
      <div class="w-full">
        <div class="relative">
          <select
            v-model="filters.type"
            class="block w-full rounded-lg border px-4 py-3 pr-10 text-gray-900 shadow-sm transition-colors appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-0 border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 hover:border-gray-300"
            @change="handleFilterChange"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- Status Filter -->
      <div class="w-full">
        <div class="relative">
          <select
            v-model="filters.status"
            class="block w-full rounded-lg border px-4 py-3 pr-10 text-gray-900 shadow-sm transition-colors appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-0 border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 hover:border-gray-300"
            @change="handleFilterChange"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- Date Filter -->
      <div class="w-full">
        <div class="relative">
          <select
            v-model="filters.date"
            class="block w-full rounded-lg border px-4 py-3 pr-10 text-gray-900 shadow-sm transition-colors appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-0 border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF]/20 hover:border-gray-300"
            @change="handleFilterChange"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Funnel, Search, ChevronDown } from 'lucide-vue-next'

const emit = defineEmits(['filter-change'])

const filters = ref({
  search: '',
  type: 'all',
  status: 'all',
  date: 'all'
})

const handleFilterChange = () => {
  emit('filter-change', filters.value)
}
</script>