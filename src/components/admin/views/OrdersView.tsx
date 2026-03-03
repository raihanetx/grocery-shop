'use client'

import React from 'react'
import { useAdmin } from '@/components/admin/context/AdminContext'
import type { Order } from '@/types'

export function OrdersView() {
  const {
    orders,
    currentOrderFilter,
    setCurrentOrderFilter,
    selectedOrder,
    setSelectedOrder,
    setOrders,
    showToastMsg
  } = useAdmin()

  // Filter orders based on current filter
  const filteredOrders = currentOrderFilter === 'all'
    ? orders
    : orders.filter(order => order.status === currentOrderFilter)

  // Update order status function
  const updateOrderStatus = (id: string, status: 'approved' | 'canceled') => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        return {
          ...order,
          status,
          canceledBy: status === 'canceled' ? 'Admin' : null
        }
      }
      return order
    }))
  }

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showToastMsg('Number Copied!')
  }

  return (
    <div className="p-4 md:p-8" style={{fontFamily: "'Inter', sans-serif", backgroundColor: '#eef0f4', color: '#1c2333', margin: '0', minHeight: 'calc(100vh - 80px)'}}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c2333] tracking-tight">Order Management</h1>
          <p className="text-[#8a96a8] text-sm mt-1">Detailed overview of all incoming requests</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 bg-[#3f72f5]/10 text-[#3f72f5] text-[13px] font-bold uppercase tracking-wider rounded-lg">
            {orders.filter(o => o.status === 'pending').length} Pending
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <button onClick={() => setCurrentOrderFilter('all')}
          className={`px-4 py-2 text-[13px] font-semibold rounded-lg border border-[#e4e7ee] transition-colors ${currentOrderFilter === 'all' ? 'bg-[#1c2333] text-white' : 'bg-white text-[#8a96a8] hover:bg-[#f5f6f9]'}`}>
          All Orders
        </button>
        <button onClick={() => setCurrentOrderFilter('pending')}
          className={`px-4 py-2 text-[13px] font-semibold rounded-lg border border-[#e4e7ee] transition-colors ${currentOrderFilter === 'pending' ? 'bg-[#f59e0b] text-white' : 'bg-white text-[#8a96a8] hover:bg-[#f5f6f9]'}`}>
          Pending
        </button>
        <button onClick={() => setCurrentOrderFilter('approved')}
          className={`px-4 py-2 text-[13px] font-semibold rounded-lg border border-[#e4e7ee] transition-colors ${currentOrderFilter === 'approved' ? 'bg-[#18a87a] text-white' : 'bg-white text-[#8a96a8] hover:bg-[#f5f6f9]'}`}>
          Approved
        </button>
        <button onClick={() => setCurrentOrderFilter('canceled')}
          className={`px-4 py-2 text-[13px] font-semibold rounded-lg border border-[#e4e7ee] transition-colors ${currentOrderFilter === 'canceled' ? 'bg-[#ef4444] text-white' : 'bg-white text-[#8a96a8] hover:bg-[#f5f6f9]'}`}>
          Canceled
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[#e4e7ee] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e4e7ee] flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#1c2333]">Orders List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f5f6f9] border-b border-[#e4e7ee]">
              <tr>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Order Details</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Customer</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Payment Info</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Courier Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-[#8a96a8] uppercase tracking-wider w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ee]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f5f6f9]/50 transition-colors group">
                  {/* Col 1: Order Details */}
                  <td className="px-4 py-3 align-middle">
                    <span className="font-mono text-sm font-medium text-[#1c2333]">{order.id}</span>
                    <div className="text-[11px] text-[#8a96a8] mt-0.5">{order.time}</div>
                  </td>

                  {/* Col 2: Customer */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1c2333]">{order.customer}</span>
                      <span className="text-[11px] text-[#8a96a8]">{order.phone}</span>
                    </div>
                  </td>

                  {/* Col 3: Payment & Address */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-[#1c2333] uppercase tracking-wide">{order.paymentMethod}</span>
                      <span className="text-[11px] text-[#8a96a8] truncate max-w-[150px]">{order.address}</span>
                    </div>
                  </td>

                  {/* Col 4: Status */}
                  <td className="px-4 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col gap-0.5">
                      {order.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <span onClick={() => updateOrderStatus(order.id, 'approved')} className="text-[#18a87a] font-bold text-[11px] cursor-pointer hover:underline">Approve</span>
                          <span className="text-[#8a96a8] text-[10px]">|</span>
                          <span onClick={() => updateOrderStatus(order.id, 'canceled')} className="text-[#ef4444] font-bold text-[11px] cursor-pointer hover:underline">Reject</span>
                        </div>
                      )}
                      {order.status === 'approved' && (
                        <div className="flex flex-col">
                          <span className="text-[#18a87a] font-bold text-[11px]">Approved</span>
                          <span className="text-[10px] text-[#8a96a8]">by Admin</span>
                        </div>
                      )}
                      {order.status === 'canceled' && (
                        <div className="flex flex-col">
                          <span className="text-[#ef4444] font-bold text-[11px]">Canceled</span>
                          <span className="text-[10px] text-[#8a96a8]">by {order.canceledBy || 'System'}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Col 5: Courier Status */}
                  <td className="px-4 py-3 align-middle text-left">
                    <span className="text-[11px] font-medium text-[#8a96a8]">[{order.courierStatus}]</span>
                  </td>

                  {/* Col 6: Actions */}
                  <td className="px-4 py-3 align-middle text-left">
                    <span onClick={() => setSelectedOrder(order)}
                      className="text-[13px] font-medium text-[#8a96a8] hover:text-[#3f72f5] cursor-pointer transition-colors">
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2333]/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white w-full max-w-[680px] border border-[#e4e7ee] flex flex-col p-6 gap-3 rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#1c2333] uppercase">{selectedOrder.id}</span>
                  <span className="text-[#e4e7ee]">|</span>
                  <span className="text-[12px] text-[#8a96a8]">{selectedOrder.date}</span>
                </div>
                <div className="text-[11px] font-bold text-[#1c2333] uppercase tracking-wide">
                  {selectedOrder.paymentMethod}
                </div>
                <div className="text-[11px] text-[#8a96a8] flex items-center gap-1 max-w-[350px]">
                  <i className="ri-map-pin-line text-[12px] shrink-0"></i>
                  <span className="truncate">{selectedOrder.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => window.open('tel:' + selectedOrder.phone)} title="Call"
                  className="h-[28px] w-[28px] rounded-md flex items-center justify-center text-[#8a96a8] hover:text-[#3f72f5] transition-colors bg-white border border-[#e4e7ee] shadow-sm">
                  <i className="ri-phone-fill text-[16px]"></i>
                </button>
                <button onClick={() => window.open('https://wa.me/' + selectedOrder.phone.replace(/[^0-9]/g, ''))} title="WhatsApp"
                  className="h-[28px] w-[28px] rounded-md flex items-center justify-center text-[#8a96a8] hover:text-[#18a87a] transition-colors bg-white border border-[#e4e7ee] shadow-sm">
                  <i className="ri-whatsapp-line text-[16px]"></i>
                </button>
                <button onClick={() => copyToClipboard(selectedOrder.phone)} title="Copy"
                  className="h-[28px] w-[28px] rounded-md flex items-center justify-center text-[#8a96a8] hover:text-[#1c2333] transition-colors bg-white border border-[#e4e7ee] shadow-sm">
                  <i className="ri-file-copy-line text-[16px]"></i>
                </button>

                <div className="h-[20px] w-[1px] bg-[#e4e7ee] mx-1"></div>

                <button onClick={() => setSelectedOrder(null)} className="w-[30px] h-[30px] rounded-lg bg-white border border-[#e4e7ee] flex items-center justify-center text-[#8a96a8] hover:bg-[#f5f6f9] cursor-pointer transition-colors">
                  <i className="ri-close-line text-[18px]"></i>
                </button>
              </div>
            </div>

            {/* Items Table */}
            <div className="w-full border-collapse bg-[#f5f6f9] rounded-lg overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#e4e7ee]">
                    <th className="py-2 px-3 text-left text-[11px] font-bold uppercase text-[#8a96a8] tracking-wide w-[50%]">Item</th>
                    <th className="py-2 px-3 text-center text-[11px] font-bold uppercase text-[#8a96a8] tracking-wide w-[20%]">Qty</th>
                    <th className="py-2 px-3 text-right text-[11px] font-bold uppercase text-[#8a96a8] tracking-wide w-[30%]">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#e4e7ee] last:border-0">
                      <td className="py-2 px-3 align-middle">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-[#1c2333]">{item.name}</span>
                          {item.variant && <span className="text-[#8a96a8] text-[12px] font-medium">({item.variant})</span>}
                          {item.offerText && <span className="text-[#ef4444] text-[11px] font-bold">[{item.offerText}]</span>}
                          {item.couponCode && <span className="text-[#18a87a] text-[11px] font-bold">[{item.couponCode}]</span>}
                        </div>
                      </td>

                      <td className="py-2 px-3 text-center align-middle font-medium text-[#1c2333]">
                        <div className="flex flex-col items-center">
                          <span>{item.qty} item{item.qty > 1 ? 's' : ''}</span>
                          <span className="text-[11px] font-medium text-[#8a96a8]">TK {item.basePrice}/pc</span>
                        </div>
                      </td>

                      <td className="py-2 px-3 text-right align-middle">
                        <div className="flex flex-col items-end gap-0.5">
                          <div className={`text-[#8a96a8] text-[12px] ${item.offerDiscount > 0 || item.couponDiscount > 0 ? 'line-through decoration-[#ef4444]/30' : ''}`}>
                            TK {item.basePrice * item.qty}
                          </div>

                          {item.offerDiscount > 0 && (
                            <div className="text-[#ef4444] text-[11px] font-medium">
                              -TK {item.offerDiscount * item.qty}
                            </div>
                          )}

                          {item.couponDiscount > 0 && (
                            <div className="text-[#18a87a] text-[11px] font-medium">
                              -TK {item.couponDiscount * item.qty}
                            </div>
                          )}

                          <div className="font-bold text-[#1c2333] text-[13px]">
                            TK {(item.basePrice * item.qty) - (item.offerDiscount * item.qty) - (item.couponDiscount * item.qty)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation */}
            <div className="bg-[#f5f6f9] rounded-lg p-3">
              <div className="flex items-center justify-between text-[12px] w-full flex-wrap gap-2">
                <div className="font-semibold text-[#8a96a8] italic"
                     style={{visibility: selectedOrder.discount === 0 && (!selectedOrder.couponCodes || selectedOrder.couponCodes.length === 0) ? 'visible' : 'hidden'}}>
                  Order Calculation
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[#8a96a8]">Subtotal :</span>
                    <span className="font-bold text-[#1c2333]">TK {selectedOrder.subtotal}</span>
                  </div>

                  <div className="w-[1px] h-3 bg-[#e4e7ee]"></div>

                  {selectedOrder.discount > 0 && (
                    <>
                      <div className="flex items-center gap-1 text-[#ef4444]">
                        <span className="font-medium">Discount :</span>
                        <span className="font-bold">TK {selectedOrder.discount}</span>
                      </div>
                      <div className="w-[1px] h-3 bg-[#e4e7ee]"></div>
                    </>
                  )}

                  {selectedOrder.couponCodes && selectedOrder.couponCodes.length > 0 && (
                    <>
                      <div className="flex items-center gap-1 text-[#18a87a]">
                        <span className="font-medium">Coupon :</span>
                        <span className="font-bold">TK {selectedOrder.couponAmount}</span>
                      </div>
                      <div className="w-[1px] h-3 bg-[#e4e7ee]"></div>
                    </>
                  )}

                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[#8a96a8]">Delivery :</span>
                    <span className="font-bold text-[#1c2333]">{selectedOrder.delivery === 0 ? 'Free' : 'TK ' + selectedOrder.delivery}</span>
                  </div>

                  <div className="w-[1px] h-3 bg-[#e4e7ee] mx-1"></div>

                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#8a96a8] uppercase tracking-wide">Total :</span>
                    <span className="font-extrabold text-[#1c2333]">TK {selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersView
