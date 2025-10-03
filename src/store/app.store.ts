import { create } from "zustand";

interface User {
  username: string;
  email: string;
}

interface AppStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAppStore;
