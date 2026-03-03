import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').default('icon'),
  icon: text('icon'),
  image: text('image'),
  items: integer('items').default(0),
  status: text('status').default('Active'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(),
  categoryId: text('category_id').references(() => categories.id),
  image: text('image').notNull(),
  images: text('images'), // JSON array of additional images
  price: real('price').notNull(),
  oldPrice: real('old_price'),
  discount: text('discount').default('0%'),
  offer: integer('offer', { mode: 'boolean' }).default(false),
  status: text('status').default('active'),
  shortDesc: text('short_desc'),
  longDesc: text('long_desc'),
  weight: text('weight'),
  variants: text('variants'), // JSON array of variants
  faqs: text('faqs'), // JSON array of FAQs
  relatedProducts: text('related_products'), // JSON array of related product IDs
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
})

export const variants = sqliteTable('variants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  stock: integer('stock').notNull(),
  initialStock: integer('initial_stock').notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
})

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  initials: text('initials').notNull(),
  name: text('name').notNull(),
  rating: integer('rating').notNull(),
  text: text('text').notNull(),
  date: text('date').notNull(),
  productId: integer('product_id').references(() => products.id),
  customerId: integer('customer_id').references(() => customers.id),
})

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address'),
  email: text('email'),
  totalSpent: real('total_spent').default(0),
  totalOrders: integer('total_orders').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
})
