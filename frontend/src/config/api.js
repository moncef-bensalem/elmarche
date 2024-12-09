import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 second timeout
});

// Add request interceptor
api.interceptors.request.use(
    config => {
        // Add loading state
        if (window.$store) {
            window.$store.commit('setGlobalLoading', true);
        }
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        if (window.$store) {
            window.$store.commit('setGlobalLoading', false);
        }
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    response => {
        if (window.$store) {
            window.$store.commit('setGlobalLoading', false);
        }
        return response;
    },
    error => {
        if (window.$store) {
            window.$store.commit('setGlobalLoading', false);
        }

        // Network error
        if (!error.response) {
            console.error('Network Error:', error.message);
            return Promise.reject({
                response: {
                    data: {
                        message: 'Network error. Please check your connection and ensure the backend server is running.'
                    }
                }
            });
        }

        // Authentication error
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        // Server error
        if (error.response.status >= 500) {
            console.error('Server Error:', error.response);
            return Promise.reject({
                response: {
                    data: {
                        message: 'Server error. Please try again later.'
                    }
                }
            });
        }

        return Promise.reject(error);
    }
);

export default api;
