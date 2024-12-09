import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import products from './modules/products';
import cart from './modules/cart';
import orders from './modules/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    appLoader: false
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setAppLoader(state, value) {
      state.appLoader = value;
    }
  },
  actions: {
    toggleLoader({ commit, state }) {
      commit('setAppLoader', !state.appLoader);
    },
    getProducts({ dispatch }) {
      return dispatch('products/fetchProducts', null, { root: true });
    }
  },
  getters: {
    isLoading: state => state.loading,
    error: state => state.error,
    appLoader: state => state.appLoader,
    token: (state, getters) => getters['auth/token']
  },
  modules: {
    auth,
    products,
    cart,
    orders
  }
});
