<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-3xl mx-auto">
      
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-1">Notifications</h1>
          <p class="text-gray-500 text-sm">Stay updated with your account activity</p>
        </div>
        <button 
          @click="markAllAsRead"
          class="text-sm font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div class="space-y-8">
        <section v-for="(group, date) in groupedNotifications" :key="date">
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{{ date }}</h2>
          
          <div class="space-y-3">
            <div 
              v-for="item in group" 
              :key="item.id"
              class="group relative bg-white rounded-xl border border-gray-100 p-4 transition-all hover:border-gray-200 hover:shadow-sm flex gap-4"
              :class="{ 'border-l-4 border-l-[#0066FF]': !item.read }"
            >
              <div 
                class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                :class="getIconBg(item.type)"
              >
                <component :is="getIcon(item.type)" :size="20" :class="getIconColor(item.type)" />
              </div>

              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <h3 class="font-bold text-gray-900 leading-tight">{{ item.title }}</h3>
                  <span class="text-[11px] text-gray-400 font-medium">{{ item.time }}</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ item.message }}</p>
              </div>

              <div v-if="!item.read" class="absolute top-4 right-4 w-2 h-2 bg-[#0066FF] rounded-full"></div>
            </div>
          </div>
        </section>
      </div>

      <div v-if="notifications.length === 0" class="py-20 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <BellOff class="text-gray-300" :size="40" />
        </div>
        <h3 class="text-lg font-bold text-gray-900">All caught up!</h3>
        <p class="text-gray-500">No new notifications at the moment.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { 
  BellOff, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  Info,
  Smartphone
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const notifications = ref([
  {
    id: 1,
    type: 'credit',
    title: 'Wallet Funded',
    message: 'Your wallet has been credited with ₦50,000.00 via Bank Transfer.',
    time: '2m ago',
    date: 'Today',
    read: false
  },
  {
    id: 2,
    type: 'security',
    title: 'New Login Detected',
    message: 'A new login was detected on an iPhone 15 Pro in Lagos, Nigeria.',
    time: '1h ago',
    date: 'Today',
    read: false
  },
  {
    id: 3,
    type: 'service',
    title: 'Airtime Purchase',
    message: 'Successful airtime purchase of ₦1,000.00 for 0803XXXXX89.',
    time: '5h ago',
    date: 'Today',
    read: true
  },
  {
    id: 4,
    type: 'info',
    title: 'System Update',
    message: 'Scheduled maintenance will occur on Sunday at 2:00 AM WAT.',
    time: 'Yesterday',
    date: 'Earlier',
    read: true
  }
])

const groupedNotifications = computed(() => {
  return notifications.value.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = []
    acc[curr.date].push(curr)
    return acc
  }, {})
})

const getIcon = (type) => {
  const icons = {
    credit: ArrowDownLeft,
    debit: ArrowUpRight,
    security: ShieldCheck,
    service: Smartphone,
    info: Info
  }
  return icons[type] || Info
}

const getIconBg = (type) => {
  const bgs = {
    credit: 'bg-green-50',
    debit: 'bg-red-50',
    security: 'bg-orange-50',
    service: 'bg-blue-50',
    info: 'bg-gray-50'
  }
  return bgs[type] || 'bg-gray-50'
}

const getIconColor = (type) => {
  const colors = {
    credit: 'text-green-600',
    debit: 'text-red-600',
    security: 'text-orange-600',
    service: 'text-[#0066FF]',
    info: 'text-gray-600'
  }
  return colors[type] || 'text-gray-600'
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>