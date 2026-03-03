'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
interface Category {
  id: string
  name: string
  type: string
  icon: string | null
  image: string | null
  items: number
  status: string
  created_at: number | null
}

interface Product {
  id: number
  name: string
  category: string
  category_id: string | null
  image: string
  price: number
  old_price: number | null
  discount: string
  offer: boolean
  status: string
  short_desc: string | null
  long_desc: string | null
  weight: string | null
  created_at: number | null
  updated_at: number | null
}

interface Order {
  id: string
  customer_name: string
  phone: string
  address: string
  date: string
  time: string
  payment_method: string
  status: string
  courier_status: string | null
  subtotal: number
  delivery: number
  discount: number
  coupon_amount: number
  total: number
  canceled_by: string | null
  coupon_codes: string
  created_at: number | null
}

interface Coupon {
  id: string
  code: string
  type: string
  value: number
  scope: string
  expiry: string | null
  selected_products: string | null
  selected_categories: string | null
}

// API helper
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

// =====================
// CATEGORIES HOOKS
// =====================

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiRequest<{ success: boolean; data: Category[] }>('/api/categories'),
    select: (data) => data.data,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (category: Partial<Category>) =>
      apiRequest('/api/categories', {
        method: 'POST',
        body: JSON.stringify(category),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (category: Category) =>
      apiRequest('/api/categories', {
        method: 'PUT',
        body: JSON.stringify(category),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/categories?id=${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

// =====================
// PRODUCTS HOOKS
// =====================

export function useProducts(filters?: { category?: string; offer?: boolean; search?: string }) {
  const params = new URLSearchParams()
  if (filters?.category) params.set('category', filters.category)
  if (filters?.offer) params.set('offer', 'true')
  if (filters?.search) params.set('search', filters.search)
  
  const queryString = params.toString()
  const url = queryString ? `/api/products?${queryString}` : '/api/products'
  
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiRequest<{ success: boolean; data: Product[] }>(url),
    select: (data) => data.data,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (product: Partial<Product>) =>
      apiRequest('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// =====================
// ORDERS HOOKS
// =====================

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => apiRequest<{ success: boolean; data: Order[] }>('/api/orders'),
    select: (data) => data.data,
  })
}

export function useUpdateOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (order: { id: string; status?: string; courier_status?: string }) =>
      apiRequest('/api/orders', {
        method: 'PATCH',
        body: JSON.stringify(order),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

// =====================
// COUPONS HOOKS
// =====================

export function useCoupons() {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: () => apiRequest<{ success: boolean; data: Coupon[] }>('/api/coupons'),
    select: (data) => data.data,
  })
}

export function useCreateCoupon() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (coupon: Partial<Coupon>) =>
      apiRequest('/api/coupons', {
        method: 'POST',
        body: JSON.stringify(coupon),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
    },
  })
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/coupons?id=${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
    },
  })
}
