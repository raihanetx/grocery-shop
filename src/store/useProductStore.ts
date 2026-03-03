import { create } from 'zustand'
import { Product } from '@/types'

interface ProductState {
  products: Product[]
  loading: boolean
  fetchProducts: () => Promise<void>
  addProduct: (product: Product) => void
  updateProduct: (id: number, data: Partial<Product>) => void
  deleteProduct: (id: number) => void
  toggleStatus: (id: number) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/products')
      const result = await response.json()
      if (result.success) {
        set({ 
          products: result.data.map((prod: any) => ({
            id: prod.id,
            name: prod.name,
            category: prod.category,
            image: prod.image,
            variants: '1 variant',
            price: `TK${prod.price}`,
            discount: prod.discount || '0%',
            offer: prod.offer === 1 || prod.offer === true,
            status: prod.status || 'active'
          }))
        })
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    set({ loading: false })
  },

  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product]
    }))
  },

  updateProduct: (id: number, data: Partial<Product>) => {
    set((state) => ({
      products: state.products.map((product) => 
        product.id === id ? { ...product, ...data } : product
      )
    }))
  },

  deleteProduct: (id: number) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id)
    }))
  },

  toggleStatus: (id: number) => {
    set((state) => ({
      products: state.products.map((product) => 
        product.id === id 
          ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
          : product
      )
    }))
  }
}))
