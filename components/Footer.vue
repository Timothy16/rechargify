<!-- components/Footer.vue -->
<template>
  <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand Column -->
        <div class="col-span-1 md:col-span-1">
          <NuxtLink to="/" class="flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center text-white">
              <Wallet :size="20" />
            </div>
            <span class="text-lg font-bold text-gray-900">Rechargify</span>
          </NuxtLink>
          
          <p class="text-gray-500 text-sm leading-relaxed mb-6">
            Modern financial solutions for everyone. Secure, fast, and reliable payments for your business and personal needs.
          </p>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="text-gray-400 hover:text-[#0066FF] transition-colors"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" :size="20" />
            </a>
          </div>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Company</h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-500 hover:text-[#0066FF] text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Products Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Products</h3>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-500 hover:text-[#0066FF] text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Legal</h3>
          <ul class="space-y-3">
            <li v-for="link in legalLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-500 hover:text-[#0066FF] text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-sm text-center md:text-left">
          © {{ currentYear }} Rechargify Technologies. All rights reserved.
        </p>
        
        <div class="flex items-center space-x-2">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-gray-400 text-sm">All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Wallet, Twitter, Linkedin, Facebook, Instagram } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/Rechargify', icon: Twitter },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/Rechargify', icon: Linkedin },
  { name: 'Facebook', url: 'https://facebook.com/Rechargify', icon: Facebook },
  { name: 'Instagram', url: 'https://instagram.com/Rechargify', icon: Instagram }
]

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const productLinks = [
  { name: 'Wallet', path: '#' },
  { name: 'Virtual Cards', path: '#' },
  { name: 'Bill Payments', path: '#' },
  { name: 'Exchange', path: '#' },
  { name: 'Business', path: '#' }
]

const legalLinks = [
  { name: 'Privacy Policy', path: '#' },
  { name: 'Terms of Service', path: '#' },
  { name: 'Cookie Policy', path: '#' },
]
</script>