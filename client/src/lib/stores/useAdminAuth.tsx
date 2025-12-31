
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: false,
      
      login: async (password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
            credentials: 'include',
          });

          if (response.ok) {
            set({ isAuthenticated: true, isLoading: false });
            return true;
          } else {
            set({ isAuthenticated: false, isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isAuthenticated: false, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await fetch('/api/admin/logout', {
            method: 'POST',
            credentials: 'include',
          });
          set({ isAuthenticated: false, isLoading: false });
        } catch (error) {
          console.error('Logout error:', error);
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/admin/status', {
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ isAuthenticated: data.isAuthenticated, isLoading: false });
          } else {
            set({ isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          set({ isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
