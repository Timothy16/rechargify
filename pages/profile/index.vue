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
            <img v-if="profileData.avatar" :src="profileData.avatar" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
              {{ userInitials }}
            </div>
          </div>
          <label class="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Camera :size="16" class="text-[#0066FF]" />
            <input type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" :disabled="isUploadingAvatar" />
          </label>
        </div>
        
        <div class="text-center sm:text-left flex-1">
          <h2 class="text-xl font-bold text-gray-900">{{ profileData.firstName }} {{ profileData.lastName }}</h2>
          <p class="text-gray-500 text-sm mb-3">Member since {{ memberSince }}</p>
          <span v-if="authStore.user?.isEmailVerified" class="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full inline-flex items-center gap-1">
            <ShieldCheck :size="12" /> Verified Account
          </span>
          <span v-else class="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full inline-flex items-center gap-1">
            <AlertCircle :size="12" /> Email Not Verified
          </span>
        </div>

        <button 
          @click="toggleEdit"
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
                <input v-model="profileData.firstName" :disabled="!isEditing" type="text" class="input-field" required />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                <input v-model="profileData.lastName" :disabled="!isEditing" type="text" class="input-field" required />
              </div>
              <div class="sm:col-span-2 space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input v-model="profileData.email" disabled type="email" class="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div v-if="isEditing" class="sm:col-span-2 pt-4">
                <button type="submit" :disabled="isUpdating" class="w-full py-3 bg-[#0066FF] text-white rounded-lg font-bold hover:bg-[#0052CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ isUpdating ? 'Saving...' : 'Save Changes' }}
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
            <button @click="handleLogout" :disabled="isLoggingOut" class="text-red-500 text-sm font-semibold hover:text-red-700 transition-colors flex items-center gap-2 disabled:opacity-50">
              <LogOut :size="16" /> {{ isLoggingOut ? 'Signing Out...' : 'Sign Out' }}
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
import { 
  Camera, ShieldCheck, User as UserIcon, Lock, 
  Key, ChevronRight, LogOut, AlertCircle 
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'
import ChangePasswordModal from '~/components/ChangePasswordModal.vue'
import { useToast } from 'vue-toastification';

definePageMeta({ 
  layout: 'dashboard',
  middleware: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isEditing = ref(false)
const isUpdating = ref(false)
const isUploadingAvatar = ref(false)
const isLoggingOut = ref(false)
const showPasswordModal = ref(false)

const profileData = ref({
  firstName: '',
  lastName: '',
  email: '',
  avatar: null
})

const userInitials = computed(() => {
  if (!profileData.value.firstName || !profileData.value.lastName) return 'U'
  return `${profileData.value.firstName.charAt(0)}${profileData.value.lastName.charAt(0)}`.toUpperCase()
})

const memberSince = computed(() => {
  if (!authStore.user?.createdAt) return 'Recently'
  const date = new Date(authStore.user.createdAt)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const loadProfile = () => {
  if (authStore.user) {
    profileData.value = {
      firstName: authStore.user.firstName || '',
      lastName: authStore.user.lastName || '',
      email: authStore.user.email || '',
      avatar: authStore.user.avatar || null
    }
  }
}

const toggleEdit = () => {
  if (isEditing.value) {
    loadProfile() // Reset to original values
  }
  isEditing.value = !isEditing.value
}

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    toast.error('Invalid file type. Only JPEG, PNG, and WebP images are allowed')
    return
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('File size too large. Maximum size is 5MB')
    return
  }

  isUploadingAvatar.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await $fetch('/api/auth/upload-avatar', {
      method: 'POST',
      body: formData
    })

    if (response.success) {
      profileData.value.avatar = response.avatar
      
      // Update profile with new avatar
      await $fetch('/api/auth/update-profile', {
        method: 'POST',
        body: {
          firstName: profileData.value.firstName,
          lastName: profileData.value.lastName,
          avatar: response.avatar
        }
      })

      await authStore.fetchProfile()
      toast.success('Avatar updated successfully')
    }
  } catch (error) {
    toast.error(error.data?.message || 'Failed to upload avatar')
  } finally {
    isUploadingAvatar.value = false
  }
}

const updateProfile = async () => {
  isUpdating.value = true

  try {
    const response = await $fetch('/api/auth/update-profile', {
      method: 'POST',
      body: {
        firstName: profileData.value.firstName,
        lastName: profileData.value.lastName,
        avatar: profileData.value.avatar
      }
    })

    if (response.success) {
      await authStore.fetchProfile()
      isEditing.value = false
      toast.success('Profile updated successfully')
    }
  } catch (error) {
    toast.error(error.data?.message || 'Failed to update profile')
  } finally {
    isUpdating.value = false
  }
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

const onPasswordSuccess = () => {
  toast.success('Password changed successfully')
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500;
}
</style>