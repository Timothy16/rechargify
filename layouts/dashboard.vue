<!-- layouts/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    
    <!-- Sidebar -->
    <DashboardSidebar />

    <!-- Main Content Area -->
    <div class="flex-1 lg:ml-64">
      
      <!-- Navbar -->
      <DashboardNavbar @toggle-mobile-menu="toggleMobileMenu" />

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
        @click="closeMobileMenu"
      ></div>
    </Transition>

    <!-- Mobile Sidebar -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside 
        v-if="isMobileMenuOpen"
        class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto"
      >
        <!-- Mobile Sidebar Content (Same as Desktop) -->
        <div class="p-6 border-b border-gray-200">
          <NuxtLink to="/dashboard" class="flex items-center space-x-2" @click="closeMobileMenu">
            <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Wallet :size="24" />
            </div>
            <span class="text-xl font-bold text-gray-900">Rechargify</span>
          </NuxtLink>
        </div>

        <nav class="flex-1 p-4 space-y-1">
          <NuxtLink 
            v-for="item in mainNavItems" 
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="isActive(item.path) ? 'bg-blue-50 text-[#0066FF]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            @click="closeMobileMenu"
          >
            <component :is="item.icon" :size="20" />
            <span>{{ item.name }}</span>
          </NuxtLink>

          <div class="pt-4 mt-4 border-t border-gray-200 space-y-1">
            <NuxtLink 
              v-for="item in secondaryNavItems" 
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              @click="closeMobileMenu"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </div>
        </nav>
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { 
  Wallet, 
  LayoutDashboard, 
  ArrowLeftRight, 
  CreditCard, 
  Zap, 
  CircleHelp, 
  Settings 
} from 'lucide-vue-next'

const route = useRoute()
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>