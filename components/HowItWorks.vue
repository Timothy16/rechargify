<!-- components/HowItWorks.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left - Image -->
        <div class="relative order-2 lg:order-1">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200&h=800" 
            alt="African team collaborating on fintech solutions" 
            class="rounded-3xl shadow-2xl border border-gray-100 w-full h-auto object-cover"
            loading="lazy"
            width="1200"
            height="800"
          >
        </div>

        <!-- Right - Content -->
        <div class="order-1 lg:order-2">
          <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
            HOW IT WORKS
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get started in minutes, not days
          </h2>
          <p class="text-xl text-gray-600 mb-10">
            We've streamlined the onboarding process so you can start using your account immediately. No long forms, no waiting periods, no frustration.
          </p>

          <!-- Steps -->
          <div class="space-y-8">
            <div 
              v-for="(step, index) in steps" 
              :key="step.title"
              class="flex gap-6 group"
            >
              <!-- Step Number -->
              <div class="flex-shrink-0">
                <div class="w-14 h-14 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>

              <!-- Step Content -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="text-2xl font-bold text-gray-900">
                    {{ step.title }}
                  </h4>
                  <div class="text-[#0066FF]">
                    <component :is="step.icon" :size="24" />
                  </div>
                </div>
                <p class="text-gray-600 text-lg leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <button 
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-[#0066FF] text-white hover:bg-[#0052CC] focus:ring-[#0066FF] shadow-sm hover:shadow-md h-14 px-8 text-lg mt-10 group"
            @click="handleStartJourney"
          >
            Start Your Journey
            <ArrowRight :size="20" class="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, CircleCheckBig, DollarSign, ArrowRight } from 'lucide-vue-next'

const router = useRouter()

const steps = [
  {
    title: 'Create Your Account',
    description: 'Sign up in under 2 minutes with just your phone number and email. No paperwork, no hassle.',
    icon: Users
  },
  {
    title: 'Add Payment Method',
    description: 'Link your bank account or debit card securely to fund your wallet and start enjoying seamless transactions.',
    icon: CircleCheckBig
  },
  {
    title: 'Start Transacting',
    description: 'Fund your wallet via bank transfer or card and start making payments, transfers, and purchases immediately.',
    icon: DollarSign
  }
]

const handleStartJourney = () => {
  router.push('/signup')
}
</script>