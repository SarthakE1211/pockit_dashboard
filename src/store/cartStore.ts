import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalPrice: 0,
  totalItems: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedItems = [...state.items, item];
      }

      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

      return {
        items: updatedItems,
        totalPrice,
        totalItems,
      };
    }),

  removeItem: (itemId) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.id !== itemId);
      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

      return {
        items: updatedItems,
        totalPrice,
        totalItems,
      };
    }),

  updateQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return state;
      }

      const updatedItems = state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      );

      const totalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

      return {
        items: updatedItems,
        totalPrice,
        totalItems,
      };
    }),

  clearCart: () =>
    set({
      items: [],
      totalPrice: 0,
      totalItems: 0,
    }),

  calculateTotals: () =>
    set((state) => {
      const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

      return {
        totalPrice,
        totalItems,
      };
    }),
}));
