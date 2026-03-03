import { create } from 'zustand'

interface AdminState {
  dashView: string
  sidebarCollapsed: boolean
  setDashView: (view: string) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  dashView: 'overview',
  sidebarCollapsed: false,

  setDashView: (view: string) => {
    set({ dashView: view })
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed })
  }
}))

// Navigation items for admin sidebar
export const adminNavItems = [
  { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
  { id: 'orders', label: 'Orders', icon: 'ri-shopping-bag-line' },
  { id: 'products', label: 'Products', icon: 'ri-store-2-line' },
  { id: 'inventory', label: 'Inventory', icon: 'ri-archive-line' },
  { id: 'categories', label: 'Categories', icon: 'ri-folder-line' },
  { id: 'coupons', label: 'Coupons', icon: 'ri-ticket-2-line' },
  { id: 'reviews', label: 'Reviews', icon: 'ri-star-line' },
  { id: 'abandoned', label: 'Abandoned', icon: 'ri-alert-line' },
  { id: 'customers', label: 'Customers', icon: 'ri-user-line' },
]

export const adminConfigItems = [
  { id: 'settings', label: 'Settings', icon: 'ri-settings-3-line' },
  { id: 'credentials', label: 'Credentials', icon: 'ri-shield-keyhole-line' },
]

// Helper function to get page title based on current view
export const getAdminPageTitle = (dashView: string): string => {
  switch (dashView) {
    case 'overview': return 'Store Overview'
    case 'orders': return 'Order Management'
    case 'products': return 'Product Management'
    case 'inventory': return 'Inventory Management'
    case 'categories': return 'Category Management'
    case 'coupons': return 'Coupon Management'
    case 'reviews': return 'Review Management'
    case 'abandoned': return 'Abandoned Checkouts'
    case 'customers': return 'Customer History'
    case 'settings': return 'System Settings'
    case 'credentials': return 'Settings Configuration'
    default: return 'Dashboard'
  }
}

// Helper function to get page description based on current view
export const getAdminPageDesc = (dashView: string): string => {
  switch (dashView) {
    case 'overview': return 'Performance metrics for October 24, 2023'
    case 'orders': return 'Detailed overview of all incoming requests'
    case 'products': return 'Manage your store items and inventory'
    case 'inventory': return 'Track and manage product stock levels'
    case 'categories': return 'Organize your product categories'
    case 'coupons': return 'Manage discount coupons for your store'
    case 'reviews': return 'Manage customer reviews and feedback'
    case 'abandoned': return 'Customers who visited but didn\'t complete checkout'
    case 'customers': return 'Overview of customer orders and spending'
    case 'settings': return 'Configure your store preferences and policies'
    case 'credentials': return 'Manage your account credentials and system integrations'
    default: return ''
  }
}
