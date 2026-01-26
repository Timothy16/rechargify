<!-- pages/contact.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-grow pt-20">
      <ContactHero />
      <ContactCards />
      <ContactForm />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// SEO Configuration for Contact Page
useHead({
  title: 'Contact Us - Rechargify | Get in Touch with Our Support Team',
  meta: [
    {
      name: 'description',
      content: 'Contact Rechargify support team. Available 24/7 via live chat, email, or phone. Get answers to your questions about digital banking, payments, and more.'
    },
    {
      name: 'keywords',
      content: 'contact Rechargify, customer support, help center, fintech support nigeria, contact us, phone support, email support, live chat'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://Rechargify.com/contact'
    },
    {
      property: 'og:title',
      content: 'Contact Us - Rechargify | Get in Touch with Our Support Team'
    },
    {
      property: 'og:description',
      content: 'Contact Rechargify support team. Available 24/7 via live chat, email, or phone.'
    },
    {
      property: 'og:image',
      content: 'https://Rechargify.com/og-contact-image.jpg'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'https://Rechargify.com/contact'
    },
    {
      name: 'twitter:title',
      content: 'Contact Us - Rechargify'
    },
    {
      name: 'twitter:description',
      content: 'Contact Rechargify support team. Available 24/7.'
    },
    {
      name: 'twitter:image',
      content: 'https://Rechargify.com/twitter-contact-image.jpg'
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
      href: 'https://Rechargify.com/contact'
    }
  ]
})

// Schema.org structured data for Contact page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Rechargify',
  description: 'Contact Rechargify for support and inquiries. Available 24/7 via multiple channels.',
  url: 'https://Rechargify.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Rechargify',
    url: 'https://Rechargify.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+234-800-123-4567',
        contactType: 'Customer Service',
        areaServed: 'NG',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        }
      },
      {
        '@type': 'ContactPoint',
        email: 'support@Rechargify.com',
        contactType: 'Customer Support',
        areaServed: 'NG',
        availableLanguage: 'English'
      }
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '123 Victoria Island',
        addressLocality: 'Lagos',
        addressCountry: 'NG'
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '456 Central Business District',
        addressLocality: 'Abuja',
        addressCountry: 'NG'
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