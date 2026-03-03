'use client'

import React from 'react'
import type { Coupon } from '@/types'
import { useAdmin } from '@/components/admin/context/AdminContext'

export function CouponsView() {
  const {
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
    showToastMsg,
  } = useAdmin()

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

  const handleSaveCoupon = () => {
    if (!couponForm.code.trim()) { showToastMsg('Please enter a coupon code.'); return }
    if (!couponForm.value.trim()) { showToastMsg('Please enter a discount value.'); return }

    const newCoupon: Coupon = {
      id: editingCoupon?.id || Date.now().toString(),
      code: couponForm.code.toUpperCase(),
      type: couponForm.type,
      value: parseFloat(couponForm.value),
      scope: couponForm.scope,
      expiry: couponForm.expiry,
      selectedProducts: couponForm.scope === 'products' ? pickedProducts : undefined,
      selectedCategories: couponForm.scope === 'categories' ? pickedCategories : undefined,
    }

    if (editingCoupon?.id) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? newCoupon : c))
      showToastMsg('Coupon updated!')
    } else {
      setCoupons([...coupons, newCoupon])
      showToastMsg('Coupon added!')
    }
    setEditingCoupon(null)
  }

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id))
    showToastMsg('Coupon deleted!')
  }

  const toggleProductPick = (id: number) => {
    if (pickedProducts.includes(id)) {
      setPickedProducts(pickedProducts.filter(p => p !== id))
    } else {
      setPickedProducts([...pickedProducts, id])
    }
  }

  const toggleCategoryPick = (name: string) => {
    if (pickedCategories.includes(name)) {
      setPickedCategories(pickedCategories.filter(c => c !== name))
    } else {
      setPickedCategories([...pickedCategories, name])
    }
  }

  const formatExpiry = (expiry: string) => {
    if (!expiry) return '[Not Applied]'
    const d = new Date(expiry + 'T00:00:00')
    return `[${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}]`
  }

  return (
    <div className="p-4 md:p-8" style={{fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: '#f4f7fa', color: '#1e293b', margin: '0', minHeight: 'calc(100vh - 80px)'}}>
      {editingCoupon ? (
        <div className="max-w-[560px] mx-auto px-6">
          {/* Back Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setEditingCoupon(null)} className="bg-none border-none cursor-pointer p-0 flex items-center">
              <i className="ri-arrow-left-line text-xl text-[#64748b]"></i>
            </button>
            <div>
              <div className="text-lg font-bold font-sans">{editingCoupon.id ? 'Edit Coupon' : 'Add Coupon'}</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Configure your discount coupon</div>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveCoupon(); }}>
            {/* Coupon Details Card */}
            <div className="bg-white border border-[#e2e8e0] rounded-xl p-6 mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-4">Coupon Details</div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#64748b] mb-1.5">Coupon Code</label>
                <input type="text" 
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8e0] rounded-lg text-sm outline-none focus:border-[#16a34a] transition-colors"
                  style={{textTransform: 'uppercase', letterSpacing: '0.6px'}}
                  placeholder="e.g., SUMMER20"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1.5">Coupon Type</label>
                  <div className="relative">
                    <select 
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8e0] rounded-lg text-sm outline-none appearance-none cursor-pointer focus:border-[#16a34a] transition-colors"
                      value={couponForm.type}
                      onChange={(e) => setCouponForm({...couponForm, type: e.target.value as 'pct' | 'fixed'})}>
                      <option value="pct">% Percentage Off</option>
                      <option value="fixed">$ Fixed Amount Off</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1.5">
                    {couponForm.type === 'pct' ? 'Discount Percentage' : 'Discount Amount'}
                  </label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm ${couponForm.type === 'pct' ? 'text-[#d97706]' : 'text-[#16a34a]'}`}>
                      {couponForm.type === 'pct' ? '%' : '$'}
                    </span>
                    <input type="number" 
                      className="w-full px-3.5 py-2.5 pl-7 bg-white border border-[#e2e8e0] rounded-lg text-sm outline-none focus:border-[#16a34a] transition-colors"
                      placeholder={couponForm.type === 'pct' ? '20' : '15'}
                      value={couponForm.value}
                      onChange={(e) => setCouponForm({...couponForm, value: e.target.value})}
                      min="1" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1.5">
                  Expiry Date <span className="text-[#cbd5e1] text-[11px] font-normal ml-1">(optional)</span>
                </label>
                <input type="date" 
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8e0] rounded-lg text-sm outline-none focus:border-[#16a34a] transition-colors"
                  value={couponForm.expiry}
                  onChange={(e) => setCouponForm({...couponForm, expiry: e.target.value})} />
              </div>
            </div>

            {/* Applies To Card */}
            <div className="bg-white border border-[#e2e8e0] rounded-xl p-6 mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-4">Applies To</div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#64748b] mb-1.5">Scope</label>
                <div className="relative">
                  <select 
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8e0] rounded-lg text-sm outline-none appearance-none cursor-pointer focus:border-[#16a34a] transition-colors"
                    value={couponForm.scope}
                    onChange={(e) => setCouponForm({...couponForm, scope: e.target.value as 'all' | 'products' | 'categories'})}>
                    <option value="all">All Products</option>
                    <option value="products">Specific Products</option>
                    <option value="categories">Specific Categories</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"></i>
                </div>
              </div>

              {/* Product Picker */}
              {couponForm.scope === 'products' && (
                <div className="pt-4 border-t border-[#f1f5f9]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Select Products</div>
                  <div className="grid grid-cols-2 gap-2">
                    {couponProducts.map(p => (
                      <div key={p.id} 
                        className={`flex items-center gap-2.5 p-2.5 border-[1.5px] rounded-lg cursor-pointer transition-all ${pickedProducts.includes(p.id) ? 'border-[#16a34a] bg-[#f0fdf4]' : 'border-[#e2e8e0] bg-white hover:border-[#94a3b8]'}`}
                        onClick={() => toggleProductPick(p.id)}>
                        <img src={p.img} alt={p.name} className="w-9 h-9 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{p.name}</div>
                          <div className="text-[11px] text-[#16a34a] font-semibold">{p.price}</div>
                        </div>
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${pickedProducts.includes(p.id) ? 'bg-[#16a34a] border-[#16a34a]' : 'border-[1.5px] border-[#cbd5e1]'}`}>
                          {pickedProducts.includes(p.id) && <span className="text-white text-[10px]">✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Picker */}
              {couponForm.scope === 'categories' && (
                <div className="pt-4 border-t border-[#f1f5f9]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-3">Select Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {couponCategories.map(cat => (
                      <div key={cat.name}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 border-[1.5px] rounded-lg cursor-pointer text-xs font-medium transition-all ${pickedCategories.includes(cat.name) ? 'border-[#16a34a] bg-[#f0fdf4]' : 'border-[#e2e8e0] bg-white hover:border-[#94a3b8]'}`}
                        onClick={() => toggleCategoryPick(cat.name)}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background: cat.color}}></span>
                        <span className={pickedCategories.includes(cat.name) ? 'text-[#16a34a]' : ''}>{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-1">
              <button type="button" onClick={() => setEditingCoupon(null)} className="flex-1 py-3 bg-white text-[#64748b] border-[1.5px] border-[#e2e8e0] rounded-lg text-sm font-medium hover:bg-[#f8faf8] transition-all">Cancel</button>
              <button type="submit" className="flex-1 py-3 bg-[#16a34a] text-white border-none rounded-lg text-sm font-semibold hover:bg-[#15803d] transition-all">Save Coupon</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="max-w-full px-0">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-7">
            <div className="text-lg font-bold font-sans">Coupon Management</div>
            <button onClick={() => openCouponEdit()} className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#16a34a] text-white border-none rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-[#15803d] transition-colors">
              <i className="ri-add-line text-base"></i>
              Add Coupon
            </button>
          </div>

          {/* Table */}
          <div className="flex flex-col gap-2">
            {/* Header Row */}
            <div className="grid grid-cols-6 pb-3 border-b border-[#f1f5f9] mb-1">
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b]">Code</div>
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b]">Type</div>
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b]">Discount</div>
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b]">Applies To</div>
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b] text-right">Expiry</div>
              <div className="px-6 text-[11px] font-bold uppercase tracking-wider text-[#64748b] text-right">Action</div>
            </div>

            {/* Data Rows */}
            {coupons.map((coupon) => (
              <div key={coupon.id} className="grid grid-cols-6 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_#f1f5f9] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.07),0_0_0_1px_#e2e8f0] transition-shadow">
                <div className="px-6 py-5 border-r border-[#eef2f6] flex items-center">
                  <span className="text-[13px] font-bold tracking-[0.7px] truncate">{coupon.code}</span>
                </div>
                <div className="px-6 py-5 border-r border-[#eef2f6] flex items-center">
                  <span className={`text-[13px] font-medium ${coupon.type === 'pct' ? 'text-[#d97706]' : 'text-[#16a34a]'}`}>
                    [{coupon.type === 'pct' ? '% Percentage' : '$ Fixed'}]
                  </span>
                </div>
                <div className="px-6 py-5 border-r border-[#eef2f6] flex items-center">
                  <span className={`text-[13px] font-medium ${coupon.type === 'pct' ? 'text-[#d97706]' : 'text-[#16a34a]'}`}>
                    [{coupon.type === 'pct' ? `${coupon.value}% Off` : `$${coupon.value} Off`}]
                  </span>
                </div>
                <div className="px-6 py-5 border-r border-[#eef2f6] flex items-center">
                  <span className={`text-[13px] font-medium ${coupon.scope === 'all' ? 'text-[#16a34a]' : 'text-[#f59e0b]'}`}>
                    [{coupon.scope === 'all' ? 'All Products' : coupon.scope === 'products' ? 'Specific Products' : 'Specific Categories'}]
                  </span>
                </div>
                <div className="px-6 py-5 border-r border-[#eef2f6] flex items-center justify-end">
                  <span className="text-[13px] font-medium text-[#94a3b8]">{formatExpiry(coupon.expiry)}</span>
                </div>
                <div className="px-6 py-5 flex items-center justify-end">
                  <div className="flex gap-3.5">
                    <i className="ri-pencil-line text-[17px] text-[#94a3b8] cursor-pointer hover:text-[#1e293b] transition-colors" onClick={() => openCouponEdit(coupon)}></i>
                    <i className="ri-delete-bin-line text-[17px] text-[#94a3b8] cursor-pointer hover:text-[#ef4444] transition-colors" onClick={() => deleteCoupon(coupon.id)}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CouponsView
