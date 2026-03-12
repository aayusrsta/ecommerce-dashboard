import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "@/lib/api";
import type { AuthState } from "@/types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        const { data, error } = await loginUser(username, password);

        if (error || !data) throw new Error(error || "Login failed");

        set({
          token: data.token,
          isAuthenticated: true,
          user: null,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);