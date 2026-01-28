<!-- components/Security.vue -->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[#0066FF] rounded-3xl p-8 md:p-12 lg:p-20 text-white relative overflow-hidden">
        
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Your security is our top priority
            </h2>
            <p class="text-blue-100 text-xl mb-10 leading-relaxed">
              We use state-of-the-art encryption and fraud detection to keep your money safe 24/7. Your funds are insured and protected by multiple layers of security.
            </p>

            <!-- Security Features Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div 
                v-for="feature in securityFeatures" 
                :key="feature.title"
                class="flex items-start gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
              >
                <component 
                  :is="feature.icon" 
                  :size="32" 
                  class="text-blue-200 flex-shrink-0"
                />
                <div>
                  <div class="font-bold text-lg mb-1">
                    {{ feature.title }}
                  </div>
                  <div class="text-sm text-blue-200">
                    {{ feature.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative">
            <NuxtImg 
              src="https://res.cloudinary.com/dtmt0vas4/image/upload/v1769592024/ChatGPT_Image_Jan_28_2026_10_13_25_AM_g5lzjl.png" 
              alt="African woman confidently using secure mobile banking" 
              class="rounded-2xl shadow-2xl w-full h-auto object-cover"
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Lock, Shield, Globe, CircleCheckBig } from 'lucide-vue-next'

const securityFeatures = [
  {
    title: '256-bit Encryption',
    description: 'Military-grade data protection',
    icon: Lock
  },
  {
    title: 'Fraud Protection',
    description: 'Real-time monitoring & alerts',
    icon: Shield
  },
  {
    title: 'Global Compliance',
    description: 'Licensed & regulated by CBN',
    icon: Globe
  },
  {
    title: 'Insured Funds',
    description: 'Your money is protected',
    icon: CircleCheckBig
  }
]
</script>