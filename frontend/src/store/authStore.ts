import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: string | null;
  isAuth: boolean;

  login: (token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  isAuth: !!localStorage.getItem("token"),

  login: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    set({
      token,
      role,
      isAuth: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    set({
      token: null,
      role: null,
      isAuth: false,
    });
  },
}));