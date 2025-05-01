import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true // Important for handling cookies
});

// Add interceptor to add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setTokens: (accessToken: string, refreshToken: string, userId: string) => void;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setTokens: (accessToken, refreshToken, userId) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
      },

      getProfile: async () => {
        try {
          set({ isLoading: true });
          const userId = localStorage.getItem('userId');
          
          if (!userId) {
            throw new Error('User ID not found');
          }

          const response = await api.get(`/auth/profile/${userId}`);
          
          set({ 
            user: response.data.user,
            isAuthenticated: true 
          });
        } catch (error) {
          console.error('Profile fetch error:', error);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Handle token refresh here if needed
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            set({ 
              user: null, 
              isAuthenticated: false 
            });
          }
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await api.post('/auth/logout');
          
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          
          set({ 
            user: null,
            isAuthenticated: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      googleLogin: () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);