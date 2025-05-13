import axios from 'axios';

// Use environment variable if available, otherwise default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Hotel services
export const hotelService = {
  getAllHotels: () => api.get('/hotels'),
  getHotelById: (id) => api.get(`/hotels/${id}`),
  createHotel: (hotelData) => api.post('/hotels', hotelData),
  updateHotel: (id, hotelData) => api.put(`/hotels/${id}`, hotelData),
  deleteHotel: (id) => api.delete(`/hotels/${id}`),
};

// Room services
export const roomService = {
  getRoomsByHotel: (hotelId) => api.get(`/hotels/${hotelId}/rooms`),
  createRoom: (hotelId, roomData) => api.post(`/hotels/${hotelId}/rooms`, roomData),
  updateRoom: (hotelId, roomId, roomData) => api.put(`/hotels/${hotelId}/rooms/${roomId}`, roomData),
  deleteRoom: (hotelId, roomId) => api.delete(`/hotels/${hotelId}/rooms/${roomId}`),
};

// Booking services
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getHotelBookings: (hotelId) => api.get(`/bookings/hotel/${hotelId}`),
  updateBooking: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

// Review services
export const reviewService = {
  getHotelReviews: (hotelId) => api.get(`/hotels/${hotelId}/reviews`),
  createReview: (hotelId, reviewData) => api.post(`/hotels/${hotelId}/reviews`, reviewData),
  updateReview: (hotelId, reviewId, reviewData) => api.put(`/hotels/${hotelId}/reviews/${reviewId}`, reviewData),
  deleteReview: (hotelId, reviewId) => api.delete(`/hotels/${hotelId}/reviews/${reviewId}`),
};

export default api; 