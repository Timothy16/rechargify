<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
        <p class="text-gray-500">Manage your personal information and account security</p>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div class="relative group">
          <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
            <img v-if="user.avatar" :src="user.avatar" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center bg-[#0066FF] text-white text-3xl font-bold">
              JD
            </div>
          </div>
          <label class="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Camera :size="16" class="text-[#0066FF]" />
            <input type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
          </label>
        </div>
        
        <div class="text-center sm:text-left flex-1">
          <h2 class="text-xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h2>
          <p class="text-gray-500 text-sm mb-3">Member since January 2024</p>
          <span class="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full inline-flex items-center gap-1">
            <ShieldCheck :size="12" /> Verified Account
          </span>
        </div>

        <button 
          @click="isEditing = !isEditing"
          class="px-5 py-2 rounded-lg border border-[#0066FF] text-[#0066FF] font-semibold text-sm hover:bg-blue-50 transition-all active:scale-95"
        >
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div class="flex items-center gap-2 mb-6 text-gray-900">
              <UserIcon :size="20" class="text-[#0066FF]" />
              <h3 class="font-bold text-lg">Personal Information</h3>
            </div>

            <form @submit.prevent="updateProfile" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                <input v-model="user.firstName" :disabled="!isEditing" type="text" class="input-field" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                <input v-model="user.lastName" :disabled="!isEditing" type="text" class="input-field" />
              </div>
              <div class="sm:col-span-2 space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input v-model="user.email" disabled type="email" class="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div v-if="isEditing" class="sm:col-span-2 pt-4">
                <button type="submit" class="w-full py-3 bg-[#0066FF] text-white rounded-lg font-bold hover:bg-[#0052CC] transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div class="flex items-center gap-2 mb-6 text-gray-900">
              <Lock :size="20" class="text-[#0066FF]" />
              <h3 class="font-bold text-lg">Security</h3>
            </div>
            
            <button 
              @click="showPasswordModal = true"
              class="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#0066FF]/30 hover:bg-blue-50/50 transition-all group"
            >
              <div class="flex items-center gap-3">
                <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                  <Key :size="18" class="text-gray-600" />
                </div>
                <span class="text-sm font-semibold text-gray-700">Change Password</span>
              </div>
              <ChevronRight :size="18" class="text-gray-400" />
            </button>
          </div>

          <div class="bg-red-50 rounded-2xl p-6 border border-red-100">
            <button class="text-red-500 text-sm font-semibold hover:text-red-700 transition-colors flex items-center gap-2">
              <LogOut :size="16" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        :is-open="showPasswordModal" 
        @close="showPasswordModal = false" 
        @success="onPasswordSuccess"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Camera, ShieldCheck, User as UserIcon, Lock, 
  Key, ChevronRight, LogOut 
} from 'lucide-vue-next'
import ChangePasswordModal from '~/components/ChangePasswordModal.vue'

definePageMeta({ layout: 'dashboard' })

const isEditing = ref(false)
const showPasswordModal = ref(false)

const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: null
})

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) user.value.avatar = URL.createObjectURL(file)
}

const updateProfile = () => {
  isEditing.value = false
  // Toast notification logic here
}

const onPasswordSuccess = () => {
  // Logic after password successfully changed
  console.log('Password updated successfully')
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500;
}
</style>