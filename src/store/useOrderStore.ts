import { create } from 'zustand'
import { Order, OrderItem } from '@/types'

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: 'pending' | 'approved' | 'canceled') => void
  getFilteredOrders: (filter: 'all' | 'pending' | 'approved' | 'canceled') => Order[]
}

// Sample data from AdminDashboard.tsx
const initialOrders: Order[] = [
  { 
    id: 'ORD-POTATO', 
    customer: 'Raihan', 
    phone: '+8801866228213', 
    address: 'Gulshan 2, Road 45, House 12, Dhaka',
    date: 'Feb 24, 2026',
    time: '10 min ago',
    paymentMethod: 'Cash on Delivery',
    status: 'pending',
    courierStatus: 'Processing',
    subtotal: 5850,
    delivery: 150,
    discount: 100,        
    couponCodes: ['FIRST10'], 
    couponAmount: 50,     
    total: 5850 + 150 - 100 - 50,
    canceledBy: null,
    items: [
      { name: 'Organic Milk', variant: '1L', qty: 2, basePrice: 150, offerText: '5% off', offerDiscount: 7.5, couponCode: null, couponDiscount: 0 }, 
      { name: 'Samsung Galaxy S24', variant: '256GB', qty: 1, basePrice: 4180, offerText: null, offerDiscount: 0, couponCode: 'NEWPHONE', couponDiscount: 100 }, 
      { name: 'Premium Coffee', variant: null, qty: 1, basePrice: 1370, offerText: '10% off', offerDiscount: 137, couponCode: 'COFFEE20', couponDiscount: 50 }, 
    ]
  },
  { 
    id: 'ORD-002', 
    customer: 'Sarah Johnson', 
    phone: '+8801987654321', 
    address: 'Dhanmondi, Road 8A, Dhaka',
    date: 'Feb 25, 2026',
    time: '25 min ago',
    paymentMethod: 'Pre-payment',
    status: 'approved',
    courierStatus: 'Shipping', 
    subtotal: 1650,
    delivery: 0,
    discount: 0,          
    couponCodes: [],        
    couponAmount: 0,
    total: 1650,
    canceledBy: null,
    items: [
      { name: 'Orange Juice', variant: '1L', qty: 2, basePrice: 600, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
      { name: 'Apples', variant: '1kg', qty: 1, basePrice: 450, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
    ]
  },
  { 
    id: 'ORD-003', 
    customer: 'Mike Wilson', 
    phone: '+8801555123456', 
    address: 'Banani, Block C, Dhaka',
    date: 'Feb 24, 2026',
    time: '1 hour ago',
    paymentMethod: 'Cash on Delivery',
    status: 'canceled',
    courierStatus: 'Canceled', 
    subtotal: 4200,
    delivery: 100,
    discount: 500,        
    couponCodes: [],        
    couponAmount: 0,
    total: 4200 - 500 + 100,
    canceledBy: 'Customer',
    items: [
      { name: 'Basmati Rice', variant: '5kg', qty: 1, basePrice: 1800, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
      { name: 'Olive Oil', variant: '2L', qty: 2, basePrice: 1200, offerText: null, offerDiscount: 0, couponCode: null, couponDiscount: 0 }, 
    ]
  },
]

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: initialOrders,

  addOrder: (order: Order) => {
    set((state) => ({
      orders: [order, ...state.orders]
    }))
  },

  updateOrderStatus: (id: string, status: 'pending' | 'approved' | 'canceled') => {
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id === id) {
          return { 
            ...order, 
            status, 
            canceledBy: status === 'canceled' ? 'Admin' : null,
            courierStatus: status === 'approved' ? 'Shipping' : status === 'canceled' ? 'Canceled' : order.courierStatus
          }
        }
        return order
      })
    }))
  },

  getFilteredOrders: (filter: 'all' | 'pending' | 'approved' | 'canceled') => {
    const state = get()
    if (filter === 'all') {
      return state.orders
    }
    return state.orders.filter((order) => order.status === filter)
  }
}))
