<!-- components/FAQ/FAQQuestions.vue -->
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-16">
        
        <!-- Category Block -->
        <div 
          v-for="category in categories" 
          :key="category.title"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-4 mb-8">
            <span class="text-4xl">{{ category.emoji }}</span>
            <h2 class="text-3xl font-bold text-gray-900">
              {{ category.title }}
            </h2>
          </div>

          <!-- Questions Accordion -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-8">
            <div class="w-full">
              <div 
                v-for="(question, index) in category.questions" 
                :key="question"
                class="border-b border-gray-200 last:border-0"
              >
                <button 
                  class="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                  :aria-expanded="openQuestion === `${category.title}-${index}`"
                  @click="toggleQuestion(`${category.title}-${index}`)"
                >
                  <span class="text-lg font-medium transition-colors duration-200 text-gray-900 group-hover:text-[#0066FF]">
                    {{ question }}
                  </span>
                  <ChevronDown 
                    :size="20" 
                    class="text-gray-500 transition-all duration-300 group-hover:text-[#0066FF]"
                    :class="{ 'rotate-180': openQuestion === `${category.title}-${index}` }"
                  />
                </button>

                <!-- Answer (shown when expanded) -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <div 
                    v-if="openQuestion === `${category.title}-${index}`"
                    class="pb-6 text-gray-600 leading-relaxed"
                  >
                    {{ getAnswer(category.title, index) }}
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'

const openQuestion = ref(null)

const categories = [
  {
    emoji: '💳',
    title: 'Account & Wallet',
    questions: [
      'How do I open an account with Rechargify?',
      'Is there a minimum balance required?',
      'How do I fund my wallet?',
      'Can I have multiple wallets?',
      'What happens if I forget my password?'
    ]
  },
  {
    emoji: '💸',
    title: 'Payments & Transactions',
    questions: [
      'How long do transfers take?',
      'What are your transaction fees?',
      'Can I reverse a transaction?',
      'What are my transaction limits?',
      'Do you charge for failed transactions?'
    ]
  },
  {
    emoji: '🔒',
    title: 'Security & Privacy',
    questions: [
      'Is my money safe with Rechargify?',
      'What if I lose my phone?',
      'How do you protect my personal information?',
      'What should I do if I notice suspicious activity?'
    ]
  }
]

const toggleQuestion = (questionId) => {
  openQuestion.value = openQuestion.value === questionId ? null : questionId
}

const getAnswer = (category, index) => {
  // Sample answers - replace with actual content
  const answers = {
    'Account & Wallet': [
      'Opening an account with Rechargify is simple! Download our mobile app or visit our website, click "Sign Up," and follow the registration process. You\'ll need your phone number, email address, and a valid ID. The entire process takes less than 5 minutes.',
      'No, Rechargify does not require a minimum balance. You can maintain any balance in your wallet, including zero. We believe in accessible banking for everyone.',
      'You can fund your wallet through bank transfer, debit card, USSD code, or at any of our agent locations. All deposits are instant and there are no hidden charges.',
      'Yes! You can create multiple wallets for different currencies or purposes. This helps you organize your finances better and manage your money more efficiently.',
      'Simply click on "Forgot Password" on the login screen. We\'ll send a verification code to your registered phone number or email. Use this code to reset your password securely.'
    ],
    'Payments & Transactions': [
      'Most transfers are completed instantly. Bank transfers typically take less than 1 minute, while transfers to other Rechargify users are immediate.',
      'Rechargify offers competitive and transparent fees. Wallet-to-wallet transfers are free. Bank transfers have a flat fee of ₦10. Bill payments have no additional service charges.',
      'Transaction reversal depends on the type of transaction. If you sent money to a wrong Rechargify account, contact our support team immediately. For bank transfers, reversal requests are processed within 24-48 hours.',
      'Transaction limits depend on your account verification level. Basic accounts can transact up to ₦50,000 daily. Fully verified accounts have limits up to ₦5,000,000 daily.',
      'No, we do not charge for failed transactions. If a transaction fails, the amount is immediately returned to your wallet at no cost to you.'
    ],
    'Security & Privacy': [
      'Yes, absolutely! Your funds are protected by bank-grade 256-bit encryption. We are licensed by the Central Bank of Nigeria and comply with all financial regulations. Your deposits are also insured.',
      'If you lose your phone, immediately contact our support team to temporarily freeze your account. You can also log in from another device and change your password. We recommend enabling two-factor authentication for extra security.',
      'We use industry-leading encryption to protect your personal information. Your data is stored securely and we never share it with third parties without your explicit consent. We comply with all data protection regulations.',
      'Contact our support team immediately at support@Rechargify.com or call +234 800 123 4567. We\'ll investigate the activity, freeze your account if necessary, and help secure your funds. We have 24/7 fraud monitoring in place.'
    ]
  }

  return answers[category]?.[index] || 'Answer coming soon...'
}
</script>