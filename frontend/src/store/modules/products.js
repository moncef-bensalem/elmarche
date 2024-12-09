import api from '@/config/api';

const state = {
    products: [],
    loading: false,
    error: null
};

const getters = {
    products: state => state.products,
    loading: state => state.loading,
    error: state => state.error
};

const mutations = {
    setProducts: (state, products) => state.products = products,
    setLoading: (state, loading) => state.loading = loading,
    setError: (state, error) => state.error = error,
    insertProduct: (state, product) => state.products.unshift(product),
    updateProduct: (state, updatedProduct) => {
        const index = state.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }
    },
    removeProduct: (state, id) => state.products = state.products.filter(p => p.id !== id)
};

const actions = {
    async fetchProducts({ commit }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            // First try to get products from local storage
            const cachedProducts = localStorage.getItem('cachedProducts');
            if (cachedProducts) {
                commit('setProducts', JSON.parse(cachedProducts));
            }

            // Then fetch from API
            const response = await api.get('/products');
            const products = response.data.data || response.data;
            
            // Update cache and state
            localStorage.setItem('cachedProducts', JSON.stringify(products));
            commit('setProducts', products);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch products';
            commit('setError', errorMessage);
            console.error('Error fetching products:', error);
            
            // If we have cached products, don't show error to user
            if (!localStorage.getItem('cachedProducts')) {
                throw error;
            }
        } finally {
            commit('setLoading', false);
        }
    },

    async addProduct({ commit }, productData) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const formData = new FormData();
            Object.keys(productData).forEach(key => {
                formData.append(key, productData[key]);
            });

            const response = await api.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const product = response.data.data || response.data;
            commit('insertProduct', product);
            
            // Update cache
            const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
            cachedProducts.unshift(product);
            localStorage.setItem('cachedProducts', JSON.stringify(cachedProducts));
            
            return product;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add product';
            commit('setError', errorMessage);
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async updateProduct({ commit }, { id, productData }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const formData = new FormData();
            Object.keys(productData).forEach(key => {
                formData.append(key, productData[key]);
            });
            formData.append('_method', 'PUT');

            const response = await api.post(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const product = response.data.data || response.data;
            commit('updateProduct', product);
            
            // Update cache
            const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
            const index = cachedProducts.findIndex(p => p.id === id);
            if (index !== -1) {
                cachedProducts.splice(index, 1, product);
                localStorage.setItem('cachedProducts', JSON.stringify(cachedProducts));
            }
            
            return product;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update product';
            commit('setError', errorMessage);
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async deleteProduct({ commit }, id) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            await api.delete(`/products/${id}`);
            commit('removeProduct', id);
            
            // Update cache
            const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
            const updatedCache = cachedProducts.filter(p => p.id !== id);
            localStorage.setItem('cachedProducts', JSON.stringify(updatedCache));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete product';
            commit('setError', errorMessage);
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