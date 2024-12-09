const state = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    loading: false,
    error: null
};

const getters = {
    cartItems: state => state.items,
    cartTotal: state => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartItemCount: state => state.items.reduce((count, item) => count + item.quantity, 0),
    loading: state => state.loading,
    error: state => state.error
};

const mutations = {
    addToCart(state, product) {
        const existingProduct = state.items.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            state.items.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, productId) {
        state.items = state.items.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity(state, { productId, quantity }) {
        const product = state.items.find(item => item.id === productId);
        if (product) {
            product.quantity = Math.max(0, quantity);
            if (product.quantity === 0) {
                state.items = state.items.filter(item => item.id !== productId);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    },
    clearCart(state) {
        state.items = [];
        localStorage.removeItem('cart');
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    }
};

const actions = {
    addProduct({ commit }, product) {
        commit('addToCart', product);
    },
    removeProduct({ commit }, productId) {
        commit('removeFromCart', productId);
    },
    updateProductQuantity({ commit }, payload) {
        commit('updateQuantity', payload);
    },
    clearCartItems({ commit }) {
        commit('clearCart');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};