<!-- components/Header.vue -->
<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
            <Wallet :size="24" />
          </div>
          <span class="text-xl font-bold text-gray-900 tracking-tight">Rechargify</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium transition-colors duration-200 hover:text-[#0066FF]"
            :class="isActive(link.path) ? 'text-[#0066FF]' : 'text-gray-600'"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Desktop CTA Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink 
            to="/login" 
            class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Log in
          </NuxtLink>
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-9 px-4 text-sm"
            @click="handleGetStarted"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-white border-t border-gray-100 shadow-lg"
      >
        <nav class="px-4 py-6 space-y-4">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="block text-base font-medium transition-colors duration-200 py-2"
            :class="isActive(link.path) ? 'text-[#0066FF]' : 'text-gray-600 hover:text-gray-900'"
            @click="closeMobileMenu"
          >
            {{ link.name }}
          </NuxtLink>
          
          <div class="pt-4 space-y-3 border-t border-gray-100">
            <NuxtLink 
              to="/login" 
              class="block text-center text-base font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors"
              @click="closeMobileMenu"
            >
              Log in
            </NuxtLink>
            <button 
              class="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-11 px-4 text-base"
              @click="handleGetStarted"
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup >
import { Wallet, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
]

const isActive = (path) => {
  return route.path === path
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleGetStarted = () => {
  closeMobileMenu()
  router.push('/signup')
}

// Handle scroll effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>