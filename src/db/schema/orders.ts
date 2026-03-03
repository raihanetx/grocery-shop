import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { customers, products } from './products'

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  paymentMethod: text('payment_method').notNull(),
  status: text('status').default('pending'),
  courierStatus: text('courier_status'),
  subtotal: real('subtotal').notNull(),
  delivery: real('delivery').notNull(),
  discount: real('discount').default(0),
  couponAmount: real('coupon_amount').default(0),
  total: real('total').notNull(),
  canceledBy: text('canceled_by'),
  couponCodes: text('coupon_codes').default('[]'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (table) => ({
  statusIdx: index('idx_orders_status').on(table.status),
  customerIdx: index('idx_orders_customer').on(table.customerId),
}))

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  variant: text('variant'),
  qty: integer('qty').notNull(),
  basePrice: real('base_price').notNull(),
  offerText: text('offer_text'),
  offerDiscount: real('offer_discount').default(0),
  couponCode: text('coupon_code'),
  couponDiscount: real('coupon_discount').default(0),
  orderId: text('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id),
}, (table) => ({
  orderIdx: index('idx_order_items_order').on(table.orderId),
}))

export const coupons = sqliteTable('coupons', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(),
  type: text('type').notNull(), // 'pct' or 'fixed'
  value: real('value').notNull(),
  scope: text('scope').notNull(), // 'all', 'products', 'categories'
  expiry: text('expiry'),
  selectedProducts: text('selected_products'), // JSON array
  selectedCategories: text('selected_categories'), // JSON array
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
})

export const abandonedCheckouts = sqliteTable('abandoned_checkouts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address'),
  visitTime: text('visit_time').notNull(),
  visitDate: text('visit_date').notNull(),
  totalVisits: integer('total_visits').default(1),
  completedOrders: integer('completed_orders').default(0),
  history: text('history').notNull(), // JSON
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (table) => ({
  phoneIdx: index('idx_abandoned_phone').on(table.phone),
}))

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey().default(1),
  websiteName: text('website_name').default('Krishi Bitan'),
  slogan: text('slogan'),
  faviconUrl: text('favicon_url'),
  insideDhakaDelivery: real('inside_dhaka_delivery').default(60),
  outsideDhakaDelivery: real('outside_dhaka_delivery').default(120),
  freeDeliveryMin: real('free_delivery_min').default(500),
  whatsappNumber: text('whatsapp_number'),
  phoneNumber: text('phone_number'),
  facebookUrl: text('facebook_url'),
  messengerUsername: text('messenger_username'),
  aboutUs: text('about_us'),
  termsConditions: text('terms_conditions'),
  refundPolicy: text('refund_policy'),
  privacyPolicy: text('privacy_policy'),
})
