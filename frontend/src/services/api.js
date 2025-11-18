import axios from 'axios';

// in production (docker): use /api (nginx proxies to backend)
// in development: use http://localhost:8000 (direct backend connection)
export const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// req interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// res interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // retry original wiht new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // if refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/token/', { username, password });
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    return response.data;
  },
};

// cars API
export const carsAPI = {
  getAllCars: async (params = {}) => {
    const response = await api.get('/cars/', { params });
    return response.data;
  },
  
  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}/`);
    return response.data;
  },
  
  createCar: async (carData) => {
    const response = await api.post('/cars/', carData);
    return response.data;
  },
  
  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}/`, carData);
    return response.data;
  },
  
  deleteCar: async (id) => {
    await api.delete(`/cars/${id}/`);
  },
};

// features API
export const featuresAPI = {
  getAllFeatures: async () => {
    const response = await api.get('/features/');
    return response.data;
  },
  
  createFeature: async (featureData) => {
    const response = await api.post('/features/', featureData);
    return response.data;
  },
};

// owners API
export const ownersAPI = {
  getAllOwners: async () => {
    const response = await api.get('/owners/');
    return response.data;
  },
  
  createOwner: async (ownerData) => {
    const response = await api.post('/owners/', ownerData);
    return response.data;
  },
};

export default api;