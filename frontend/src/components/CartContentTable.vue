<template>
  <div>
    <b-table sticky-header :items="cart" :fields="fields" head-variant="light">
      <template v-slot:cell(action)="data">
        <button class="btn btn-danger" @click="removeCartItem(data.item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </template>
    </b-table>
    <!-- Ajout du bouton de paiement -->
    <div class="d-flex justify-content-end mt-3" v-if="cart.length > 0">
      <b-button variant="primary" @click.prevent="goToCheckout" class="px-4">
        Procéder au paiement
      </b-button>
    </div>
    <div
      class="w-100 empty d-flex justify-content-center p-5"
      v-if="cart.length === 0"
    >
      <div
        class="d-flex flex-column justify-content-center align-content-center"
      >
        <svg
          viewBox="0 0 24 24"
          width="54"
          height="54"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <p class="text-uppercase font-weight-bold">Empty</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import router from '../router';

export default {
  name: "CartContentTable",
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Product",
          sortable: true
        },
        {
          key: "quantity",
          label: "Quantity",
          sortable: true
        },
        {
          key: "weight",
          label: "Weight (lb)",
          sortable: true
        },
        {
          key: "price",
          label: "Price (DT)",
          sortable: true
        },
        {
          key: "action",
          label: "Action"
        }
      ]
    };
  },
  computed: {
    ...mapGetters('cart', ['cartItems']),
    cart() {
      return this.cartItems;
    }
  },
  methods: {
    ...mapMutations('cart', ['removeFromCart']),
    removeCartItem(id) {
      this.removeFromCart(id);
    },
    goToCheckout() {
      console.log('Bouton cliqué - Redirection vers le paiement');
      try {
        router.push('/checkout/stripe').catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Erreur de redirection:', err);
          }
        });
        this.$root.$emit('bv::hide::modal', 'my-modal');
      } catch (error) {
        console.error('Erreur de redirection:', error);
      }
    }
  }
};
</script>
<style scoped></style>
