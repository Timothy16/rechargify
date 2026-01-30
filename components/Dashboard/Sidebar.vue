<!-- components/Dashboard/Sidebar.vue -->
<template>
  <aside class="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 fixed h-full">
    
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200">
      <NuxtLink to="/dashboard" class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
          <Wallet :size="24" />
        </div>
        <span class="text-xl font-bold text-gray-900">Rechargify</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
      <NuxtLink 
        v-for="item in mainNavItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
        :class="isActive(item.path) ? 'bg-blue-50 text-[#0066FF]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.name }}</span>
      </NuxtLink>

      <!-- Divider -->
      <div class="pt-4 mt-4 border-t border-gray-200 space-y-1">
        <NuxtLink 
          v-for="item in secondaryNavItems" 
          :key="item.path"
          :to="item.path"
          :class="isActive(item.path) ? 'bg-blue-50 text-[#0066FF]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <component :is="item.icon" :size="20" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-gray-200">
      <NuxtLink 
        to="/profile" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
      >
        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User :size="20" class="text-gray-600" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-900 truncate">John Doe</div>
          <div class="text-xs text-gray-500 truncate">john@example.com</div>
        </div>
      </NuxtLink>

      <!-- Logout Button -->
      <button 
        class="w-full mt-2 flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        @click="handleLogout"
      >
        <LogOut :size="16" />
        <span>Log out</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { 
  Wallet, 
  LayoutDashboard, 
  ArrowLeftRight, 
  CreditCard, 
  Zap, 
  CircleHelp, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { name: 'Wallet', path: '/wallet', icon: Wallet },
  { name: 'Virtual Account', path: '/virtual-account', icon: CreditCard },
  { name: 'Services', path: '/services-app', icon: Zap }
]

const secondaryNavItems = [
  { name: 'Support', path: '/support', icon: CircleHelp },
  { name: 'Settings', path: '/profile', icon: Settings }
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = () => {
  // Add logout logic here
  console.log('Logging out...')
  router.push('/login')
}
</script>