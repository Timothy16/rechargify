<!-- pages/index.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-grow pt-20">
      <Hero />
      <Features />
      <HowItWorks />
      <Security />
      <Trust />
      <CTA />
    </main>
    
    <Footer />
  </div>
</template>

<script setup >
// SEO Configuration
useHead({
  title: 'Rechargify - Modern Banking Made Simple for Africa',
  meta: [
    {
      name: 'description',
      content: 'Send money, pay bills, and manage your finances with Rechargify. Trusted by 50,000+ Africans. Fast, secure, and reliable digital banking solutions for everyone.'
    },
    {
      name: 'keywords',
      content: 'digital banking africa, mobile money, send money africa, pay bills online, virtual cards, fintech africa, online banking nigeria, money transfer'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://Rechargify.com'
    },
    {
      property: 'og:title',
      content: 'Rechargify - Modern Banking Made Simple for Africa'
    },
    {
      property: 'og:description',
      content: 'Send money, pay bills, and manage your finances with Rechargify. Trusted by 50,000+ Africans.'
    },
    {
      property: 'og:image',
      content: 'https://Rechargify.com/og-image.jpg'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'https://Rechargify.com'
    },
    {
      name: 'twitter:title',
      content: 'Rechargify - Modern Banking Made Simple for Africa'
    },
    {
      name: 'twitter:description',
      content: 'Send money, pay bills, and manage your finances with Rechargify. Trusted by 50,000+ Africans.'
    },
    {
      name: 'twitter:image',
      content: 'https://Rechargify.com/twitter-image.jpg'
    },
    // Additional SEO tags
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'author',
      content: 'Rechargify Technologies'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      httpEquiv: 'X-UA-Compatible',
      content: 'IE=edge'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://Rechargify.com'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

// Schema.org structured data for better SEO - Added as script tags
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Rechargify',
      description: 'Modern digital banking solutions for Africa',
      url: 'https://Rechargify.com',
      logo: 'https://Rechargify.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-XXX-XXX-XXXX',
        contactType: 'Customer Service',
        areaServed: 'NG',
        availableLanguage: 'en'
      },
      sameAs: [
        'https://twitter.com/Rechargify',
        'https://facebook.com/Rechargify',
        'https://linkedin.com/company/Rechargify',
        'https://instagram.com/Rechargify'
      ]
    },
    {
      '@type': 'WebSite',
      name: 'Rechargify',
      url: 'https://Rechargify.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://Rechargify.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'FinancialService',
      name: 'Rechargify',
      image: 'https://Rechargify.com/logo.png',
      description: 'Digital banking platform offering wallet services, virtual cards, bill payments, and international transfers across Africa.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NG'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2547'
      }
    }
  ]
}

// Add structured data script to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData)
    }
  ]
})
</script>

<style>
/* Global styles can be added here if needed */
</style>