'use client'

import { memo } from 'react'
import { ViewType } from '@/types'
import { logoUrl } from '@/lib/constants'

interface AdminSidebarProps {
  dashView: string
  setDashView: (view: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  onAddInventory: () => void
  editingCategory: boolean
  editingProduct: boolean
  editingCoupon: boolean
  setEditingCategory: (cat: null) => void
  setEditingProduct: (prod: null) => void
  setEditingCoupon: (coupon: null) => void
}

const navItems = [
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

const configItems = [
  { id: 'settings', label: 'Settings', icon: 'ri-settings-3-line' },
  { id: 'credentials', label: 'Credentials', icon: 'ri-shield-keyhole-line' },
]

function AdminSidebar({
  dashView,
  setDashView,
  sidebarCollapsed,
  setSidebarCollapsed,
  onAddInventory,
  editingCategory,
  editingProduct,
  editingCoupon,
  setEditingCategory,
  setEditingProduct,
  setEditingCoupon,
}: AdminSidebarProps) {
  const handleNavClick = (id: string) => {
    setDashView(id)
    setEditingCategory(null)
    setEditingProduct(null)
    setEditingCoupon(null)
  }

  return (
    <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-brand">
        <img src={logoUrl} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        <h2>Krishi Bitan</h2>
      </div>
      <button
        className="admin-sidebar-toggle"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      <nav className="admin-sidebar-nav">
        <div className="admin-nav-section">
          <div className="admin-nav-section-title">Main Menu</div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`admin-nav-item ${dashView === item.id && !editingCategory && !editingProduct && !editingCoupon ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              data-tooltip={item.label}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="admin-nav-divider"></div>

        <div className="admin-nav-section">
          <div className="admin-nav-section-title">Configuration</div>
          {configItems.map(item => (
            <div
              key={item.id}
              className={`admin-nav-item ${dashView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              data-tooltip={item.label}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-add-btn" onClick={onAddInventory} data-tooltip="Add Inventory">
          <i className="ri-add-line"></i>
          <span>Add Inventory</span>
        </button>
      </div>
    </aside>
  )
}

export default memo(AdminSidebar)
