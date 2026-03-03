'use client'

import { useState, useCallback } from 'react'
import type { 
  Category, Product, InventoryItem, Alert, AdminReview, 
  Order, Coupon, AbandonedCheckout, CustomerProfile, 
  Settings, Credentials 
} from '@/types'

// Sample data for initial state
const initialInventory: InventoryItem[] = [
  { id: 1, name: "Fresh Carrots", category: "Vegetables", image: "https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png", variants: [{ name: "250g", stock: 45, initialStock: 100 }, { name: "500g", stock: 32, initialStock: 80 }, { name: "1 KG", stock: 18, initialStock: 50 }], lastEdited: "Feb 25, 2026" },
  { id: 2, name: "Premium Potatoes", category: "Vegetables", image: "https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png", variants: [{ name: "500g", stock: 28, initialStock: 60 }, { name: "1 KG", stock: 55, initialStock: 100 }, { name: "2 KG", stock: 12, initialStock: 30 }], lastEdited: "Feb 24, 2026" },
  { id: 3, name: "Fresh Tomatoes", category: "Vegetables", image: "https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png", variants: [{ name: "250g", stock: 8, initialStock: 40 }, { name: "500g", stock: 15, initialStock: 50 }, { name: "1 KG", stock: 22, initialStock: 60 }], lastEdited: "Feb 23, 2026" },
  { id: 4, name: "Red Apples", category: "Fruits", image: "https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png", variants: [{ name: "500g", stock: 35, initialStock: 80 }, { name: "1 KG", stock: 48, initialStock: 100 }], lastEdited: "Feb 22, 2026" },
  { id: 5, name: "Fresh Bananas", category: "Fruits", image: "https://i.postimg.cc/bw71qYYK/IMG-20260228-163147.png", variants: [{ name: "6 pcs", stock: 42, initialStock: 80 }, { name: "1 Dozen", stock: 28, initialStock: 50 }], lastEdited: "Feb 21, 2026" },
  { id: 6, name: "Organic Spinach", category: "Vegetables", image: "https://i.postimg.cc/MG1VHkvz/1000020586-removebg-preview.png", variants: [{ name: "1 Bundle", stock: 5, initialStock: 25 }], lastEdited: "Feb 20, 2026" },
  { id: 7, name: "Sweet Oranges", category: "Fruits", image: "https://i.postimg.cc/mr7Ckxtx/IMG-20260228-163156.png", variants: [{ name: "500g", stock: 30, initialStock: 70 }, { name: "1 KG", stock: 45, initialStock: 80 }], lastEdited: "Feb 19, 2026" },
  { id: 8, name: "Grapes Green", category: "Fruits", image: "https://i.postimg.cc/htkVK4PD/IMG-20260228-163208.png", variants: [{ name: "250g", stock: 3, initialStock: 20 }, { name: "500g", stock: 18, initialStock: 40 }], lastEdited: "Feb 18, 2026" },
]

const initialAlerts: Alert[] = [
  { title: "Low Stock Alert", desc: "Sourdough Loaf is running low.", type: "danger" },
  { title: "Expiry Warning", desc: "3 items expire tomorrow.", type: "warning" },
  { title: "New Order", desc: "Order #402 placed online.", type: "info" },
]

const initialAdminReviews: AdminReview[] = [
  { id: 1, product: 'Fresh Carrots', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', customerName: 'Joya Parvin', rating: 5, text: 'Super fresh! My kids loved them. Will definitely order again.', date: 'Feb 24, 2026', time: '3:42 PM' },
  { id: 2, product: 'Premium Potatoes', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png', customerName: 'Ahmed Rahman', rating: 4, text: 'Good quality but delivery took time. Product was fresh though.', date: 'Feb 23, 2026', time: '1:15 PM' },
  { id: 3, product: 'Red Apples', productCategory: 'Fruits', productImg: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png', customerName: 'Fatima Khatun', rating: 5, text: 'Best apples I have ever had! Sweet and crispy.', date: 'Feb 22, 2026', time: '10:30 AM' },
  { id: 4, product: 'Fresh Tomatoes', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', customerName: 'Karim Uddin', rating: 2, text: 'Some tomatoes were damaged. Not happy with packaging.', date: 'Feb 21, 2026', time: '5:00 PM' },
  { id: 5, product: 'Organic Spinach', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/MG1VHkvz/1000020586-removebg-preview.png', customerName: 'Nasreen Akter', rating: 4, text: 'Very fresh and organic as promised. Recommended!', date: 'Feb 20, 2026', time: '11:20 AM' },
  { id: 6, product: 'Fresh Carrots', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', customerName: 'Rafiq Islam', rating: 3, text: 'Average quality. Expected better for the price.', date: 'Feb 19, 2026', time: '2:45 PM' },
]

const initialCategories: Category[] = [
  { id: 'CAT-101', name: 'Organic Fruits', type: 'icon', icon: 'ri-leaf-line', image: '', items: 24, created: '2 days ago', status: 'Active' },
  { id: 'CAT-102', name: 'Daily Essentials', type: 'icon', icon: 'ri-basket-line', image: '', items: 12, created: '5 days ago', status: 'Hidden' },
  { id: 'CAT-103', name: 'Fresh Vegetables', type: 'image', icon: '', image: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', items: 36, created: '1 week ago', status: 'Active' }
]

const initialProducts: Product[] = [
  { id: 1, name: 'Fresh Carrots', category: 'Vegetables', image: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', variants: '2 variants', price: 'TK80 – TK150', discount: '16%', offer: true, status: 'active' },
  { id: 2, name: 'Premium Potatoes', category: 'Vegetables', image: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png', variants: '1 variant', price: 'TK45', discount: '0%', offer: false, status: 'active' },
  { id: 3, name: 'Red Apples', category: 'Fruits', image: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png', variants: '3 variants', price: 'TK90 – TK170', discount: '18%', offer: true, status: 'inactive' }
]

const initialOrders: Order[] = [
  { 
    id: 'ORD-POTATO', customer: 'Raihan', phone: '+8801866228213', address: 'Gulshan 2, Road 45, House 12, Dhaka',
    date: 'Feb 24, 2026', time: '10 min ago', paymentMethod: 'Cash on Delivery', status: 'pending', courierStatus: 'Processing',
    subtotal: 5850, delivery: 150, discount: 100, couponCodes: ['FIRST10'], couponAmount: 50, total: 5850 + 150 - 100 - 50, canceledBy: null,
    items: [
      { name: 'Organic Milk', variant: '1L', qty: 2, basePrice: 150, offerText: '5% off', offerDiscount: 7.5, couponCode: null, couponDiscount: 0 }, 
      { name: 'Samsung Galaxy S24', variant: '256GB', qty: 1, basePrice: 4180, offerText: null, offerDiscount: 0, couponCode: 'NEWPHONE', couponDiscount: 100 }, 
      { name: 'Premium Coffee', variant: null, qty: 1, basePrice: 1370, offerText: '10% off', offerDiscount: 137, couponCode: 'COFFEE20', couponDiscount: 50 }, 
    ]
  },
  { 
    id: 'ORD-002', customer: 'Sarah Johnson', phone: '+8801987654321', address: 'Dhanmondi, Road 8A, Dhaka',
    date: 'Feb 25, 2026', time: '25 min ago', paymentMethod: 'Pre-payment', status: 'approved', courierStatus: 'Shipping', 
    subtotal: 1650, delivery: 0, discount: 0, couponCodes: [], couponAmount: 0, total: 1650, canceledBy: null,
    items: [
      { name: 'Orange Juice', variant: '1L', qty: 2, basePrice: 600, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
      { name: 'Apples', variant: '1kg', qty: 1, basePrice: 450, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
    ]
  },
  { 
    id: 'ORD-003', customer: 'Mike Wilson', phone: '+8801555123456', address: 'Banani, Block C, Dhaka',
    date: 'Feb 24, 2026', time: '1 hour ago', paymentMethod: 'Cash on Delivery', status: 'canceled', courierStatus: 'Canceled', 
    subtotal: 4200, delivery: 100, discount: 500, couponCodes: [], couponAmount: 0, total: 4200 - 500 + 100, canceledBy: 'Customer',
    items: [
      { name: 'Basmati Rice', variant: '5kg', qty: 1, basePrice: 1800, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
      { name: 'Olive Oil', variant: '2L', qty: 2, basePrice: 1200, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
    ]
  },
]

const initialCoupons: Coupon[] = [
  { id: '1', code: 'SUMMER20', type: 'pct', value: 20, scope: 'all', expiry: '2025-08-31' },
  { id: '2', code: 'FLAT15', type: 'fixed', value: 15, scope: 'products', expiry: '2025-07-15', selectedProducts: [1, 3] },
  { id: '3', code: 'BAKERY10', type: 'pct', value: 10, scope: 'categories', expiry: '', selectedCategories: ['Bakery'] },
  { id: '4', code: 'WELCOME50', type: 'fixed', value: 50, scope: 'all', expiry: '' },
]

const initialAbandoned: AbandonedCheckout[] = [
  {
    id: 1, name: 'Rafi Hossain', phone: '+1 987 654 321', address: '555 Park Ave, Dhaka',
    visitTime: '15 min ago', visitDate: 'Feb 24, 2026 · 3:42 PM', totalVisits: 3, completedOrders: 1,
    history: [
      { date: 'Feb 24, 2026', time: '3:42 PM', timeAgo: '15 min ago', status: 'abandoned', products: [{ name: 'Organic Milk', variants: [{ label: '500ml', qty: 2 }] }], total: 45.92 },
      { date: 'Feb 20, 2026', time: '5:10 PM', timeAgo: '4 days ago', status: 'abandoned', products: [{ name: 'Butter', variants: [{ label: '200g', qty: 1 }] }], total: 12.50 },
      { date: 'Feb 18, 2026', time: '7:05 PM', timeAgo: '6 days ago', status: 'completed', products: [{ name: 'Basmati Rice', variants: [{ label: '2kg', qty: 1 }] }], total: 35.97 },
    ]
  },
  {
    id: 2, name: 'Tariq Mahmud', phone: '+1 765 432 109', address: '888 River St, Chittagong',
    visitTime: '2 hours ago', visitDate: 'Feb 24, 2026 · 1:55 PM', totalVisits: 5, completedOrders: 2,
    history: [
      { date: 'Feb 24, 2026', time: '1:55 PM', timeAgo: '2 hours ago', status: 'abandoned', products: [{ name: 'Basmati Rice', variants: [{ label: '1kg', qty: 3 }] }], total: 284.61 },
      { date: 'Feb 22, 2026', time: '9:00 AM', timeAgo: '2 days ago', status: 'completed', products: [{ name: 'Salt', variants: [{ label: '1kg', qty: 2 }] }], total: 10.00 },
    ]
  },
  {
    id: 3, name: 'Sumaiya Akter', phone: '+1 654 321 098', address: '12 Green Rd, Sylhet',
    visitTime: '4 hours ago', visitDate: 'Feb 24, 2026 · 11:40 AM', totalVisits: 2, completedOrders: 1,
    history: [
      { date: 'Feb 24, 2026', time: '11:40 AM', timeAgo: '4 hours ago', status: 'abandoned', products: [{ name: 'Yogurt', variants: [{ label: '150g', qty: 2 }] }], total: 27.41 },
      { date: 'Feb 20, 2026', time: '10:00 AM', timeAgo: '4 days ago', status: 'completed', products: [{ name: 'Apples', variants: [{ label: '1kg', qty: 1 }] }], total: 15.00 },
    ]
  }
]

const initialCustomers: CustomerProfile[] = [
  { id: 1, name: 'Rafi Hossain', phone: '+8801712345678', address: '555 Park Ave, Dhaka', totalSpent: 450.50, totalOrders: 5, orders: [] },
  { id: 2, name: 'Tariq Mahmud', phone: '+8801812345678', address: '888 River St, Chittagong', totalSpent: 1250.00, totalOrders: 12, orders: [] },
  { id: 3, name: 'Sumaiya Akter', phone: '+8801912345678', address: '12 Green Rd, Sylhet', totalSpent: 85.00, totalOrders: 2, orders: [] },
]

const initialSettings: Settings = {
  websiteName: 'GroceryHub',
  slogan: 'Freshness at your door',
  faviconUrl: '',
  insideDhakaDelivery: 60,
  outsideDhakaDelivery: 120,
  freeDeliveryMin: 1000,
  whatsappNumber: '',
  phoneNumber: '',
  facebookUrl: '',
  messengerUsername: '',
  aboutUs: '',
  termsConditions: '',
  refundPolicy: '',
  privacyPolicy: ''
}

const initialCredentials: Credentials = {
  username: 'admin_main',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  apiKey: 'pk_test_8f7d6a5s4d3f2g1h',
  secretKey: 'sk_test_1a2b3c4d5e6f7g8h',
  webhookUrl: 'https://myshop.com/webhooks/delivery'
}

export function useAdminData() {
  // State
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [alerts] = useState<Alert[]>(initialAlerts)
  const [adminReviews, setAdminReviews] = useState<AdminReview[]>(initialAdminReviews)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [abandonedCheckouts] = useState<AbandonedCheckout[]>(initialAbandoned)
  const [customerProfiles] = useState<CustomerProfile[]>(initialCustomers)
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials)

  // Toast
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const showToastMsg = useCallback((msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2200)
  }, [])

  // Category functions
  const handleSaveCategory = useCallback((category: Category) => {
    if (!category.name) {
      showToastMsg('Please enter a category name')
      return false
    }
    setCategories(prev => {
      const exists = prev.find(c => c.id === category.id)
      if (exists) {
        return prev.map(c => c.id === category.id ? category : c)
      }
      return [...prev, category]
    })
    showToastMsg('Category Updated Successfully!')
    return true
  }, [showToastMsg])

  const handleDeleteCategory = useCallback((id: string) => {
    if (confirm("Delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id))
    }
  }, [])

  // Product functions
  const handleSaveProduct = useCallback((product: Product) => {
    if (!product.name) {
      showToastMsg('Please enter product name')
      return false
    }
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? product : p)
      }
      return [...prev, product]
    })
    showToastMsg('Product Updated Successfully!')
    return true
  }, [showToastMsg])

  const toggleProdStatus = useCallback((id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ))
  }, [])

  // Order functions
  const updateOrderStatus = useCallback((id: string, status: 'approved' | 'canceled') => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { ...order, status, canceledBy: status === 'canceled' ? 'Admin' : null }
      }
      return order
    }))
  }, [])

  // Coupon functions
  const handleSaveCoupon = useCallback((coupon: Coupon) => {
    if (!coupon.code.trim()) {
      showToastMsg('Please enter a coupon code.')
      return false
    }
    if (!coupon.value) {
      showToastMsg('Please enter a discount value.')
      return false
    }
    setCoupons(prev => {
      const exists = prev.find(c => c.id === coupon.id)
      if (exists) {
        return prev.map(c => c.id === coupon.id ? coupon : c)
      }
      return [...prev, coupon]
    })
    showToastMsg(exists ? 'Coupon updated!' : 'Coupon added!')
    return true
  }, [showToastMsg])

  const deleteCoupon = useCallback((id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id))
    showToastMsg('Coupon deleted!')
  }, [showToastMsg])

  // Settings functions
  const handleSaveSettings = useCallback(() => {
    showToastMsg('Settings saved successfully!')
  }, [showToastMsg])

  const handleSaveAccount = useCallback((creds: Credentials) => {
    if (creds.newPassword && creds.newPassword !== creds.confirmPassword) {
      showToastMsg('Passwords do not match!')
      return false
    }
    setCredentials(creds)
    showToastMsg('Account settings saved successfully!')
    return true
  }, [showToastMsg])

  const handleSaveApi = useCallback(() => {
    showToastMsg('API configurations saved successfully!')
  }, [showToastMsg])

  // Review functions
  const deleteReview = useCallback((id: number) => {
    setAdminReviews(prev => prev.filter(r => r.id !== id))
  }, [])

  return {
    // State
    inventory, setInventory,
    alerts,
    adminReviews, setAdminReviews, deleteReview,
    categories, setCategories, handleSaveCategory, handleDeleteCategory,
    products, setProducts, handleSaveProduct, toggleProdStatus,
    orders, setOrders, updateOrderStatus,
    coupons, setCoupons, handleSaveCoupon, deleteCoupon,
    abandonedCheckouts,
    customerProfiles,
    settings, setSettings, handleSaveSettings,
    credentials, setCredentials, handleSaveAccount, handleSaveApi,
    
    // Toast
    showToast, toastMsg, showToastMsg,
  }
}
