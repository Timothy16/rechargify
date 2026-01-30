<!-- pages/dashboard/index.vue -->
<template>
  <div>
    <main class="p-4 sm:p-6 lg:p-8">
      <div style="opacity: 1; transform: none;">
        <div class="max-w-7xl mx-auto space-y-8">
          
          <!-- Welcome Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {{ userName }}! 👋
            </h1>
            <p class="text-gray-600">
              Here's what's happening with your account today.
            </p>
          </div>

          <!-- Wallet & Virtual Account Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Wallet Card -->
            <div style="opacity: 1; transform: none;">
              <DashboardWalletCard />
            </div>

            <!-- Virtual Account Card -->
            <div style="opacity: 1; transform: none;">
              <DashboardVirtualAccountCard />
            </div>
          </div>

          <!-- Quick Actions -->
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <DashboardQuickActions />
          </div>

          <!-- Recent Transactions -->
          <div>
            <DashboardRecentTransactions />
          </div>

          <!-- Account Verified Banner (Optional - can be removed) -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 bg-blue-50 border-blue-100">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CircleCheckBig :size="20" class="text-[#0066FF]" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">Account Verified</h3>
                <p class="text-gray-600 text-sm">
                  Your account has been successfully verified. You can now enjoy higher transaction limits.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { CircleCheckBig } from 'lucide-vue-next'

// Set layout
definePageMeta({
  layout: 'dashboard'
})

// User data
const userName = ref('John')

// SEO Configuration for Dashboard
useHead({
  title: 'Dashboard - Rechargify | Your Financial Overview',
  meta: [
    {
      name: 'description',
      content: 'Manage your Rechargify wallet, view transactions, pay bills, and access all financial services from your dashboard.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow' // Dashboard should not be indexed
    }
  ]
})
</script>