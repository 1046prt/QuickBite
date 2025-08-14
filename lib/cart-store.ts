import { create } from "zustand"

export interface CartItem {
  id: string
  menuItem: any
  quantity: number
  selectedSize?: string
  selectedAddons: string[]
  specialInstructions?: string
  totalPrice: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) =>
          i.menuItem.id === item.menuItem.id &&
          i.selectedSize === item.selectedSize &&
          JSON.stringify(i.selectedAddons) === JSON.stringify(item.selectedAddons),
      )

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i,
          ),
        }
      }

      return { items: [...state.items, { ...item, id: Date.now().toString() }] }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.totalPrice * item.quantity, 0)
  },

  getTotalItems: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.quantity, 0)
  },
}))
