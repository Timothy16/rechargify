<!-- pages/faq.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-grow pt-20">
      <FAQHero />
      <FAQContactOptions />
      <FAQQuestions />
      <FAQCTA />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// SEO Configuration for FAQ Page
useHead({
  title: 'Frequently Asked Questions (FAQ) - Rechargify | Help Center',
  meta: [
    {
      name: 'description',
      content: 'Find answers to common questions about Rechargify. Learn about account setup, transactions, security, fees, and more. 24/7 support available.'
    },
    {
      name: 'keywords',
      content: 'Rechargify faq, help center, customer support, account questions, transaction help, security questions, fintech support nigeria'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://Rechargify.com/faq'
    },
    {
      property: 'og:title',
      content: 'Frequently Asked Questions (FAQ) - Rechargify | Help Center'
    },
    {
      property: 'og:description',
      content: 'Find answers to common questions about Rechargify. 24/7 support available.'
    },
    {
      property: 'og:image',
      content: 'https://Rechargify.com/og-faq-image.jpg'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'https://Rechargify.com/faq'
    },
    {
      name: 'twitter:title',
      content: 'Frequently Asked Questions (FAQ) - Rechargify'
    },
    {
      name: 'twitter:description',
      content: 'Find answers to common questions about Rechargify. 24/7 support available.'
    },
    {
      name: 'twitter:image',
      content: 'https://Rechargify.com/twitter-faq-image.jpg'
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
      href: 'https://Rechargify.com/faq'
    }
  ]
})

// Schema.org structured data for FAQ page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I open an account with Rechargify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Opening an account with Rechargify is simple! Download our mobile app or visit our website, click "Sign Up," and follow the registration process. You\'ll need your phone number, email address, and a valid ID. The entire process takes less than 5 minutes.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a minimum balance required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Rechargify does not require a minimum balance. You can maintain any balance in your wallet, including zero. We believe in accessible banking for everyone.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long do transfers take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most transfers are completed instantly. Bank transfers typically take less than 1 minute, while transfers to other Rechargify users are immediate.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my money safe with Rechargify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely! Your funds are protected by bank-grade 256-bit encryption. We are licensed by the Central Bank of Nigeria and comply with all financial regulations. Your deposits are also insured.'
      }
    }
  ]
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