<template>
    <div>
        <button type="button" class="btn-custom-outline-violet px-3 py-2 mt-3" @click="showModal(product.id)">Dt{{ product.price }} | A PIECE</button>
        <br>
        <small class="text-dark mt-2">Click to Show</small>
        <b-modal :ref="product.id" size="xl" centered hide-footer title="Add this product to cart?">
            <div class="row">
                <div class="col-lg-5">
                    <b-img :src="product.image_url || '/images/products/' + product.image" class="mr-1" fluid alt="Responsive image"></b-img>
                </div>
                <div class="col-lg-7 d-block text-center h-100">
                    <div class="info-container">
                        <label>Name</label>
                        <h4>{{ product.name }}</h4>
                    </div>
                    <div class="info-container">
                        <label>Description</label>
                        <p class="description">{{ product.description }}</p>
                    </div>
                    <div class="row">
                        <div class="info-container col-4">
                            <label>Weight</label>
                            <h5>lb {{ product.weight }}</h5>
                        </div>
                        <div class="info-container col-4">
                            <label>Available</label>
                            <h5>{{ product.units }}</h5>
                        </div>
                        <div class="info-container col-4">
                            <label>Price</label>
                            <h5>DT{{ product.price }}</h5>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-6">
                            <p>Quantity</p>
                            <b-input-group prepend="Item">
                                <b-form-input type="number" v-model="order.quantity" min="1" :max="product.units" aria-label="Text input with checkbox"></b-form-input>
                            </b-input-group>
                        </div>
                        <div class="col-sm-6">
                            <p>Total Price</p>
                            <b-input-group prepend="DT" append="Total">
                                <b-form-input readonly v-model="order.total_price"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <b-button class="mt-3 mx-1 py-2" variant="danger" block @click="removeFromCart(product.id)" v-if="in_cart">Remove from cart</b-button>
                <b-button class="mt-3 mx-1 py-2" variant="success" block @click="productToCart(product.id)">Add to Cart</b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';

    export default {
        name: "ModalAddToCart",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                in_cart: false,
                order: {
                    quantity: 1,
                    total_price: 0,
                    total_weight: 0
                }
            };
        },
        methods: {
            ...mapMutations('cart', ['addToCart']),
            showModal(modal_ref) {
                this.$refs[`${modal_ref}`].show();
            },
            productToCart(id) {
                const add_product = {
                    id: this.product.id,
                    name: this.product.name,
                    weight: this.order.total_weight || this.product.weight,
                    price: this.order.total_price || this.product.price,
                    quantity: this.order.quantity || 1
                };
                this.addToCart(add_product);
                this.$refs[`${id}`].hide();
                this.in_cart = true;
            }
        },
        watch: {
            "order.quantity": function(val) {
                this.order.total_price = parseFloat(val) * parseFloat(this.product.price);
                this.order.total_weight = parseFloat(val) * parseFloat(this.product.weight);
            }
        },
        created() {
            this.order.total_price = parseFloat(this.product.price);
            this.order.total_weight = parseFloat(this.product.weight);
        }
    };
</script>
<style scoped>
    button:hover {
        transition: 1s;
    }

    .description {
        max-height: 110px;
        overflow-y: scroll;
    }

    .info-wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
    }
</style>