import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // If the token is invalid, remove it and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    login: credentials => api.post('/login', credentials),
    register: userData => api.post('/register', userData),
    logout: () => api.post('/logout'),
    getUser: () => api.get('/user')
};

export const products = {
    getAll: () => api.get('/products'),
    get: id => api.get(`/products/${id}`),
    create: product => api.post('/products', product),
    update: (id, product) => api.put(`/products/${id}`, product),
    delete: id => api.delete(`/products/${id}`)
};

export const orders = {
    create: order => api.post('/orders', order),
    getAll: () => api.get('/orders'),
    get: id => api.get(`/orders/${id}`),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export const payments = {
    createIntent: orderId => api.post('/payment/create-intent', { order_id: orderId })
};

export default api;
