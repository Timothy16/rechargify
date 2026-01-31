<template>
  <main class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <div v-if="currentStep !== 'success' && currentStep !== 'processing'" class="mb-8">
        <button 
          @click="goBack" 
          class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors text-sm font-medium"
        >
          <ArrowLeft class="w-4 h-4 mr-2" /> Back {{ backButtonText }}
        </button>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ pageTitle }}</h1>
        <p class="text-gray-600">{{ pageSubtitle }}</p>
      </div>

      <div  class="grid grid-cols-1 gap-8 transition-all duration-300"
  :class="currentStep === 'list' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'">
        <div class="lg:col-span-2">
          <component 
            :is="steps[currentStep]" 
            v-model="formData"
            :selectedCard="formData.card"
            @next="nextStep"
            @prev="goBack"
            @select-card="handleCardSelection"
          />
        </div>

        <div v-if="currentStep !== 'list' && currentStep !== 'success' && currentStep !== 'processing'" class="space-y-6">
          <GiftCardSidebar />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';

definePageMeta({
  layout: 'dashboard'
})

// Components
import GiftCardGrid from '~/components/GiftCard/Grid.vue';
import PurchaseAmount from '~/components/GiftCard/PurchaseAmount.vue';
import RecipientForm from '~/components/GiftCard/RecipientForm.vue';
import ConfirmPurchase from '~/components/GiftCard/ConfirmPurchase.vue';
import ProcessingStep from '~/components/GiftCard/ProcessingStep.vue';
import SuccessView from '~/components/GiftCard/SuccessView.vue';
import GiftCardSidebar from '~/components/GiftCard/Sidebar.vue';

const currentStep = ref('list');
const formData = ref({
  card: null,
  amount: '',
  recipientName: '',
  recipientEmail: '',
  message: ''
});

const steps = {
  list: GiftCardGrid,
  amount: PurchaseAmount,
  recipient: RecipientForm,
  confirm: ConfirmPurchase,
  processing: ProcessingStep,
  success: SuccessView
};

// State logic
const pageTitle = computed(() => formData.value.card ? `${formData.value.card.name} Gift Card` : 'Gift Cards');
const pageSubtitle = computed(() => formData.value.card ? 'Purchase a digital gift card instantly' : 'Purchase gift cards for your favorite brands');
const backButtonText = computed(() => currentStep.value === 'list' ? '' : 'to Gift Cards');

const handleCardSelection = (card) => {
  formData.value.card = card;
  currentStep.value = 'amount';
};

const nextStep = (step) => {
  currentStep.value = step;
  if (step === 'processing') {
    // Simulate API Call
    setTimeout(() => { currentStep.value = 'success'; }, 3000);
  }
};

const goBack = () => {
  const flow = ['list', 'amount', 'recipient', 'confirm'];
  const currentIndex = flow.indexOf(currentStep.value);
  if (currentIndex > 0) {
    currentStep.value = flow[currentIndex - 1];
  } else {
    // Navigate away or reset
    formData.value.card = null;
  }
};
</script>