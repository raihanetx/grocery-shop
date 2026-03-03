import { create } from 'zustand'
import { CustomerProfile, AbandonedCheckout } from '@/types'

interface CustomerState {
  customers: CustomerProfile[]
  abandonedCheckouts: AbandonedCheckout[]
  addCustomer: (customer: CustomerProfile) => void
  updateCustomer: (id: number, data: Partial<CustomerProfile>) => void
  deleteCustomer: (id: number) => void
  addAbandonedCheckout: (checkout: AbandonedCheckout) => void
}

// Sample abandoned checkouts from AdminDashboard.tsx
const initialAbandonedCheckouts: AbandonedCheckout[] = [
  {
    id: 1, name: 'Rafi Hossain', phone: '+1 987 654 321',
    address: '555 Park Ave, Dhaka',
    visitTime: '15 min ago', visitDate: 'Feb 24, 2026 · 3:42 PM',
    totalVisits: 3, completedOrders: 1,
    history: [
      {
        date: 'Feb 24, 2026', time: '3:42 PM', timeAgo: '15 min ago', status: 'abandoned',
        products: [
          { name: 'Organic Milk', variants: [{ label: '500ml', qty: 2 }] },
          { name: 'Whole Wheat Bread', variants: [{ label: null, qty: 2 }] },
          { name: 'Farm Eggs', variants: [{ label: '12 pcs', qty: 1 }] },
          { name: 'Cheddar Cheese', variants: [{ label: '200g', qty: 1 }] },
        ],
        total: 45.92
      },
      {
        date: 'Feb 20, 2026', time: '5:10 PM', timeAgo: '4 days ago', status: 'abandoned',
        products: [{ name: 'Butter', variants: [{ label: '200g', qty: 1 }] }],
        total: 12.50
      },
      {
        date: 'Feb 18, 2026', time: '7:05 PM', timeAgo: '6 days ago', status: 'completed',
        products: [
          { name: 'Basmati Rice', variants: [{ label: '2kg', qty: 1 }] },
          { name: 'Soybean Oil', variants: [{ label: '1L', qty: 1 }] },
        ],
        total: 35.97
      },
    ]
  },
  {
    id: 2, name: 'Tariq Mahmud', phone: '+1 765 432 109',
    address: '888 River St, Chittagong',
    visitTime: '2 hours ago', visitDate: 'Feb 24, 2026 · 1:55 PM',
    totalVisits: 5, completedOrders: 2,
    history: [
      {
        date: 'Feb 24, 2026', time: '1:55 PM', timeAgo: '2 hours ago', status: 'abandoned',
        products: [
          { name: 'Basmati Rice', variants: [{ label: '1kg', qty: 3 }] },
          { name: 'Cooking Oil', variants: [{ label: '500ml', qty: 4 }] },
          { name: 'Lentils', variants: [{ label: 'Red', qty: 2 }] },
          { name: 'Spices', variants: [{ label: 'Mix', qty: 1 }] },
        ],
        total: 284.61
      },
      {
        date: 'Feb 22, 2026', time: '9:00 AM', timeAgo: '2 days ago', status: 'completed',
        products: [{ name: 'Salt', variants: [{ label: '1kg', qty: 2 }] }],
        total: 10.00
      },
      {
        date: 'Feb 15, 2026', time: '6:30 PM', timeAgo: '9 days ago', status: 'completed',
        products: [{ name: 'Sugar', variants: [{ label: '1kg', qty: 2 }] }],
        total: 22.15
      },
      {
        date: 'Feb 10, 2026', time: '12:00 PM', timeAgo: '2 weeks ago', status: 'abandoned',
        products: [{ name: 'Tea Leaves', variants: [{ label: '400g', qty: 1 }] }],
        total: 8.50
      },
      {
        date: 'Feb 05, 2026', time: '4:20 PM', timeAgo: '3 weeks ago', status: 'abandoned',
        products: [{ name: 'Biscuits', variants: [{ label: 'Pack', qty: 5 }] }],
        total: 15.20
      },
    ]
  },
  {
    id: 3, name: 'Sumaiya Akter', phone: '+1 654 321 098',
    address: '12 Green Rd, Sylhet',
    visitTime: '4 hours ago', visitDate: 'Feb 24, 2026 · 11:40 AM',
    totalVisits: 2, completedOrders: 1,
    history: [
      {
        date: 'Feb 24, 2026', time: '11:40 AM', timeAgo: '4 hours ago', status: 'abandoned',
        products: [
          { name: 'Yogurt', variants: [{ label: '150g', qty: 2 }] },
          { name: 'Milk', variants: [{ label: '1L', qty: 1 }] },
          { name: 'Honey', variants: [{ label: '250g', qty: 1 }] },
        ],
        total: 27.41
      },
      {
        date: 'Feb 20, 2026', time: '10:00 AM', timeAgo: '4 days ago', status: 'completed',
        products: [{ name: 'Apples', variants: [{ label: '1kg', qty: 1 }] }],
        total: 15.00
      }
    ]
  }
]

// Sample customer profiles from AdminDashboard.tsx
const initialCustomerProfiles: CustomerProfile[] = [
  {
    id: 1, name: 'Rafi Hossain', phone: '+8801712345678',
    address: '555 Park Ave, Dhaka',
    totalSpent: 450.50, totalOrders: 5,
    orders: [
      {
        date: 'Feb 24, 2026', time: '3:42 PM', timeAgo: '2 days ago', visitCount: 21,
        products: [
          { name: 'Organic Milk', variants: [{ label: '1L', qty: 2 }] },
          { name: 'Whole Wheat Bread', variants: [{ label: null, qty: 2 }] },
          { name: 'Farm Eggs', variants: [{ label: '12 pcs', qty: 1 }] },
        ],
        total: 45.92
      },
      {
        date: 'Feb 10, 2026', time: '5:10 PM', timeAgo: '2 weeks ago', visitCount: 15,
        products: [
          { name: 'Basmati Rice', variants: [{ label: '5kg', qty: 1 }] },
          { name: 'Soybean Oil', variants: [{ label: '2L', qty: 1 }] },
        ],
        total: 85.50
      },
    ]
  },
  {
    id: 2, name: 'Tariq Mahmud', phone: '+8801812345678',
    address: '888 River St, Chittagong',
    totalSpent: 1250.00, totalOrders: 12,
    orders: [
      {
        date: 'Feb 25, 2026', time: '10:00 AM', timeAgo: '5 hours ago', visitCount: 42,
        products: [
          { name: 'Beef Meat', variants: [{ label: '2kg', qty: 1 }] },
          { name: 'Chicken', variants: [{ label: 'Whole', qty: 2 }] },
          { name: 'Spices Mix', variants: [{ label: 'Pack', qty: 3 }] },
          { name: 'Onions', variants: [{ label: '5kg', qty: 1 }] },
        ],
        total: 320.00
      },
    ]
  },
  {
    id: 3, name: 'Sumaiya Akter', phone: '+8801912345678',
    address: '12 Green Rd, Sylhet',
    totalSpent: 85.00, totalOrders: 2,
    orders: [
      {
        date: 'Jan 20, 2026', time: '4:00 PM', timeAgo: '1 month ago', visitCount: 8,
        products: [
          { name: 'Face Wash', variants: [{ label: '100ml', qty: 1 }] },
          { name: 'Shampoo', variants: [{ label: '200ml', qty: 1 }] },
        ],
        total: 45.00
      }
    ]
  }
]

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: initialCustomerProfiles,
  abandonedCheckouts: initialAbandonedCheckouts,

  addCustomer: (customer: CustomerProfile) => {
    set((state) => ({
      customers: [...state.customers, customer]
    }))
  },

  updateCustomer: (id: number, data: Partial<CustomerProfile>) => {
    set((state) => ({
      customers: state.customers.map((customer) => 
        customer.id === id ? { ...customer, ...data } : customer
      )
    }))
  },

  deleteCustomer: (id: number) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id)
    }))
  },

  addAbandonedCheckout: (checkout: AbandonedCheckout) => {
    set((state) => ({
      abandonedCheckouts: [...state.abandonedCheckouts, checkout]
    }))
  }
}))

// Helper function to get initials from name
export const getInitials = (name: string): string => {
  return name.split(' ').map(w => w[0]).join('').toUpperCase()
}
