import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

// Cached database queries - revalidates every 60 seconds
export const getProducts = cache(async () => {
  'use server'
  const allProducts = await db.select().from(products).where(eq(products.status, 'active'))
  return allProducts
})

export const getCategories = cache(async () => {
  'use server'
  return await db.select().from(categories)
})

export const getProductById = cache(async (id: number) => {
  'use server'
  const [product] = await db.select().from(products).where(eq(products.id, id))
  return product
})

// Simple API helpers for client components
export async function fetchProducts() {
  const res = await fetch('/api/products', { 
    next: { revalidate: 60 } 
  })
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch('/api/categories', { 
    next: { revalidate: 60 } 
  })
  return res.json()
}
