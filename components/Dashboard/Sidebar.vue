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
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
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
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <!-- Avatar or Initials -->
        <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <img 
            v-if="userAvatar" 
            :src="userAvatar" 
            :alt="userName"
            class="w-full h-full object-cover" 
          />
          <div 
            v-else 
            class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <span class="text-white font-semibold text-sm">{{ userInitials }}</span>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-900 truncate">
            {{ userName }}
          </div>
          <div class="text-xs text-gray-500 truncate">
            {{ userEmail }}
          </div>
        </div>
      </NuxtLink>

      <!-- Logout Button -->
      <button 
        @click="handleLogout"
        :disabled="isLoggingOut"
        class="w-full mt-2 flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut :size="16" />
        <span>{{ isLoggingOut ? 'Logging out...' : 'Log out' }}</span>
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
  LogOut 
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import { useToast } from 'vue-toastification';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const isLoggingOut = ref(false)

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

const userName = computed(() => {
  if (!authStore.user) return 'Loading...'
  return authStore.user.name || `${authStore.user.firstName} ${authStore.user.lastName}` || 'User'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'email@example.com'
})

const userAvatar = computed(() => {
  return authStore.user?.avatar || null
})

const userInitials = computed(() => {
  if (!authStore.user) return 'U'
  const firstName = authStore.user.firstName || ''
  const lastName = authStore.user.lastName || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U'
})

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = async () => {
  isLoggingOut.value = true
  
  const success = await authStore.logout()
  
  if (success) {
    toast.success('Logged out successfully')
    router.push('/login')
  } else {
    authStore.clearProfile()
    router.push('/login')
  }
  
  isLoggingOut.value = false
}
</script>