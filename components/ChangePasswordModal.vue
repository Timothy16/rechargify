<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div @click="$emit('close')" class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>

      <div class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-all">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066FF]">
              <Lock :size="20" />
            </div>
            <h2 class="text-xl font-bold text-gray-900">Change Password</h2>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600"><X :size="24" /></button>
        </div>

        <form @submit.prevent="handlePasswordUpdate" class="p-6 space-y-5">
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
            <div class="relative">
              <input v-model="passwords.current" :type="showCurrent ? 'text' : 'password'" required class="modal-input" placeholder="••••••••" />
              <button type="button" @click="showCurrent = !showCurrent" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><Eye v-if="!showCurrent" :size="18" /><EyeOff v-else :size="18" /></button>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
            <div class="relative">
              <input v-model="passwords.new" :type="showNew ? 'text' : 'password'" required class="modal-input" placeholder="••••••••" />
              <button type="button" @click="showNew = !showNew" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><Eye v-if="!showNew" :size="18" /><EyeOff v-else :size="18" /></button>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
            <input v-model="passwords.confirm" type="password" required class="modal-input" :class="{ 'border-red-300 bg-red-50': passwords.confirm && !passwordsMatch }" placeholder="••••••••" />
          </div>

          <div class="flex flex-col gap-3 pt-2">
            <button 
              type="submit" 
              :disabled="!isFormValid || isLoading" 
              class="w-full py-4 bg-[#0066FF] text-white rounded-xl font-bold hover:bg-[#0052CC] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
              {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Lock, X, Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close', 'success'])

const isLoading = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)
const passwords = ref({ current: '', new: '', confirm: '' })

const passwordsMatch = computed(() => passwords.value.new === passwords.value.confirm)
const isFormValid = computed(() => passwords.value.current && passwords.value.new.length >= 8 && passwordsMatch.value)

const handlePasswordUpdate = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  emit('success')
  emit('close')
  passwords.value = { current: '', new: '', confirm: '' }
}
</script>

<style scoped>
.modal-input {
  @apply w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none transition-all;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>