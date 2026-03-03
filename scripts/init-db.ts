import { Database } from 'bun:sqlite'

const db = new Database('./db/custom.db')

// Drop all existing tables first
db.run(`DROP TABLE IF EXISTS order_items`)
db.run(`DROP TABLE IF EXISTS orders`)
db.run(`DROP TABLE IF EXISTS coupons`)
db.run(`DROP TABLE IF EXISTS reviews`)
db.run(`DROP TABLE IF EXISTS abandoned_checkouts`)
db.run(`DROP TABLE IF EXISTS variants`)
db.run(`DROP TABLE IF EXISTS products`)
db.run(`DROP TABLE IF EXISTS customers`)
db.run(`DROP TABLE IF EXISTS categories`)
db.run(`DROP TABLE IF EXISTS settings`)

console.log('Old tables dropped!')

// Create categories table
db.run(`
  CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'icon',
    icon TEXT,
    image TEXT,
    items INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Active',
    created_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create products table
db.run(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id),
    image TEXT NOT NULL,
    price REAL NOT NULL,
    old_price REAL,
    discount TEXT DEFAULT '0%',
    offer INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    short_desc TEXT,
    long_desc TEXT,
    weight TEXT,
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create variants table
db.run(`
  CREATE TABLE variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL,
    initial_stock INTEGER NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id)
  )
`)

// Create customers table
db.run(`
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    email TEXT,
    total_spent REAL DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create orders table
db.run(`
  CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    courier_status TEXT,
    subtotal REAL NOT NULL,
    delivery REAL NOT NULL,
    discount REAL DEFAULT 0,
    coupon_amount REAL DEFAULT 0,
    total REAL NOT NULL,
    canceled_by TEXT,
    coupon_codes TEXT DEFAULT '[]',
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create order_items table
db.run(`
  CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    variant TEXT,
    qty INTEGER NOT NULL,
    base_price REAL NOT NULL,
    offer_text TEXT,
    offer_discount REAL DEFAULT 0,
    coupon_code TEXT,
    coupon_discount REAL DEFAULT 0,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id)
  )
`)

// Create coupons table
db.run(`
  CREATE TABLE coupons (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    value REAL NOT NULL,
    scope TEXT NOT NULL,
    expiry TEXT,
    selected_products TEXT,
    selected_categories TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create reviews table
db.run(`
  CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    initials TEXT NOT NULL,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    product_id INTEGER REFERENCES products(id),
    customer_id INTEGER REFERENCES customers(id)
  )
`)

// Create abandoned_checkouts table
db.run(`
  CREATE TABLE abandoned_checkouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    visit_time TEXT NOT NULL,
    visit_date TEXT NOT NULL,
    total_visits INTEGER DEFAULT 1,
    completed_orders INTEGER DEFAULT 0,
    history TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch())
  )
`)

// Create settings table
db.run(`
  CREATE TABLE settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    website_name TEXT DEFAULT 'Krishi Bitan',
    slogan TEXT,
    favicon_url TEXT,
    inside_dhaka_delivery REAL DEFAULT 60,
    outside_dhaka_delivery REAL DEFAULT 120,
    free_delivery_min REAL DEFAULT 500,
    whatsapp_number TEXT,
    phone_number TEXT,
    facebook_url TEXT,
    messenger_username TEXT,
    about_us TEXT,
    terms_conditions TEXT,
    refund_policy TEXT,
    privacy_policy TEXT
  )
`)

console.log('Database tables created successfully!')

// Insert default settings
db.run(`
  INSERT INTO settings (id, website_name, inside_dhaka_delivery, outside_dhaka_delivery, free_delivery_min)
  VALUES (1, 'Krishi Bitan', 60, 120, 500)
`)
console.log('Default settings inserted!')

// Insert seed categories
const insertCategory = db.query(`
  INSERT INTO categories (id, name, type, icon, image, items, status) 
  VALUES ($id, $name, $type, $icon, $image, $items, $status)
`)

insertCategory.run({ $id: 'CAT-101', $name: 'Organic Fruits', $type: 'icon', $icon: 'ri-leaf-line', $image: '', $items: 24, $status: 'Active' })
insertCategory.run({ $id: 'CAT-102', $name: 'Daily Essentials', $type: 'icon', $icon: 'ri-basket-line', $image: '', $items: 12, $status: 'Active' })
insertCategory.run({ $id: 'CAT-103', $name: 'Fresh Vegetables', $type: 'image', $icon: '', $image: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', $items: 36, $status: 'Active' })
insertCategory.run({ $id: 'CAT-104', $name: 'Dairy & Eggs', $type: 'icon', $icon: 'ri-egg-line', $image: '', $items: 18, $status: 'Active' })
insertCategory.run({ $id: 'CAT-105', $name: 'Bakery', $type: 'icon', $icon: 'ri-bread-line', $image: '', $items: 15, $status: 'Active' })
console.log('Seed categories inserted!')

// Insert seed products
const insertProduct = db.query(`
  INSERT INTO products (name, category, category_id, image, price, old_price, discount, offer, status) 
  VALUES ($name, $category, $category_id, $image, $price, $old_price, $discount, $offer, $status)
`)

insertProduct.run({ $name: 'Fresh Carrots', $category: 'Fresh Vegetables', $category_id: 'CAT-103', $image: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', $price: 80, $old_price: 95, $discount: '16%', $offer: 1, $status: 'active' })
insertProduct.run({ $name: 'Premium Potatoes', $category: 'Fresh Vegetables', $category_id: 'CAT-103', $image: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png', $price: 45, $old_price: null, $discount: '0%', $offer: 0, $status: 'active' })
insertProduct.run({ $name: 'Red Apples', $category: 'Organic Fruits', $category_id: 'CAT-101', $image: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png', $price: 90, $old_price: 110, $discount: '18%', $offer: 1, $status: 'active' })
insertProduct.run({ $name: 'Fresh Bananas', $category: 'Organic Fruits', $category_id: 'CAT-101', $image: 'https://i.postimg.cc/bw71qYYK/IMG-20260228-163147.png', $price: 50, $old_price: null, $discount: '0%', $offer: 0, $status: 'active' })
insertProduct.run({ $name: 'Fresh Tomatoes', $category: 'Fresh Vegetables', $category_id: 'CAT-103', $image: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', $price: 60, $old_price: null, $discount: '0%', $offer: 0, $status: 'active' })
insertProduct.run({ $name: 'Organic Spinach', $category: 'Fresh Vegetables', $category_id: 'CAT-103', $image: 'https://i.postimg.cc/MG1VHkvz/1000020586-removebg-preview.png', $price: 35, $old_price: null, $discount: '0%', $offer: 0, $status: 'active' })
insertProduct.run({ $name: 'Sweet Oranges', $category: 'Organic Fruits', $category_id: 'CAT-101', $image: 'https://i.postimg.cc/mr7Ckxtx/IMG-20260228-163156.png', $price: 80, $old_price: 95, $discount: '16%', $offer: 1, $status: 'active' })
insertProduct.run({ $name: 'Grapes Green', $category: 'Organic Fruits', $category_id: 'CAT-101', $image: 'https://i.postimg.cc/htkVK4PD/IMG-20260228-163208.png', $price: 120, $old_price: null, $discount: '0%', $offer: 0, $status: 'active' })
console.log('Seed products inserted!')

// Insert seed coupons
const insertCoupon = db.query(`
  INSERT INTO coupons (id, code, type, value, scope, expiry, selected_products, selected_categories) 
  VALUES ($id, $code, $type, $value, $scope, $expiry, $selected_products, $selected_categories)
`)

insertCoupon.run({ $id: '1', $code: 'SUMMER20', $type: 'pct', $value: 20, $scope: 'all', $expiry: '2025-08-31', $selected_products: null, $selected_categories: null })
insertCoupon.run({ $id: '2', $code: 'FLAT15', $type: 'fixed', $value: 15, $scope: 'products', $expiry: '2025-07-15', $selected_products: '[1, 3]', $selected_categories: null })
insertCoupon.run({ $id: '3', $code: 'BAKERY10', $type: 'pct', $value: 10, $scope: 'categories', $expiry: null, $selected_products: null, $selected_categories: '["Bakery"]' })
insertCoupon.run({ $id: '4', $code: 'WELCOME50', $type: 'fixed', $value: 50, $scope: 'all', $expiry: null, $selected_products: null, $selected_categories: null })
console.log('Seed coupons inserted!')

// Insert seed orders
const insertOrder = db.query(`
  INSERT INTO orders (id, customer_name, phone, address, date, time, payment_method, status, courier_status, subtotal, delivery, discount, coupon_amount, total, canceled_by, coupon_codes) 
  VALUES ($id, $customer_name, $phone, $address, $date, $time, $payment_method, $status, $courier_status, $subtotal, $delivery, $discount, $coupon_amount, $total, $canceled_by, $coupon_codes)
`)

insertOrder.run({ $id: 'ORD-POTATO', $customer_name: 'Raihan', $phone: '+8801866228213', $address: 'Gulshan 2, Road 45, House 12, Dhaka', $date: 'Feb 24, 2026', $time: '10 min ago', $payment_method: 'Cash on Delivery', $status: 'pending', $courier_status: 'Processing', $subtotal: 5850, $delivery: 150, $discount: 100, $coupon_amount: 50, $total: 5850, $canceled_by: null, $coupon_codes: '["FIRST10"]' })
insertOrder.run({ $id: 'ORD-002', $customer_name: 'Sarah Johnson', $phone: '+8801987654321', $address: 'Dhanmondi, Road 8A, Dhaka', $date: 'Feb 25, 2026', $time: '25 min ago', $payment_method: 'Pre-payment', $status: 'approved', $courier_status: 'Shipping', $subtotal: 1650, $delivery: 0, $discount: 0, $coupon_amount: 0, $total: 1650, $canceled_by: null, $coupon_codes: '[]' })
insertOrder.run({ $id: 'ORD-003', $customer_name: 'Mike Wilson', $phone: '+8801555123456', $address: 'Banani, Block C, Dhaka', $date: 'Feb 24, 2026', $time: '1 hour ago', $payment_method: 'Cash on Delivery', $status: 'canceled', $courier_status: 'Canceled', $subtotal: 4200, $delivery: 100, $discount: 500, $coupon_amount: 0, $total: 3800, $canceled_by: 'Customer', $coupon_codes: '[]' })
console.log('Seed orders inserted!')

db.close()
console.log('Database initialization complete!')
