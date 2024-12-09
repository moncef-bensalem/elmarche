<template>
  <div class="stripe-checkout">
    <div v-if="!paymentProcessing && !paymentSuccess" class="payment-form">
      <div id="card-element"></div>
      <div id="card-errors" role="alert" v-if="error" class="error">{{ error }}</div>
      <button @click="processPayment" :disabled="!stripe || !elements" class="pay-button">
        Pay {{ formatPrice(amount) }}
      </button>
    </div>
    <div v-if="paymentProcessing" class="processing">
      Processing payment...
    </div>
    <div v-if="paymentSuccess" class="success">
      Payment successful! Your order is being processed.
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { payments } from '@/services/api';

export default {
  name: 'StripeCheckout',
  props: {
    amount: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stripe: null,
      elements: null,
      card: null,
      error: null,
      paymentProcessing: false,
      paymentSuccess: false
    };
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');

    this.card.addEventListener('change', (event) => {
      if (event.error) {
        this.error = event.error.message;
      } else {
        this.error = null;
      }
    });
  },
  methods: {
    formatPrice(amount) {
      return `DT${(amount / 100).toFixed(2)}`;
    },
    async processPayment() {
      if (!this.stripe || !this.elements) {
        return;
      }

      this.paymentProcessing = true;
      this.error = null;

      try {
        // Get the payment intent client secret
        const response = await payments.createIntent(this.orderId);
        const { clientSecret } = response.data;

        // Confirm the payment
        const result = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
          }
        });

        if (result.error) {
          this.error = result.error.message;
          this.paymentProcessing = false;
        } else {
          this.paymentSuccess = true;
          this.$emit('payment-success', result.paymentIntent);
        }
      } catch (err) {
        this.error = err.message;
        this.paymentProcessing = false;
      }
    }
  },
  beforeDestroy() {
    if (this.card) {
      this.card.destroy();
    }
  }
};
</script>

<style scoped>
.stripe-checkout {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.payment-form {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#card-element {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.error {
  color: #dc3545;
  margin-bottom: 20px;
  font-size: 14px;
}

.pay-button {
  width: 100%;
  padding: 12px;
  background: #5469d4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.pay-button:disabled {
  background: #7a8adb;
  cursor: not-allowed;
}

.pay-button:hover:not(:disabled) {
  background: #4a5cc9;
}

.processing, .success {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}

.success {
  color: #28a745;
}
</style>
