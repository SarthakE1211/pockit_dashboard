import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  logout: () => set({
    user: null,
    isAuthenticated: false,
    error: null,
  }),

  reset: () => set({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),
}));
