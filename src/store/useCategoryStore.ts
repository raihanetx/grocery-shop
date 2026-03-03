import { create } from 'zustand'
import { Category } from '@/types'

interface CategoryState {
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (id: string, data: Partial<Category>) => void
  deleteCategory: (id: string) => void
}

// Sample data from AdminDashboard.tsx
const initialCategories: Category[] = [
  { id: 'CAT-101', name: 'Organic Fruits', type: 'icon', icon: 'ri-leaf-line', image: '', items: 24, created: '2 days ago', status: 'Active' },
  { id: 'CAT-102', name: 'Daily Essentials', type: 'icon', icon: 'ri-basket-line', image: '', items: 12, created: '5 days ago', status: 'Hidden' },
  { id: 'CAT-103', name: 'Fresh Vegetables', type: 'image', icon: '', image: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', items: 36, created: '1 week ago', status: 'Active' }
]

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: initialCategories,

  addCategory: (category: Category) => {
    set((state) => ({
      categories: [...state.categories, category]
    }))
  },

  updateCategory: (id: string, data: Partial<Category>) => {
    set((state) => ({
      categories: state.categories.map((category) => 
        category.id === id ? { ...category, ...data } : category
      )
    }))
  },

  deleteCategory: (id: string) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id)
    }))
  }
}))
