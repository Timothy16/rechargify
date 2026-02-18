<!-- components/Transactions/Table.vue -->
<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

    <!-- Loading -->
    <div v-if="isLoading" class="p-12 text-center">
      <Loader2 :size="40" class="animate-spin text-[#0066FF] mx-auto" />
    </div>

    <!-- Empty State -->
    <div v-else-if="!transactions.length" class="p-12 text-center">
      <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <ArrowDownLeft class="text-gray-400" :size="22" />
      </div>
      <h3 class="font-semibold text-gray-900 mb-1">No transactions found</h3>
      <p class="text-sm text-gray-500 mb-6">You haven't made any transactions yet</p>
      <NuxtLink to="/wallet" class="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white font-medium h-10 px-5 text-sm hover:bg-gray-800 transition">
        Fund Wallet
      </NuxtLink>
    </div>

    <!-- Data -->
    <template v-else>

      <!-- Mobile View -->
      <div class="block md:hidden">
        <div
          v-for="transaction in transactions"
          :key="transaction._id"
          class="p-4 border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
          @click="handleRowClick(transaction._id)"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'">
                <ArrowDownLeft v-if="transaction.type === 'credit'" :size="16" class="text-green-600" />
                <ArrowUpRight v-else :size="16" class="text-red-600" />
              </div>
              <div>
                <div class="font-semibold text-gray-900 text-sm">{{ transaction.description }}</div>
                <div class="text-xs text-gray-500">{{ formatDate(transaction.createdAt) }}</div>
              </div>
            </div>
            <div class="font-bold text-sm" :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'">
              {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
            </div>
          </div>
          <div class="flex items-center justify-between mt-3">
            <span class="text-xs font-mono text-gray-400">{{ transaction.reference }}</span>
            <span class="inline-flex items-center rounded-full border font-medium px-2 py-0.5 text-[10px] uppercase" :class="getStatusClass(transaction.status)">
              {{ transaction.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Transaction</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Reference</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="transaction in transactions"
              :key="transaction._id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="handleRowClick(transaction._id)"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'">
                    <ArrowDownLeft v-if="transaction.type === 'credit'" :size="20" class="text-green-600" />
                    <ArrowUpRight v-else :size="20" class="text-red-600" />
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ transaction.description }}</div>
                    <div class="text-sm text-gray-500">{{ transaction.source }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ formatDate(transaction.createdAt) }}</div>
                <div class="text-sm text-gray-500">{{ formatTime(transaction.createdAt) }}</div>
              </td>
              <td class="px-6 py-4 text-sm font-mono text-gray-600">{{ transaction.reference }}</td>
              <td class="px-6 py-4 font-bold" :class="transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'">
                {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ formatAmount(transaction.amount) }}
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

    </template>
  </div>
</template>

<script setup>
import { ArrowDownLeft, ArrowUpRight, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  transactions: Array,
  isLoading: Boolean
})

const router = useRouter()

const handleRowClick = (id) => {
  router.push(`/transactions/${id}`)
}

const formatAmount = (amount) => new Intl.NumberFormat('en-NG').format(amount)

const formatDate = (date) => new Date(date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })

const formatTime = (date) => new Date(date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })

const getStatusClass = (status) => ({
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  failed: 'bg-red-50 text-red-700 border-red-200'
}[status] || 'bg-gray-50 text-gray-700 border-gray-200')
</script>