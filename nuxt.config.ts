// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/image'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },
  app: {
    head: {
      title: 'Rechargify',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png'
        },
        
      ]
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFrom: process.env.RESEND_FROM,
    monnifyApiKey: process.env.MONNIFY_API_KEY,
    monnifySecretKey: process.env.MONNIFY_SECRET_KEY,
    monnifyContractCode: process.env.MONNIFY_CONTRACT_CODE,
    monnifyBaseUrl: process.env.MONNIFY_BASE_URL,
    allowedWebhookIPs: process.env.ALLOWED_WEBHOOK_IPS,
    public: {
      appUrl: process.env.APP_URL,
    },
  },
   build: {
    transpile: ['vue-toastification'],
  },
})
