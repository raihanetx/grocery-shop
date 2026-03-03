// Export all schemas
export * from './products'
export * from './orders'

// Re-export commonly used
import { products, categories, variants, reviews, customers } from './products'
import { orders, orderItems, coupons, abandonedCheckouts, settings } from './orders'

export const schema = {
  products,
  categories,
  variants,
  reviews,
  customers,
  orders,
  orderItems,
  coupons,
  abandonedCheckouts,
  settings,
}
