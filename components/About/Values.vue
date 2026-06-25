<!-- components/About/Values.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-4 block">
          OUR VALUES
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The principles that guide us
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          These core values shape every decision we make and every product we build.
        </p>
      </div>

      <!-- Values Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(value, index) in values"
          :key="value.title"
          class="opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="bg-white rounded-xl shadow-sm overflow-hidden p-8 h-full
                   border border-gray-100"
            :class="value.bgClass"
          >
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
              <component :is="value.icon" :size="32" class="text-[#0066FF]" />
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Target, Users, Heart, Zap, Shield, Globe } from 'lucide-vue-next'

const values = [
  {
    title: 'Simplicity',
    description:
      'We believe paying bills should be easy. Our platform is designed to make everyday payments simple, fast, and stress-free.',
    icon: Target,
    bgClass: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10'
  },
  {
    title: 'Customer First',
    description:
      'Everything we build starts with our customers. We are committed to delivering the best payment experience every time.',
    icon: Users,
    bgClass: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10'
  },
  {
    title: 'Transparency',
    description:
      'No hidden charges and no surprises. We believe in clear pricing and honest service you can trust.',
    icon: Heart,
    bgClass: 'bg-gradient-to-br from-green-500/10 to-green-600/10'
  },
  {
    title: 'Innovation',
    description:
      'We continuously improve our platform to deliver faster, smarter, and more convenient ways to pay for everyday services.',
    icon: Zap,
    bgClass: 'bg-gradient-to-br from-orange-500/10 to-orange-600/10'
  },
  {
    title: 'Security First',
    description:
      'Your data and transactions are protected with industry-standard security so you can pay with confidence.',
    icon: Shield,
    bgClass: 'bg-gradient-to-br from-red-500/10 to-red-600/10'
  },
  {
    title: 'Reliability',
    description:
      'We are committed to providing a dependable platform that keeps your essential payments running anytime, anywhere.',
    icon: Globe,
    bgClass: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10'
  }
]
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
