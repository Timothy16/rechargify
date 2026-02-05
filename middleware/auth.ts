// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Run on client side only
  if (import.meta.server) return;

  const authStore = useAuthStore();

  // Check if user is already loaded
  if (!authStore.user) {
    // Try to fetch profile
    const success = await authStore.fetchProfile();
    
    if (!success) {
      // Not authenticated - redirect to login
      return navigateTo('/login', { replace: true });
    }
  }
});