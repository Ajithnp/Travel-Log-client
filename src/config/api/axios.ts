import axios from 'axios';
import { apiConfig } from '../config';


const api = axios.create({
    baseURL:apiConfig.baseUrl,
    withCredentials:true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh-token', {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
        console.error("error", refreshError);
        
          localStorage.removeItem("isAuthenticated");
          //alert("Session expired. Please log in again.");toast
        window.location.href = '/login';
      }
    }
    
     if (!error.response) {
      alert("Network error. Please check your connection.");
    } 

    return Promise.reject(error);
  }
);
export default api;