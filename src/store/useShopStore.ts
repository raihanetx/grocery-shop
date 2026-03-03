import { create } from 'zustand'

// Types
export interface ShopCategory {
  id: string
  name: string
  type: string
  icon: string | null
  image: string | null
  items: number
  status: string
}

export interface ShopProduct {
  id: number
  name: string
  category: string
  categoryId: string | null
  image: string
  images?: string[]
  price: number
  oldPrice: number | null
  discount: string
  offer: boolean
  status: string
  shortDesc?: string
  longDesc?: string
  variants?: any[]
  faqs?: any[]
  relatedProducts?: number[]
}

interface ShopState {
  categories: ShopCategory[]
  products: ShopProduct[]
  selectedProduct: ShopProduct | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchData: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchProducts: () => Promise<void>
  setSelectedProduct: (product: ShopProduct | null) => void
}

export const useShopStore = create<ShopState>((set, get) => ({
  categories: [],
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  fetchData: async () => {
    set({ isLoading: true, error: null })
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products')
      ])
      
      const categoriesData = await categoriesRes.json()
      const productsData = await productsRes.json()
      
      if (categoriesData.success) {
        set({ categories: categoriesData.data })
      }
      
      if (productsData.success) {
        set({ products: productsData.data })
      }
      
      set({ isLoading: false })
    } catch (error) {
      console.error('Error fetching shop data:', error)
      set({ error: 'Failed to load data', isLoading: false })
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.success) {
        set({ categories: data.data })
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },

  fetchProducts: async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        set({ products: data.data })
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
}))
