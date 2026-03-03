'use client'

import { useState } from 'react'
import { ViewType } from '@/types'
import { useCartStore, useOrderStore } from '@/store'

// Layout Components
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import Footer from '@/components/layout/Footer'

// Shop Components
import Shop from '@/components/shop/Shop'
import ProductDetail from '@/components/shop/ProductDetail'

// Cart Components
import Cart from '@/components/cart/Cart'
import Checkout from '@/components/cart/Checkout'

// Orders Components
import Orders from '@/components/orders/Orders'

// Admin Components
import AdminDashboard from '@/components/admin/AdminDashboard'

// Main App Entry
export default function Home() {
  const [view, setView] = useState<ViewType>('shop')
  
  // Use Zustand stores
  const { items: cartItems, addItem: addToCart, clearCart } = useCartStore()
  const { orders, addOrder } = useOrderStore()

  const handleConfirmOrder = () => {
    // Create order from cart
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-5)}`,
      customer: 'Customer',
      phone: '',
      address: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: 'Just now',
      paymentMethod: 'Cash on Delivery',
      status: 'pending' as const,
      courierStatus: 'Processing',
      subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      delivery: 60,
      discount: 0,
      couponCodes: [],
      couponAmount: 0,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 60,
      canceledBy: null,
      items: cartItems.map(item => ({
        name: item.name,
        variant: item.weight,
        qty: item.quantity,
        basePrice: item.price,
        offerText: null,
        offerDiscount: 0,
        couponCode: null,
        couponDiscount: 0,
      })),
    }
    
    addOrder(newOrder)
    clearCart()
    setView('orders')
    window.scrollTo(0, 0)
  }

  // Convert cart items to the format expected by Cart component
  const cartItemsForDisplay = cartItems.map(item => ({
    ...item,
    oldPrice: item.oldPrice || item.price,
  }))

  // Check if we should show footer (not on admin view)
  const showFooter = view !== 'admin'

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header view={view} setView={setView} cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <div className="flex-grow w-full">
        {view === 'shop' && <Shop setView={setView} addToCart={addToCart} />}
        {view === 'product' && <ProductDetail setView={setView} addToCart={addToCart} />}
        {view === 'cart' && (
          <Cart 
            setView={setView} 
            cartItems={cartItemsForDisplay} 
            setCartItems={(items) => {
              // This would need proper implementation with store
              clearCart()
              items.forEach(item => addToCart(item))
            }} 
          />
        )}
        {view === 'checkout' && <Checkout setView={setView} onConfirm={handleConfirmOrder} />}
        {view === 'orders' && <Orders orders={orders.map(o => ({ id: o.id }))} setView={setView} />}
        {view === 'admin' && <AdminDashboard setView={setView} />}
      </div>
      {showFooter && <Footer />}
      <BottomNav view={view} setView={setView} />
    </div>
  )
}
