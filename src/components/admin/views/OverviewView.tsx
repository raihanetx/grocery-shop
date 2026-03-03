'use client'

import React from 'react'
import { useAdmin } from '@/components/admin/context/AdminContext'
import type { Order } from '@/types'

interface OverviewViewProps {
  setDashView: (view: string) => void
}

const OverviewView: React.FC<OverviewViewProps> = ({ setDashView }) => {
  const { orders, setOrders } = useAdmin()

  const chartData = [
    { day: 'Mon', height: '40%' }, { day: 'Tue', height: '65%', active: true }, { day: 'Wed', height: '55%' },
    { day: 'Thu', height: '80%' }, { day: 'Fri', height: '70%' }, { day: 'Sat', height: '90%' }, { day: 'Sun', height: '50%' }
  ]

  return (
    <>
      <section className="metrics">
        <div className="metric-card"><div className="metric-label">Revenue</div><div className="metric-value">$42,590</div><div className="metric-change trend-pos">↑ 12.5% <span style={{color: 'var(--admin-text-tertiary)', fontWeight: 400}}>vs last week</span></div></div>
        <div className="metric-card"><div className="metric-label">Orders</div><div className="metric-value">1,284</div><div className="metric-change trend-pos">↑ 4.2% <span style={{color: 'var(--admin-text-tertiary)', fontWeight: 400}}>vs last week</span></div></div>
        <div className="metric-card"><div className="metric-label">Avg. Order</div><div className="metric-value">$33.17</div><div className="metric-change trend-neg">↓ 0.8% <span style={{color: 'var(--admin-text-tertiary)', fontWeight: 400}}>vs last week</span></div></div>
        <div className="metric-card"><div className="metric-label">Waste</div><div className="metric-value">12.4 kg</div><div className="metric-change trend-pos">↓ 2.1% <span style={{color: 'var(--admin-text-tertiary)', fontWeight: 400}}>improvement</span></div></div>
      </section>
      
      {/* Recent Orders - Full Width */}
      <section style={{marginBottom: '24px'}}>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent Orders</div>
            <div style={{fontSize: '12px', color: 'var(--admin-primary)', cursor: 'pointer', fontWeight: 500}} onClick={() => setDashView('orders')}>View All →</div>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', fontSize: '13px'}}>
              <thead style={{background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
                <tr>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Order</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Customer</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Items</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Payment</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Total</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Status</th>
                  <th style={{textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order: Order) => (
                  <tr key={order.id} style={{borderBottom: '1px solid #f1f5f9'}} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      <span style={{fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#0f172a'}}>{order.id}</span>
                      <div style={{fontSize: '11px', color: '#94a3b8', marginTop: '2px'}}>{order.time}</div>
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      <div style={{fontWeight: 500, color: '#0f172a'}}>{order.customer}</div>
                      <div style={{fontSize: '11px', color: '#94a3b8'}}>{order.phone}</div>
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      <div style={{fontSize: '12px', color: '#0f172a'}}>{order.items.length} items</div>
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      <div style={{fontSize: '11px', fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.02em'}}>{order.paymentMethod}</div>
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      <span style={{fontSize: '13px', fontWeight: 600, color: '#16a34a'}}>TK{order.total.toLocaleString()}</span>
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      {order.status === 'pending' && (
                        <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#fef3c7', color: '#d97706'}}>
                          <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#d97706'}}></span>
                          Pending
                        </span>
                      )}
                      {order.status === 'approved' && (
                        <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#d1fae5', color: '#16a34a'}}>
                          <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a'}}></span>
                          Approved
                        </span>
                      )}
                      {order.status === 'canceled' && (
                        <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#fee2e2', color: '#dc2626'}}>
                          <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626'}}></span>
                          Canceled
                        </span>
                      )}
                    </td>
                    <td style={{padding: '12px 16px', verticalAlign: 'middle'}}>
                      {order.status === 'pending' && (
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <span 
                            onClick={() => setOrders(orders.map((o: Order) => o.id === order.id ? {...o, status: 'approved'} : o))} 
                            style={{color: '#16a34a', fontWeight: 700, fontSize: '11px', cursor: 'pointer'}}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                          >Approve</span>
                          <span style={{color: '#cbd5e1', fontSize: '10px'}}>|</span>
                          <span 
                            onClick={() => setOrders(orders.map((o: Order) => o.id === order.id ? {...o, status: 'canceled'} : o))} 
                            style={{color: '#dc2626', fontWeight: 700, fontSize: '11px', cursor: 'pointer'}}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                          >Reject</span>
                        </div>
                      )}
                      {order.status === 'approved' && (
                        <div>
                          <div style={{color: '#16a34a', fontWeight: 700, fontSize: '11px'}}>Approved</div>
                          <div style={{fontSize: '10px', color: '#94a3b8'}}>by Admin</div>
                        </div>
                      )}
                      {order.status === 'canceled' && (
                        <div>
                          <div style={{color: '#dc2626', fontWeight: 700, fontSize: '11px'}}>Canceled</div>
                          <div style={{fontSize: '10px', color: '#94a3b8'}}>by Admin</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Product Stats Sections */}
      <section style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px'}}>
        {/* Most Selling Products */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <i className="ri-fire-line" style={{color: '#ef4444'}}></i>
              Most Selling
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            {[
              { name: 'Fresh Carrots', category: 'Vegetables', amount: '234', img: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png' },
              { name: 'Red Apples', category: 'Fruits', amount: '189', img: 'https://i.postimg.cc/x1wL9jTV/IMG-20260228-163137.png' },
              { name: 'Fresh Bananas', category: 'Fruits', amount: '156', img: 'https://i.postimg.cc/bw71qYYK/IMG-20260228-163147.png' },
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', transition: 'background 0.15s'}} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <img src={item.img} alt={item.name} style={{width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', background: '#f8fafc'}} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: '#0f172a'}}>{item.name}</div>
                  <div style={{fontSize: '10px', color: '#94a3b8'}}>{item.category}</div>
                </div>
                <span style={{fontSize: '13px', fontWeight: 700, color: '#ef4444'}}>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Most Visited Products */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <i className="ri-eye-line" style={{color: '#16a34a'}}></i>
              Most Visited
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            {[
              { name: 'Premium Potatoes', category: 'Vegetables', amount: '1,245', img: 'https://i.postimg.cc/d1vdTWyL/1000020583-removebg-preview.png' },
              { name: 'Sweet Oranges', category: 'Fruits', amount: '1,089', img: 'https://i.postimg.cc/mr7Ckxtx/IMG-20260228-163156.png' },
              { name: 'Mango Fresh', category: 'Fruits', amount: '956', img: 'https://i.postimg.cc/Z5G6JYKm/IMG-20260228-163217.png' },
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', transition: 'background 0.15s'}} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <img src={item.img} alt={item.name} style={{width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', background: '#f8fafc'}} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: '#0f172a'}}>{item.name}</div>
                  <div style={{fontSize: '10px', color: '#94a3b8'}}>{item.category}</div>
                </div>
                <span style={{fontSize: '13px', fontWeight: 700, color: '#16a34a'}}>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Most Added to Cart */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <i className="ri-shopping-cart-2-line" style={{color: '#f59e0b'}}></i>
              Most in Cart
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            {[
              { name: 'Fresh Tomatoes', category: 'Vegetables', amount: '89', img: 'https://i.postimg.cc/mr7CkxtQ/1000020584-removebg-preview.png' },
              { name: 'Grapes Green', category: 'Fruits', amount: '76', img: 'https://i.postimg.cc/htkVK4PD/IMG-20260228-163208.png' },
              { name: 'Fresh Broccoli', category: 'Vegetables', amount: '64', img: 'https://i.postimg.cc/qR0nCm36/1000020611-removebg-preview.png' },
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', transition: 'background 0.15s'}} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <img src={item.img} alt={item.name} style={{width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', background: '#f8fafc'}} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: '#0f172a'}}>{item.name}</div>
                  <div style={{fontSize: '10px', color: '#94a3b8'}}>{item.category}</div>
                </div>
                <span style={{fontSize: '13px', fontWeight: 700, color: '#f59e0b'}}>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Store Insights Dashboard */}
      <section style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px'}}>
        {/* Sales Performance Chart */}
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Sales Performance (7 Days)</div></div>
          <div className="chart-area">
            {chartData.map((bar, i) => (
              <div key={i} className="bar-group">
                <div className={`bar ${bar.active ? 'active' : ''}`} style={{height: bar.height}}></div>
                <span className="bar-label">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Revenue Breakdown */}
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Revenue by Category</div></div>
          <div style={{padding: '16px'}}>
            {/* Donut Chart */}
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
              <div style={{width: '140px', height: '140px', position: 'relative'}}>
                <svg viewBox="0 0 36 36" style={{width: '100%', height: '100%', transform: 'rotate(-90deg)'}}>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="35 65" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-35" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-60" strokeLinecap="round"></circle>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-80" strokeLinecap="round"></circle>
                </svg>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                  <div style={{fontSize: '18px', fontWeight: 700, color: '#0f172a'}}>₹1.2L</div>
                  <div style={{fontSize: '10px', color: '#94a3b8'}}>Total</div>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {[
                { name: 'Vegetables', percent: '35%', amount: '₹42,000', color: '#16a34a' },
                { name: 'Fruits', percent: '25%', amount: '₹30,000', color: '#f59e0b' },
                { name: 'Dairy', percent: '20%', amount: '₹24,000', color: '#ef4444' },
                { name: 'Others', percent: '20%', amount: '₹24,000', color: '#16a34a' },
              ].map((item, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{width: '10px', height: '10px', borderRadius: '2px', background: item.color}}></div>
                  <div style={{flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: '12px', color: '#475569'}}>{item.name}</span>
                    <span style={{fontSize: '11px', fontWeight: 600, color: '#0f172a'}}>{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Metrics Cards */}
      <section style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px'}}>
        {[
          { label: 'Total Orders Today', value: '48', change: '+12%', positive: true, icon: 'ri-shopping-bag-line', color: '#16a34a' },
          { label: 'Avg. Order Value', value: '₹856', change: '+8%', positive: true, icon: 'ri-money-dollar-circle-line', color: '#f59e0b' },
          { label: 'New Customers', value: '23', change: '+5%', positive: true, icon: 'ri-user-add-line', color: '#16a34a' },
          { label: 'Pending Orders', value: '7', change: '-15%', positive: true, icon: 'ri-time-line', color: '#ef4444' },
        ].map((metric, i) => (
          <div key={i} className="panel" style={{padding: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '10px', background: `${metric.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <i className={metric.icon} style={{fontSize: '20px', color: metric.color}}></i>
              </div>
              <span style={{fontSize: '11px', fontWeight: 600, color: metric.positive ? '#10b981' : '#ef4444', background: metric.positive ? '#d1fae5' : '#fee2e2', padding: '2px 8px', borderRadius: '12px'}}>{metric.change}</span>
            </div>
            <div style={{fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px'}}>{metric.value}</div>
            <div style={{fontSize: '12px', color: '#94a3b8'}}>{metric.label}</div>
          </div>
        ))}
      </section>
    </>
  )
}

export default OverviewView
