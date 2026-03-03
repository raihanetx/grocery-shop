'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { 
  Category, Product, InventoryItem, Alert, AdminReview, 
  Order, Coupon, CouponProduct, CouponCategory,
  AbandonedCheckout, CustomerProfile, Settings, Credentials
} from '@/types'

// Types for the context
interface AdminContextType {
  // Navigation
  dashView: string
  setDashView: (view: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  
  // Toast
  showToast: boolean
  setShowToast: (show: boolean) => void
  toastMsg: string
  setToastMsg: (msg: string) => void
  showToastMsg: (msg: string) => void
  
  // Loading state
  isLoading: boolean
  
  // Inventory
  inventory: InventoryItem[]
  setInventory: (inventory: InventoryItem[]) => void
  expandedInventory: number | null
  setExpandedInventory: (id: number | null) => void
  editingInventoryItem: InventoryItem | null
  setEditingInventoryItem: (item: InventoryItem | null) => void
  
  // Alerts
  alerts: Alert[]
  
  // Reviews
  adminReviews: AdminReview[]
  setAdminReviews: (reviews: AdminReview[]) => void
  
  // Categories
  categories: Category[]
  setCategories: (categories: Category[]) => void
  editingCategory: Category | null
  setEditingCategory: (category: Category | null) => void
  refetchCategories: () => void
  
  // Products
  products: Product[]
  setProducts: (products: Product[]) => void
  editingProduct: Product | null
  setEditingProduct: (product: Product | null) => void
  prodVarieties: {id: number; name: string; price: string; stock: string; discount: string}[]
  setProdVarieties: (varieties: {id: number; name: string; price: string; stock: string; discount: string}[]) => void
  prodFaqs: {id: number; question: string; answer: string}[]
  setProdFaqs: (faqs: {id: number; question: string; answer: string}[]) => void
  prodImages: string[]
  setProdImages: (images: string[]) => void
  prodRelated: number[]
  setProdRelated: (ids: number[]) => void
  allRelatedOptions: {id: number; name: string; category: string; price: number; image: string}[]
  refetchProducts: () => void
  
  // Orders
  orders: Order[]
  setOrders: (orders: Order[]) => void
  currentOrderFilter: 'all' | 'pending' | 'approved' | 'canceled'
  setCurrentOrderFilter: (filter: 'all' | 'pending' | 'approved' | 'canceled') => void
  selectedOrder: Order | null
  setSelectedOrder: (order: Order | null) => void
  refetchOrders: () => void
  
  // Coupons
  coupons: Coupon[]
  setCoupons: (coupons: Coupon[]) => void
  editingCoupon: Coupon | null
  setEditingCoupon: (coupon: Coupon | null) => void
  couponForm: {
    code: string
    type: 'pct' | 'fixed'
    value: string
    expiry: string
    scope: 'all' | 'products' | 'categories'
  }
  setCouponForm: (form: {
    code: string
    type: 'pct' | 'fixed'
    value: string
    expiry: string
    scope: 'all' | 'products' | 'categories'
  }) => void
  pickedProducts: number[]
  setPickedProducts: (ids: number[]) => void
  pickedCategories: string[]
  setPickedCategories: (categories: string[]) => void
  couponProducts: CouponProduct[]
  couponCategories: CouponCategory[]
  refetchCoupons: () => void
  
  // Abandoned
  abandonedCheckouts: AbandonedCheckout[]
  expandedAbandoned: number | null
  setExpandedAbandoned: (id: number | null) => void
  
  // Customers
  customerProfiles: CustomerProfile[]
  expandedCustomer: number | null
  setExpandedCustomer: (id: number | null) => void
  
  // Settings
  settings: Settings
  setSettings: (settings: Settings) => void
  
  // Credentials
  credentials: Credentials
  setCredentials: (credentials: Credentials) => void
  
  // Modal
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  newProduct: { name: string; stock: string }
  setNewProduct: (product: { name: string; stock: string }) => void
  handleAddProductInventory: (e: React.FormEvent) => void
  
  // Edit functions
  openCategoryEdit: (cat: Category | null) => void
  openProductEdit: (prod: Product | null) => void
  openCouponEdit: (coupon: Coupon | null) => void
  
  // Set view for navigation
  setView: (v: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children, setView }: { children: ReactNode; setView: (v: string) => void }) {
  // Navigation
  const [dashView, setDashView] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true)
  
  // Toast
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  
  const showToastMsg = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2200)
  }
  
  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Fresh Carrots", category: "Vegetables", image: "https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png", variants: [{ name: "250g", stock: 45, initialStock: 100 }, { name: "500g", stock: 32, initialStock: 80 }, { name: "1 KG", stock: 18, initialStock: 50 }], lastEdited: "Feb 25, 2026" },
    { id: 2, name: "Premium Potatoes", category: "Vegetables", image: "https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png", variants: [{ name: "500g", stock: 28, initialStock: 60 }, { name: "1 KG", stock: 55, initialStock: 100 }, { name: "2 KG", stock: 12, initialStock: 30 }], lastEdited: "Feb 24, 2026" },
    { id: 3, name: "Fresh Tomatoes", category: "Vegetables", image: "https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png", variants: [{ name: "250g", stock: 8, initialStock: 40 }, { name: "500g", stock: 15, initialStock: 50 }, { name: "1 KG", stock: 22, initialStock: 60 }], lastEdited: "Feb 23, 2026" },
    { id: 4, name: "Red Apples", category: "Fruits", image: "https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png", variants: [{ name: "500g", stock: 35, initialStock: 80 }, { name: "1 KG", stock: 48, initialStock: 100 }], lastEdited: "Feb 22, 2026" },
    { id: 5, name: "Fresh Bananas", category: "Fruits", image: "https://i.postimg.cc/bw71qYYK/IMG-20260228-163147.png", variants: [{ name: "6 pcs", stock: 42, initialStock: 80 }, { name: "1 Dozen", stock: 28, initialStock: 50 }], lastEdited: "Feb 21, 2026" },
    { id: 6, name: "Organic Spinach", category: "Vegetables", image: "https://i.postimg.cc/MG1VHkvz/1000020586-removebg-preview.png", variants: [{ name: "1 Bundle", stock: 5, initialStock: 25 }], lastEdited: "Feb 20, 2026" },
    { id: 7, name: "Sweet Oranges", category: "Fruits", image: "https://i.postimg.cc/mr7Ckxtx/IMG-20260228-163156.png", variants: [{ name: "500g", stock: 30, initialStock: 70 }, { name: "1 KG", stock: 45, initialStock: 80 }], lastEdited: "Feb 19, 2026" },
    { id: 8, name: "Grapes Green", category: "Fruits", image: "https://i.postimg.cc/htkVK4PD/IMG-20260228-163208.png", variants: [{ name: "250g", stock: 3, initialStock: 20 }, { name: "500g", stock: 18, initialStock: 40 }], lastEdited: "Feb 18, 2026" },
  ])
  const [expandedInventory, setExpandedInventory] = useState<number | null>(null)
  const [editingInventoryItem, setEditingInventoryItem] = useState<InventoryItem | null>(null)
  
  // Alerts
  const alerts: Alert[] = [
    { title: "Low Stock Alert", desc: "Sourdough Loaf is running low.", type: "danger" },
    { title: "Expiry Warning", desc: "3 items expire tomorrow.", type: "warning" },
    { title: "New Order", desc: "Order #402 placed online.", type: "info" },
  ]
  
  // Reviews
  const [adminReviews, setAdminReviews] = useState<AdminReview[]>([
    { id: 1, product: 'Fresh Carrots', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', customerName: 'Joya Parvin', rating: 5, text: 'Super fresh! My kids loved them. Will definitely order again.', date: 'Feb 24, 2026', time: '3:42 PM' },
    { id: 2, product: 'Premium Potatoes', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png', customerName: 'Ahmed Rahman', rating: 4, text: 'Good quality but delivery took time. Product was fresh though.', date: 'Feb 23, 2026', time: '1:15 PM' },
    { id: 3, product: 'Red Apples', productCategory: 'Fruits', productImg: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png', customerName: 'Fatima Khatun', rating: 5, text: 'Best apples I have ever had! Sweet and crispy.', date: 'Feb 22, 2026', time: '10:30 AM' },
    { id: 4, product: 'Fresh Tomatoes', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png', customerName: 'Karim Uddin', rating: 2, text: 'Some tomatoes were damaged. Not happy with packaging.', date: 'Feb 21, 2026', time: '5:00 PM' },
    { id: 5, product: 'Organic Spinach', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/MG1VHkvz/1000020586-removebg-preview.png', customerName: 'Nasreen Akter', rating: 4, text: 'Very fresh and organic as promised. Recommended!', date: 'Feb 20, 2026', time: '11:20 AM' },
    { id: 6, product: 'Fresh Carrots', productCategory: 'Vegetables', productImg: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', customerName: 'Rafiq Islam', rating: 3, text: 'Average quality. Expected better for the price.', date: 'Feb 19, 2026', time: '2:45 PM' },
  ])
  
  // Categories - fetched from API
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  
  // Products - fetched from API
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [prodVarieties, setProdVarieties] = useState<{id: number; name: string; price: string; stock: string; discount: string}[]>([])
  const [prodFaqs, setProdFaqs] = useState<{id: number; question: string; answer: string}[]>([])
  const [prodImages, setProdImages] = useState<string[]>([])
  const [prodRelated, setProdRelated] = useState<number[]>([])
  
  // Related products will be loaded from products state
  const allRelatedOptions = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0,
    image: p.image
  }))
  
  // Orders - fetched from API
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrderFilter, setCurrentOrderFilter] = useState<'all' | 'pending' | 'approved' | 'canceled'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  // Coupons - products from database
  const couponProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    price: typeof p.price === 'string' ? p.price : `TK${p.price}`,
    img: p.image
  }))
  const couponCategories: CouponCategory[] = [
    { name:'Fruits & Vegetables', color:'#16a34a' },
    { name:'Dairy & Eggs', color:'#d97706' },
    { name:'Bakery', color:'#f59e0b' },
    { name:'Meat & Seafood', color:'#dc2626' },
    { name:'Beverages', color:'#16a34a' },
    { name:'Snacks', color:'#f59e0b' },
    { name:'Frozen Foods', color:'#0ea5e9' },
  ]
  
  // Coupons - fetched from API
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'pct' as 'pct' | 'fixed',
    value: '',
    expiry: '',
    scope: 'all' as 'all' | 'products' | 'categories',
  })
  const [pickedProducts, setPickedProducts] = useState<number[]>([])
  const [pickedCategories, setPickedCategories] = useState<string[]>([])
  
  // Abandoned
  const [abandonedCheckouts] = useState<AbandonedCheckout[]>([])
  const [expandedAbandoned, setExpandedAbandoned] = useState<number | null>(null)
  
  // Customers
  const [customerProfiles] = useState<CustomerProfile[]>([])
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null)
  
  // Settings
  const [settings, setSettings] = useState<Settings>({
    storeName: 'Krishi Bitan',
    storeEmail: 'support@krishibitan.com',
    storePhone: '+880 1234-567890',
    storeAddress: 'Dhaka, Bangladesh',
    currency: 'TK',
    deliveryCharge: 60,
    freeDeliveryMin: 500,
    universalDelivery: false,
    universalDeliveryCharge: 60,
  })
  
  // Credentials
  const [credentials, setCredentials] = useState<Credentials>({
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', stock: '' })
  
  // Handle add product to inventory
  const handleAddProductInventory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.stock) return
    const qty = parseInt(newProduct.stock)
    const newItem: InventoryItem = {
      id: Date.now(),
      name: newProduct.name,
      category: 'General',
      image: 'https://via.placeholder.com/80',
      variants: [{ name: 'Default', stock: qty, initialStock: qty }],
      lastEdited: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
    setInventory(prev => [newItem, ...prev])
    setNewProduct({ name: '', stock: '' })
    setIsModalOpen(false)
    showToastMsg('Product added to inventory!')
  }
  
  // Category edit function
  const openCategoryEdit = (cat: Category | null = null) => {
    if (cat) {
      setEditingCategory({ ...cat })
    } else {
      setEditingCategory({
        id: 'CAT-' + Date.now().toString().slice(-6),
        name: '',
        type: 'icon',
        icon: '',
        image: '',
        items: 0,
        created: 'Just now',
        status: 'Active'
      })
    }
  }
  
  // Product edit function
  const openProductEdit = (prod: Product | null = null) => {
    if (prod) {
      setEditingProduct({ ...prod, shortDesc: '', longDesc: '', offerSwitch: prod.offer })
    } else {
      setEditingProduct({
        id: Date.now(),
        name: '',
        category: '',
        image: 'https://via.placeholder.com/80',
        variants: '0 variants',
        price: 'TK0',
        discount: '0%',
        offer: false,
        status: 'active',
        shortDesc: '',
        longDesc: '',
        offerSwitch: false
      })
    }
    setProdVarieties([])
    setProdFaqs([])
    setProdImages([])
    setProdRelated([])
  }
  
  // Coupon edit function
  const openCouponEdit = (coupon: Coupon | null = null) => {
    if (coupon && coupon.id) {
      setCouponForm({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value.toString(),
        expiry: coupon.expiry,
        scope: coupon.scope,
      })
      setPickedProducts(coupon.selectedProducts || [])
      setPickedCategories(coupon.selectedCategories || [])
      setEditingCoupon(coupon)
    } else {
      setCouponForm({ code: '', type: 'pct', value: '', expiry: '', scope: 'all' })
      setPickedProducts([])
      setPickedCategories([])
      setEditingCoupon({ id: '', code: '', type: 'pct', value: 0, scope: 'all', expiry: '' })
    }
  }
  
  // Fetch functions
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          type: cat.type || 'icon',
          icon: cat.icon || '',
          image: cat.image || '',
          items: cat.items || 0,
          created: cat.created_at ? new Date(cat.created_at * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now',
          status: cat.status || 'Active'
        })))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data.map((prod: any) => ({
          id: prod.id,
          name: prod.name,
          category: prod.category,
          image: prod.image,
          images: prod.images,
          variants: '1 variant',
          price: `TK${prod.price}`,
          discount: prod.discount || '0%',
          offer: prod.offer === 1 || prod.offer === true,
          status: prod.status || 'active',
          shortDesc: prod.shortDesc || '',
          longDesc: prod.longDesc || '',
          variantsData: prod.variants,
          faqs: prod.faqs,
          relatedProducts: prod.relatedProducts
        })))
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      if (data.success) {
        setOrders(data.data.map((ord: any) => ({
          id: ord.id,
          customer: ord.customer_name,
          phone: ord.phone,
          address: ord.address,
          date: ord.date,
          time: ord.time,
          paymentMethod: ord.payment_method,
          status: ord.status,
          courierStatus: ord.courier_status,
          subtotal: ord.subtotal,
          delivery: ord.delivery,
          discount: ord.discount,
          couponCodes: ord.coupon_codes ? JSON.parse(ord.coupon_codes) : [],
          couponAmount: ord.coupon_amount,
          total: ord.total,
          canceledBy: ord.canceled_by,
          items: []
        })))
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }
  
  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons')
      const data = await response.json()
      if (data.success) {
        setCoupons(data.data.map((coup: any) => ({
          id: coup.id,
          code: coup.code,
          type: coup.type,
          value: coup.value,
          scope: coup.scope,
          expiry: coup.expiry || '',
          selectedProducts: coup.selected_products ? JSON.parse(coup.selected_products) : [],
          selectedCategories: coup.selected_categories ? JSON.parse(coup.selected_categories) : []
        })))
      }
    } catch (error) {
      console.error('Error fetching coupons:', error)
    }
  }
  
  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([
        fetchCategories(),
        fetchProducts(),
        fetchOrders(),
        fetchCoupons()
      ])
      setIsLoading(false)
    }
    fetchData()
  }, [])
  
  const value: AdminContextType = {
    // Navigation
    dashView,
    setDashView,
    sidebarCollapsed,
    setSidebarCollapsed,
    
    // Loading
    isLoading,
    
    // Toast
    showToast,
    setShowToast,
    toastMsg,
    setToastMsg,
    showToastMsg,
    
    // Inventory
    inventory,
    setInventory,
    expandedInventory,
    setExpandedInventory,
    editingInventoryItem,
    setEditingInventoryItem,
    
    // Alerts
    alerts,
    
    // Reviews
    adminReviews,
    setAdminReviews,
    
    // Categories
    categories,
    setCategories,
    editingCategory,
    setEditingCategory,
    refetchCategories: fetchCategories,
    
    // Products
    products,
    setProducts,
    editingProduct,
    setEditingProduct,
    prodVarieties,
    setProdVarieties,
    prodFaqs,
    setProdFaqs,
    prodImages,
    setProdImages,
    prodRelated,
    setProdRelated,
    allRelatedOptions,
    refetchProducts: fetchProducts,
    
    // Orders
    orders,
    setOrders,
    currentOrderFilter,
    setCurrentOrderFilter,
    selectedOrder,
    setSelectedOrder,
    refetchOrders: fetchOrders,
    
    // Coupons
    coupons,
    setCoupons,
    editingCoupon,
    setEditingCoupon,
    couponForm,
    setCouponForm,
    pickedProducts,
    setPickedProducts,
    pickedCategories,
    setPickedCategories,
    couponProducts,
    couponCategories,
    refetchCoupons: fetchCoupons,
    
    // Abandoned
    abandonedCheckouts,
    expandedAbandoned,
    setExpandedAbandoned,
    
    // Customers
    customerProfiles,
    expandedCustomer,
    setExpandedCustomer,
    
    // Settings
    settings,
    setSettings,
    
    // Credentials
    credentials,
    setCredentials,
    
    // Modal
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleAddProductInventory,
    
    // Edit functions
    openCategoryEdit,
    openProductEdit,
    openCouponEdit,
    
    // Navigation
    setView,
  }
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
