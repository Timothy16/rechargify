<!-- components/About/Hero.vue -->
<template>
  <section class="relative bg-[#0066FF] py-24 text-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div :class="{ 'animate-fade-in-up': isVisible }">
        <span class="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
          Our Story
        </span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Building the future of <br>African finance
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
          Rechargify is on a mission to democratize financial services across Africa. We believe that everyone deserves access to fast, secure, and affordable financial tools that empower growth and prosperity.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
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
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>