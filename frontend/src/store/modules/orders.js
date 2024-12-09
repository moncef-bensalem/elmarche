import api from '@/config/api';

const state = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
};

const getters = {
    allOrders: state => state.orders,
    currentOrder: state => state.currentOrder,
    loading: state => state.loading,
    error: state => state.error
};

const mutations = {
    setOrders(state, orders) {
        state.orders = orders;
    },
    setCurrentOrder(state, order) {
        state.currentOrder = order;
    },
    addOrder(state, order) {
        state.orders.unshift(order);
    },
    updateOrder(state, updatedOrder) {
        const index = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
            state.orders.splice(index, 1, updatedOrder);
        }
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchOrders({ commit }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.get('/orders');
            commit('setOrders', response.data.data || response.data);
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Failed to fetch orders');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async fetchOrder({ commit }, orderId) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.get(`/orders/${orderId}`);
            commit('setCurrentOrder', response.data.data || response.data);
            return response.data;
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Failed to fetch order');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async createOrder({ commit, rootGetters }, { shippingAddress, paymentMethod }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const cartItems = rootGetters['cart/cartItems'];
            const orderData = {
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                shipping_address: shippingAddress,
                payment_method: paymentMethod,
                total: rootGetters['cart/cartTotal']
            };

            const response = await api.post('/orders', orderData);
            const order = response.data.data || response.data;
            commit('addOrder', order);
            commit('cart/clearCart', null, { root: true });
            return order;
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Failed to create order');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async updateOrderStatus({ commit }, { orderId, status }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.put(`/orders/${orderId}/status`, { status });
            const updatedOrder = response.data.data || response.data;
            commit('updateOrder', updatedOrder);
            return updatedOrder;
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Failed to update order status');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};