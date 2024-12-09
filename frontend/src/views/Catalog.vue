<template>
  <main class="container mb-5">
    <div>
      <section class="row align-items-center m-5">
        <div class="h-400 col-12 text-center text-dark">
          <h2 class="font-weight-light featured-header text-inner-shadow-violet">Products</h2>
        </div>
      </section>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <!-- Products Grid -->
      <div v-else class="row mt-5">
        <div 
          v-for="(product, index) in products" 
          :key="product.id"
          class="col-md-4"
          data-aos="fade-up"
          data-aos-offset="50"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <div class="card mb-4 box-shadow">
            <img 
              class="card-img-top" 
              :src="product.image_url || 'https://via.placeholder.com/250'" 
              @error="imgError(index)" 
              alt="Product image" 
            />
            <div class="card-body">
              <h4>{{ product.name }}</h4>
              <p class="card-text description">{{ product.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <ModalAddToCart :product="product" />
                </div>
                <p class="text-secondary font-weight-bold">{{ product.weight }} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalAddToCart from "../components/ModalAddToCart";

export default {
  name: 'Catalog',
  components: {
    ModalAddToCart
  },
  computed: {
    ...mapState('products', ['products', 'loading', 'error'])
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    imgError(index) {
      this.products[index].image_url = 'https://via.placeholder.com/250';
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.description {
  min-height: 48px;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-img-top {
  height: 250px;
  object-fit: cover;
}

.featured-header {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
}

.text-inner-shadow-violet {
  text-shadow: 1px 1px 2px rgba(102, 51, 153, 0.3);
}
</style>