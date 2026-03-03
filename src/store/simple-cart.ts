// Simple store - just cart state, everything else from server
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  oldPrice?: number
  img: string
  weight: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items
        const existing = items.find(i => i.id === item.id)
        
        if (existing) {
          set({
            items: items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(i => 
            i.id === id ? { ...i, quantity } : i
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity, 
          0
        )
      }
    }),
    { name: 'cart-storage' }
  )
)
