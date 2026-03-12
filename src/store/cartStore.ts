import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState, Product } from "@/types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        const existing = get().items.find(i => i.product.id === product.id);

        if (existing) {
          set({
            items: get().items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity }] });
        }
      },

      removeItem: (productId: number) => {
        set({ items: get().items.filter(i => i.product.id !== productId) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity < 1) return;
        set({
          items: get().items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, i) => total + i.product.price * i.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, i) => total + i.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);