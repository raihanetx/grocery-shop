import { create } from 'zustand'

// Types - unchanged
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
  
  // Actions - simplified
  fetchData: () => Promise<void>
  setSelectedProduct: (product: ShopProduct | null) => void
}

export const useShopStore = create<ShopState>((set, get) => ({
  categories: [],
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // Optimized fetch with caching - uses Next.js cache
  fetchData: async () => {
    const { products, categories } = get()
    
    // Return cached data if already loaded
    if (products.length > 0 && categories.length > 0) {
      return
    }
    
    set({ isLoading: true, error: null })
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories', { cache: 'force-cache' }),
        fetch('/api/products?status=active', { cache: 'force-cache' })
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
  }
}))
