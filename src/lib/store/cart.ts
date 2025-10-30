import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  product: any
  quantity: number
  price: number
}

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (product: any, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          
          if (existingItem) {
            const updatedItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
            return { items: updatedItems }
          } else {
            const newItem: CartItem = {
              id: product.id,
              product,
              quantity,
              price: product.preco || product.preco_com_desconto || product.price
            }
            return { items: [...state.items, newItem] }
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)