import { create } from 'zustand'
import { Coupon } from '@/types'

interface CouponState {
  coupons: Coupon[]
  addCoupon: (coupon: Coupon) => void
  updateCoupon: (id: string, data: Partial<Coupon>) => void
  deleteCoupon: (id: string) => void
}

// Sample data from AdminDashboard.tsx
const initialCoupons: Coupon[] = [
  { id: '1', code: 'SUMMER20', type: 'pct', value: 20, scope: 'all', expiry: '2025-08-31' },
  { id: '2', code: 'FLAT15', type: 'fixed', value: 15, scope: 'products', expiry: '2025-07-15', selectedProducts: [1, 3] },
  { id: '3', code: 'BAKERY10', type: 'pct', value: 10, scope: 'categories', expiry: '', selectedCategories: ['Bakery'] },
  { id: '4', code: 'WELCOME50', type: 'fixed', value: 50, scope: 'all', expiry: '' },
]

export const useCouponStore = create<CouponState>((set) => ({
  coupons: initialCoupons,

  addCoupon: (coupon: Coupon) => {
    set((state) => ({
      coupons: [...state.coupons, coupon]
    }))
  },

  updateCoupon: (id: string, data: Partial<Coupon>) => {
    set((state) => ({
      coupons: state.coupons.map((coupon) => 
        coupon.id === id ? { ...coupon, ...data } : coupon
      )
    }))
  },

  deleteCoupon: (id: string) => {
    set((state) => ({
      coupons: state.coupons.filter((coupon) => coupon.id !== id)
    }))
  }
}))

// Helper data for coupon management
export const couponProducts = [
  { id: 1, name: 'Fresh Carrots', price: 'TK80', img: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png' },
  { id: 2, name: 'Premium Potatoes', price: 'TK45', img: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png' },
  { id: 3, name: 'Fresh Tomatoes', price: 'TK60', img: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png' },
  { id: 4, name: 'Red Apples', price: 'TK90', img: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png' },
  { id: 5, name: 'Fresh Bananas', price: 'TK50', img: 'https://i.postimg.cc/bw71qYYK/IMG-20260228-163147.png' },
  { id: 6, name: 'Sweet Oranges', price: 'TK80', img: 'https://i.postimg.cc/mr7Ckxtx/IMG-20260228-163156.png' },
  { id: 7, name: 'Grapes Green', price: 'TK120', img: 'https://i.postimg.cc/htkVK4PD/IMG-20260228-163208.png' },
  { id: 8, name: 'Mango Fresh', price: 'TK150', img: 'https://i.postimg.cc/Z5G6JYKm/IMG-20260228-163217.png' },
]

export const couponCategories = [
  { name: 'Fruits & Vegetables', color: '#16a34a' },
  { name: 'Dairy & Eggs', color: '#2563eb' },
  { name: 'Bakery', color: '#d97706' },
  { name: 'Meat & Seafood', color: '#dc2626' },
  { name: 'Beverages', color: '#7c3aed' },
  { name: 'Snacks', color: '#0891b2' },
  { name: 'Frozen Foods', color: '#0284c7' },
]
