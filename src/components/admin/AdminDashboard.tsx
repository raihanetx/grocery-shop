'use client'

import React from 'react'
import { AdminProvider, useAdmin } from '@/components/admin/context/AdminContext'

// View Components
import OverviewView from '@/components/admin/views/OverviewView'
import CategoriesView from '@/components/admin/views/CategoriesView'
import ProductsView from '@/components/admin/views/ProductsView'
import OrdersView from '@/components/admin/views/OrdersView'
import CouponsView from '@/components/admin/views/CouponsView'
import AbandonedView from '@/components/admin/views/AbandonedView'
import CustomersView from '@/components/admin/views/CustomersView'
import InventoryView from '@/components/admin/views/InventoryView'
import ReviewsView from '@/components/admin/views/ReviewsView'
import SettingsView from '@/components/admin/views/SettingsView'
import CredentialsView from '@/components/admin/views/CredentialsView'

// Types
import type { ViewType } from '@/types'

// Navigation items configuration
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

// Main Dashboard Content Component (uses context)
function AdminDashboardContent({ setView }: { setView: (v: string) => void }) {
  const {
    dashView,
    setDashView,
    sidebarCollapsed,
    setSidebarCollapsed,
    editingCategory,
    setEditingCategory,
    editingProduct,
    setEditingProduct,
    editingCoupon,
    setEditingCoupon,
    openCategoryEdit,
    openProductEdit,
    openCouponEdit,
    showToast,
    toastMsg,
    inventory,
    setInventory,
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleAddProductInventory,
  } = useAdmin()

  const getPageTitle = () => {
    if (editingCategory) return 'Edit Category'
    if (editingProduct) return 'Edit Product'
    if (editingCoupon) return 'Edit Coupon'
    switch(dashView) {
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

  const getPageDesc = () => {
    if (editingCategory) return 'Modify category details and settings'
    if (editingProduct) return 'Update product information and variants'
    if (editingCoupon) return 'Adjust coupon rules and availability'
    switch(dashView) {
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

  const clearEditingStates = () => {
    setEditingCategory(null)
    setEditingProduct(null)
    setEditingCoupon(null)
  }

  return (
    <div className="admin-layout" style={{fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"}}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          zIndex: 9999,
          animation: 'slideIn 0.2s ease-out',
          fontSize: '14px',
          fontWeight: 500,
        }}>
          {toastMsg}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-brand">
          <img src="https://i.postimg.cc/4xZk3k2j/IMG-20260226-120143.png" alt="Logo" style={{width: '32px', height: '32px', objectFit: 'contain'}} />
          <h2>Krishi Bitan</h2>
        </div>
        <button className="admin-sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Main Menu</div>
            {navItems.map(item => (
              <div 
                key={item.id}
                className={`admin-nav-item ${dashView === item.id && !editingCategory && !editingProduct && !editingCoupon ? 'active' : ''}`}
                onClick={() => { setDashView(item.id); clearEditingStates(); }}
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
                onClick={() => { setDashView(item.id); clearEditingStates(); }}
                data-tooltip={item.label}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-add-btn" onClick={() => setIsModalOpen(true)} data-tooltip="Add Inventory">
            <i className="ri-add-line"></i>
            <span>Add Inventory</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Page Header with Back button for editing states */}
        <div className="admin-page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <div>
            {editingCategory || editingProduct || editingCoupon ? (
              <h1 style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'}} onClick={clearEditingStates}>
                <i className="ri-arrow-left-line" style={{fontSize: '20px'}}></i>
                {getPageTitle()}
              </h1>
            ) : (
              <h1>{getPageTitle()}</h1>
            )}
            <p>{getPageDesc()}</p>
          </div>
          <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
            {/* Action buttons for specific views */}
            {(dashView === 'categories' && !editingCategory) && (
              <button className="btn-admin-minimal btn-admin-primary" onClick={() => openCategoryEdit()}>+ Add Category</button>
            )}
            {(dashView === 'products' && !editingProduct) && (
              <button className="btn-admin-minimal btn-admin-primary" onClick={() => openProductEdit()}>+ Add Product</button>
            )}
            {(dashView === 'coupons' && !editingCoupon) && (
              <button className="btn-admin-minimal btn-admin-primary" onClick={() => openCouponEdit()}>+ Add Coupon</button>
            )}
          </div>
        </div>

        {/* View Content */}
        {dashView === 'overview' && !editingCategory && !editingProduct && (
          <OverviewView setDashView={setDashView} />
        )}
        
        {dashView === 'categories' && (
          <CategoriesView />
        )}
        
        {dashView === 'products' && (
          <ProductsView />
        )}
        
        {dashView === 'orders' && (
          <OrdersView />
        )}
        
        {dashView === 'coupons' && (
          <CouponsView />
        )}
        
        {dashView === 'abandoned' && (
          <AbandonedView />
        )}
        
        {dashView === 'customers' && (
          <CustomersView />
        )}
        
        {dashView === 'inventory' && (
          <InventoryView />
        )}
        
        {dashView === 'reviews' && (
          <ReviewsView />
        )}
        
        {dashView === 'settings' && (
          <SettingsView />
        )}
        
        {dashView === 'credentials' && (
          <CredentialsView />
        )}
      </main>

      {/* Add Inventory Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '400px',
            maxWidth: '90vw',
          }}>
            <h3 style={{marginBottom: '16px', fontSize: '18px', fontWeight: 600}}>Add New Product</h3>
            <form onSubmit={handleAddProductInventory}>
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500}}>Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter product name"
                />
              </div>
              <div style={{marginBottom: '24px'}}>
                <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500}}>Stock Quantity</label>
                <input 
                  type="number" 
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                  placeholder="Enter stock quantity"
                />
              </div>
              <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#16a34a',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Back to Shop Button */}
      <button
        onClick={() => setView('shop')}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          zIndex: 100,
        }}
      >
        <i className="ri-arrow-left-line"></i>
        Back to Shop
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Main Export with Provider wrapper
export default function AdminDashboard({ setView }: { setView: (v: ViewType) => void }) {
  return (
    <AdminProvider setView={setView}>
      <AdminDashboardContent setView={setView} />
    </AdminProvider>
  )
}
// Force recompile Tue Mar  3 06:26:52 UTC 2026
// Updated 1772519514
