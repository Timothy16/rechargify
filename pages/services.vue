<!-- pages/services.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-grow pt-20">
      <ServicesHero />
      <ServicesWalletServices />
      <ServicesBillPayments />
      <ServicesDigitalProducts />
      <ServicesWhyChooseUs />
      <ServicesServicesCTA />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// SEO Configuration for Services Page
useHead({
  title: 'Our Services - Rechargify | Digital Wallet, Bill Payments & More',
  meta: [
    {
      name: 'description',
      content: 'Explore Rechargify\'s comprehensive financial services: Digital Wallet, Virtual Accounts, Airtime Top-up, Data Bundles, Gift Cards, and Utility Bill Payments. Fast, secure, and affordable.'
    },
    {
      name: 'keywords',
      content: 'digital wallet africa, bill payments nigeria, airtime topup, data bundles, gift cards, utility bills, virtual account number, fintech services'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://Rechargify.com/services'
    },
    {
      property: 'og:title',
      content: 'Our Services - Rechargify | Digital Wallet, Bill Payments & More'
    },
    {
      property: 'og:description',
      content: 'Explore Rechargify\'s comprehensive financial services for everyday transactions. Fast, secure, and affordable.'
    },
    {
      property: 'og:image',
      content: 'https://Rechargify.com/og-services-image.jpg'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'https://Rechargify.com/services'
    },
    {
      name: 'twitter:title',
      content: 'Our Services - Rechargify | Digital Wallet, Bill Payments & More'
    },
    {
      name: 'twitter:description',
      content: 'Explore Rechargify\'s comprehensive financial services for everyday transactions.'
    },
    {
      name: 'twitter:image',
      content: 'https://Rechargify.com/twitter-services-image.jpg'
    },
    // Additional SEO tags
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'author',
      content: 'Rechargify Technologies'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://Rechargify.com/services'
    }
  ]
})

// Schema.org structured data for Services page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rechargify Financial Services',
  description: 'Comprehensive digital financial services including digital wallet, bill payments, airtime top-up, data bundles, gift cards, and utility payments.',
  provider: {
    '@type': 'Organization',
    name: 'Rechargify',
    url: 'https://Rechargify.com'
  },
  areaServed: {
    '@type': 'Country',
    name: 'Nigeria'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Rechargify Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Wallet',
          description: 'Multi-currency digital wallet with instant deposits and zero maintenance fees'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bill Payments',
          description: 'Pay for electricity, water, cable TV, and internet bills with zero service fees'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Airtime & Data',
          description: 'Instant airtime top-up and data bundles for all major networks with cashback rewards'
        }
      }
    ]
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData)
    }
  ]
})
</script>