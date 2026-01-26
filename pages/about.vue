<!-- pages/about.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-grow pt-20">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutTrust />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// SEO Configuration for About Page
useHead({
  title: 'About Us - Rechargify | Building the Future of African Finance',
  meta: [
    {
      name: 'description',
      content: 'Learn about Rechargify\'s mission to democratize financial services across Africa. Discover our story, values, and commitment to empowering 50,000+ users with secure digital banking.'
    },
    {
      name: 'keywords',
      content: 'Rechargify about, african fintech company, digital banking africa, fintech mission, financial inclusion africa, licensed fintech nigeria'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://Rechargify.com/about'
    },
    {
      property: 'og:title',
      content: 'About Us - Rechargify | Building the Future of African Finance'
    },
    {
      property: 'og:description',
      content: 'Learn about Rechargify\'s mission to democratize financial services across Africa. Trusted by 50,000+ users.'
    },
    {
      property: 'og:image',
      content: 'https://Rechargify.com/og-about-image.jpg'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'https://Rechargify.com/about'
    },
    {
      name: 'twitter:title',
      content: 'About Us - Rechargify | Building the Future of African Finance'
    },
    {
      name: 'twitter:description',
      content: 'Learn about Rechargify\'s mission to democratize financial services across Africa.'
    },
    {
      name: 'twitter:image',
      content: 'https://Rechargify.com/twitter-about-image.jpg'
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
      href: 'https://Rechargify.com/about'
    }
  ]
})

// Schema.org structured data for About page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Rechargify',
  description: 'Rechargify is democratizing financial services across Africa with fast, secure, and affordable digital banking solutions.',
  url: 'https://Rechargify.com/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'Rechargify',
    foundingDate: '2021',
    numberOfEmployees: '45+',
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NG'
      }
    }
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