import api from '@/config/api';

const state = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user?.is_admin || false,
    user: state => state.user,
    token: state => state.token,
    loading: state => state.loading,
    error: state => state.error
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    },
    clearAuth(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
    }
};

const actions = {
    async login({ commit }, credentials) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.post('/login', credentials);
            const { user, token } = response.data;
            commit('setUser', user);
            commit('setToken', token);
            return response;
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Login failed');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async register({ commit }, userData) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.post('/register', userData);
            const { user, token } = response.data;
            commit('setUser', user);
            commit('setToken', token);
            return response;
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Registration failed');
            throw error;
        } finally {
            commit('setLoading', false);
        }
    },

    async logout({ commit }) {
        commit('setLoading', true);
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            commit('clearAuth');
            commit('setLoading', false);
        }
    },

    async fetchUser({ commit }) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await api.get('/user');
            commit('setUser', response.data);
        } catch (error) {
            commit('setError', error.response?.data?.message || 'Failed to fetch user');
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
