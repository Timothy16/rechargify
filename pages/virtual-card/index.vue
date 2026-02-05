<!-- pages/dashboard/virtual-card.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Virtual Cards
        </h1>
        <p class="text-gray-600">
          Create and manage virtual cards for secure online payments
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Card Display -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Active Card Display -->
          <div v-if="activeCard" class="relative">
            <!-- Virtual Card -->
            <div class="bg-[#0066FF] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl aspect-[1.586/1] max-w-md mx-auto lg:mx-0">
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="card-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                      <circle cx="50" cy="50" r="2" fill="white"/>
                      <circle cx="20" cy="30" r="1.5" fill="white"/>
                      <circle cx="80" cy="70" r="1.5" fill="white"/>
                      <circle cx="30" cy="80" r="1" fill="white"/>
                      <circle cx="70" cy="20" r="1" fill="white"/>
                      <line x1="50" y1="50" x2="20" y2="30" stroke="white" stroke-width="0.5"/>
                      <line x1="50" y1="50" x2="80" y2="70" stroke="white" stroke-width="0.5"/>
                      <line x1="50" y1="50" x2="30" y2="80" stroke="white" stroke-width="0.5"/>
                      <line x1="50" y1="50" x2="70" y2="20" stroke="white" stroke-width="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#card-circuit)" />
                </svg>
              </div>

              <!-- Card Content -->
              <div class="relative h-full flex flex-col justify-between">
                <!-- Card Header -->
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-xs opacity-80 mb-1">Virtual Card</div>
                    <div class="font-bold text-lg">{{ activeCard.name }}</div>
                  </div>
                  <CreditCard :size="32" class="opacity-80" />
                </div>

                <!-- Card Chip -->
                <div class="my-6">
                  <div class="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md"></div>
                </div>

                <!-- Card Number -->
                <div class="mb-6">
                  <div class="text-xs opacity-80 mb-2">Card Number</div>
                  <div class="font-mono text-xl tracking-wider">
                    {{ showCardDetails ? activeCard.number : '•••• •••• •••• ' + activeCard.last4 }}
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-xs opacity-80 mb-1">Valid Thru</div>
                    <div class="font-mono">{{ activeCard.expiry }}</div>
                  </div>
                  <div>
                    <div class="text-xs opacity-80 mb-1">CVV</div>
                    <div class="font-mono">{{ showCardDetails ? activeCard.cvv : '•••' }}</div>
                  </div>
                  <div class="text-right">
                    <!-- <img src="/mastercard-logo.png" alt="Mastercard" class="h-8 opacity-90" /> -->
                    <div class="text-xs mt-1 opacity-80">Mastercard</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Controls -->
            <div class="flex flex-wrap gap-3 mt-6 max-w-md mx-auto lg:mx-0">
              <button
                @click="toggleCardDetails"
                class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <component :is="showCardDetails ? EyeOff : Eye" :size="18" />
                <span class="text-sm font-medium">{{ showCardDetails ? 'Hide' : 'Show' }} Details</span>
              </button>

              <button
                @click="toggleCardFreeze"
                :class="[
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors shadow-sm',
                  activeCard.frozen
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100'
                    : 'bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100'
                ]"
              >
                <component :is="activeCard.frozen ? Unlock : Lock" :size="18" />
                <span class="text-sm font-medium">{{ activeCard.frozen ? 'Unfreeze' : 'Freeze' }} Card</span>
              </button>

              <button
                @click="copyCardNumber"
                class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <component :is="copied ? Check : Copy" :size="18" :class="copied ? 'text-green-600' : ''" />
                <span class="text-sm font-medium">{{ copied ? 'Copied!' : 'Copy Number' }}</span>
              </button>

              <button
                @click="deleteCard"
                class="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors shadow-sm"
              >
                <Trash2 :size="18" />
                <span class="text-sm font-medium">Delete Card</span>
              </button>
            </div>
          </div>

          <!-- No Card State -->
          <div v-else class="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center max-w-md mx-auto lg:mx-0">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard :size="40" class="text-gray-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">No Virtual Card Yet</h3>
            <p class="text-gray-600 mb-6">
              Create your first virtual card to start making secure online payments
            </p>
            <button
              @click="createNewCard"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus :size="20" />
              Create Virtual Card
            </button>
          </div>

          <!-- Card Transactions -->
          <div v-if="activeCard" class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900">Recent Transactions</h2>
            </div>

            <div class="divide-y divide-gray-100">
              <div
                v-for="transaction in cardTransactions"
                :key="transaction.id"
                class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <!-- Transaction Icon -->
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                      transaction.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    ]"
                  >
                    <component
                      :is="transaction.status === 'success' ? Check : X"
                      :size="20"
                      :class="transaction.status === 'success' ? 'text-green-600' : 'text-red-600'"
                    />
                  </div>

                  <!-- Transaction Details -->
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-900 mb-1">
                      {{ transaction.merchant }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.date }} • {{ transaction.time }}
                    </div>
                  </div>

                  <!-- Amount -->
                  <div class="text-right">
                    <div class="font-bold text-gray-900 mb-1">
                      -₦{{ formatAmount(transaction.amount) }}
                    </div>
                    <div
                      :class="[
                        'text-xs font-medium px-2 py-1 rounded-full inline-block',
                        transaction.status === 'success'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      ]"
                    >
                      {{ transaction.status === 'success' ? 'Success' : 'Failed' }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="cardTransactions.length === 0" class="p-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Receipt :size="32" class="text-gray-400" />
                </div>
                <p class="text-gray-500">No transactions yet</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Card Info & Actions -->
        <div class="space-y-6">
          <!-- Create New Card -->
          <div v-if="activeCard" class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <h3 class="font-bold text-gray-900 mb-4">Need Another Card?</h3>
            <p class="text-gray-600 text-sm mb-4">
              Create additional virtual cards for different purposes or online merchants
            </p>
            <button
              @click="createNewCard"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0066FF] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus :size="20" />
              Create New Card
            </button>
          </div>

          <!-- Card Details -->
          <div v-if="activeCard" class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <h3 class="font-bold text-gray-900 mb-4">Card Details</h3>
            
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-500 mb-1">Card Name</div>
                <div class="font-medium text-gray-900">{{ activeCard.name }}</div>
              </div>

              <div>
                <div class="text-sm text-gray-500 mb-1">Card Type</div>
                <div class="font-medium text-gray-900">Virtual Mastercard</div>
              </div>

              <div>
                <div class="text-sm text-gray-500 mb-1">Created</div>
                <div class="font-medium text-gray-900">{{ activeCard.created }}</div>
              </div>

              <div>
                <div class="text-sm text-gray-500 mb-1">Status</div>
                <div
                  :class="[
                    'inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full',
                    activeCard.frozen
                      ? 'bg-orange-50 text-orange-700'
                      : 'bg-green-50 text-green-700'
                  ]"
                >
                  <div :class="[
                    'w-2 h-2 rounded-full',
                    activeCard.frozen ? 'bg-orange-500' : 'bg-green-500'
                  ]"></div>
                  {{ activeCard.frozen ? 'Frozen' : 'Active' }}
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-500 mb-1">Spending Limit</div>
                <div class="font-medium text-gray-900">₦{{ formatAmount(activeCard.spendingLimit) }}/month</div>
              </div>

              <div>
                <div class="text-sm text-gray-500 mb-1">Spent This Month</div>
                <div class="font-medium text-gray-900">₦{{ formatAmount(activeCard.spent) }}</div>
                <div class="mt-2 w-full bg-gray-100 rounded-full h-2">
                  <div
                    class="bg-[#0066FF] h-2 rounded-full transition-all"
                    :style="{ width: `${(activeCard.spent / activeCard.spendingLimit) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div class="bg-blue-50 rounded-xl border border-blue-100 p-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield :size="20" class="text-[#0066FF]" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-1">Secure & Private</h3>
                <p class="text-sm text-gray-600">
                  Virtual cards keep your real card details safe when shopping online
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <Check :size="16" class="text-green-600" />
                <span>No physical card needed</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <Check :size="16" class="text-green-600" />
                <span>Instant card creation</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <Check :size="16" class="text-green-600" />
                <span>Freeze or delete anytime</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <Check :size="16" class="text-green-600" />
                <span>Set spending limits</span>
              </div>
            </div>
          </div>

          <!-- Help -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <HelpCircle :size="20" class="text-[#0066FF]" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-1">Need Help?</h3>
                <p class="text-sm text-gray-600 mb-3">
                  Learn how to use virtual cards effectively
                </p>
                <button class="text-sm text-[#0066FF] font-medium hover:underline">
                  View Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { 
  CreditCard, Eye, EyeOff, Lock, Unlock, Copy, Check, 
  Trash2, Plus, Shield, HelpCircle, Receipt, X 
} from 'lucide-vue-next'

// Set layout
definePageMeta({
  layout: 'dashboard'
})

// State
const showCardDetails = ref(false)
const copied = ref(false)

// Active card data (sample - replace with API call)
const activeCard = ref({
  id: '1',
  name: 'Online Shopping',
  number: '5399 8352 7264 9183',
  last4: '9183',
  expiry: '12/28',
  cvv: '742',
  frozen: false,
  spendingLimit: 500000,
  spent: 125000,
  created: 'Jan 15, 2026'
})

// Card transactions (sample)
const cardTransactions = ref([
  {
    id: '1',
    merchant: 'Amazon.com',
    amount: 45000,
    date: 'Feb 4, 2026',
    time: '2:34 PM',
    status: 'success'
  },
  {
    id: '2',
    merchant: 'Netflix Subscription',
    amount: 5500,
    date: 'Feb 1, 2026',
    time: '12:00 AM',
    status: 'success'
  },
  {
    id: '3',
    merchant: 'Shopify Store',
    amount: 28000,
    date: 'Jan 28, 2026',
    time: '4:15 PM',
    status: 'success'
  }
])

// Methods
const toggleCardDetails = () => {
  showCardDetails.value = !showCardDetails.value
}

const toggleCardFreeze = () => {
  activeCard.value.frozen = !activeCard.value.frozen
}

const copyCardNumber = async () => {
  try {
    await navigator.clipboard.writeText(activeCard.value.number.replace(/\s/g, ''))
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const deleteCard = () => {
  if (confirm('Are you sure you want to delete this virtual card? This action cannot be undone.')) {
    // Handle card deletion
    activeCard.value = null
  }
}

const createNewCard = () => {
  // Navigate to create card page or open modal
  console.log('Creating new virtual card...')
}

const formatAmount = (amount) => {
  return amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// SEO Configuration
useHead({
  title: 'Virtual Cards - Rechargify | Secure Online Payment Cards',
  meta: [
    {
      name: 'description',
      content: 'Create and manage virtual cards for secure online payments. Freeze, unfreeze, or delete cards instantly.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>