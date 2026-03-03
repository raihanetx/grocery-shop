'use client'

import React, { useState } from 'react'
import { useAdmin } from '@/components/admin/context/AdminContext'
import type { AbandonedProduct } from '@/types'

const AbandonedView: React.FC = () => {
  const { abandonedCheckouts, expandedAbandoned, setExpandedAbandoned } = useAdmin()

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase()

  const buildEntries = (products: AbandonedProduct[]) => {
    const entries: { name: string; variant: string | null; qty: number }[] = []
    products.forEach(p => p.variants.forEach(v => entries.push({ name: p.name, variant: v.label, qty: v.qty })))
    return entries
  }

  const toggleAbandonedExpand = (id: number) => {
    setExpandedAbandoned(expandedAbandoned === id ? null : id)
  }

  return (
    <div className="p-4 md:p-8" style={{fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', color: '#0f172a', margin: '0', minHeight: 'calc(100vh - 80px)'}}>
      {/* Card */}
      <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
        {/* Card Header */}
        <div style={{padding: '1.1rem 1.4rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a'}}>Abandoned Checkouts</div>
            <div style={{fontSize: '0.76rem', color: '#64748b', marginTop: '2px'}}>Customers who visited but didn't complete checkout</div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.18rem',
            padding: '0.3rem 0.7rem', fontSize: '0.7rem', fontWeight: 600,
            borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.04em',
            background: '#fef3c7', color: '#d97706'
          }}>
            <i className="ri-error-warning-line"></i> {abandonedCheckouts.length} Active
          </span>
        </div>
        
        {/* Table */}
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{width: '25%', textAlign: 'left', padding: '0.75rem 1.2rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>Customer</th>
                <th style={{width: '30%', textAlign: 'left', padding: '0.75rem 1.2rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>Address</th>
                <th style={{width: '25%', textAlign: 'left', padding: '0.75rem 1.2rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>Last Visit</th>
                <th style={{width: '20%', textAlign: 'left', padding: '0.75rem 1.2rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>Visits</th>
              </tr>
            </thead>
            <tbody>
              {abandonedCheckouts.map((ab) => (
                <React.Fragment key={ab.id}>
                  {/* Main Row */}
                  <tr 
                    style={{cursor: 'pointer', transition: 'background 0.15s'}}
                    onClick={() => toggleAbandonedExpand(ab.id)}
                    onMouseEnter={(e) => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#f8fafc')}
                    onMouseLeave={(e) => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'transparent')}>
                    <td style={{padding: '0.9rem 1.2rem', fontSize: '0.85rem', borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                          background: '#d1fae5', border: '1.5px solid #16a34a',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '0.75rem', color: '#16a34a'
                        }}>{getInitials(ab.name)}</div>
                        <div>
                          <div style={{fontWeight: 600, fontSize: '0.875rem', color: '#0f172a'}}>{ab.name}</div>
                          <div style={{fontSize: '0.72rem', color: '#64748b', marginTop: '2px'}}>{ab.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding: '0.9rem 1.2rem', fontSize: '0.83rem', borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle', color: '#475569'}}>{ab.address}</td>
                    <td style={{padding: '0.9rem 1.2rem', fontSize: '0.85rem', borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                      <div style={{fontWeight: 500, fontSize: '0.83rem', color: '#0f172a'}}>{ab.visitTime}</div>
                      <div style={{fontSize: '0.71rem', color: '#64748b', marginTop: '2px'}}>{ab.visitDate}</div>
                    </td>
                    <td style={{padding: '0.9rem 1.2rem', fontSize: '0.85rem', borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                      <div style={{display: 'inline-flex', alignItems: 'center', gap: '1.5rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                          <span style={{fontWeight: 600, fontSize: '0.83rem', color: '#0f172a'}}>{ab.totalVisits}</span>
                          <span style={{fontSize: '0.71rem', color: '#64748b'}}>visits</span>
                          <span style={{width: '1px', height: '10px', background: '#cbd5e1', display: 'inline-block', margin: '0 0.12rem'}}></span>
                          <span style={{fontWeight: 600, fontSize: '0.83rem', color: '#16a34a'}}>{ab.completedOrders}</span>
                          <span style={{fontSize: '0.71rem', color: '#64748b'}}>done</span>
                        </div>
                        <i className="ri-arrow-down-s-line" style={{
                          transition: 'transform 0.25s ease', fontSize: '1.2rem', color: '#64748b',
                          transform: expandedAbandoned === ab.id ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}></i>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expand Row */}
                  {expandedAbandoned === ab.id && (
                    <tr>
                      <td colSpan={4} style={{padding: 0, background: '#ffffff', borderBottom: '1px solid #e2e8f0'}}>
                        <div style={{padding: '1.2rem 1.4rem'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <tbody>
                              {ab.history.map((h, idx) => {
                                const isComp = h.status === 'completed'
                                const priceColor = isComp ? '#16a34a' : '#ef4444'
                                const entries = buildEntries(h.products)
                                const totalItems = entries.reduce((acc, e) => acc + e.qty, 0)
                                
                                return (
                                  <tr key={idx} style={{cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#f8fafc')}>
                                    <td style={{width: '20%', whiteSpace: 'nowrap', padding: '0.95rem 1rem', fontSize: '0.82rem', borderBottom: idx === ab.history.length - 1 ? 'none' : '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                                      <div style={{fontSize: '0.82rem', fontWeight: 600, color: '#0f172a'}}>{h.date}</div>
                                      <div style={{fontSize: '0.7rem', color: '#64748b', marginTop: '3px'}}>{h.time} · {h.timeAgo}</div>
                                    </td>
                                    <td style={{padding: '0.95rem 1rem', fontSize: '0.82rem', borderBottom: idx === ab.history.length - 1 ? 'none' : '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                                      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 0, lineHeight: 1.6}}>
                                        {entries.map((e, i) => {
                                          const isLast = i === entries.length - 1
                                          const variantText = e.variant ? ` (${e.variant})` : ''
                                          return (
                                            <span key={i} style={{display: 'inline-flex', alignItems: 'baseline', gap: 0, fontSize: '0.81rem', color: '#475569'}}>
                                              <span style={{color: '#0f172a', fontWeight: 500}}>{e.name}</span>
                                              {e.variant && <span style={{color: '#64748b', fontSize: '0.75rem'}}>{variantText}</span>}
                                              <span style={{color: '#16a34a', fontWeight: 700, fontSize: '0.75rem', marginLeft: '0.15rem'}}> ×{e.qty}</span>
                                              {!isLast && <span style={{color: '#cbd5e1', margin: '0 0.6rem', fontSize: '0.8rem', opacity: 0.6}}>|</span>}
                                            </span>
                                          )
                                        })}
                                      </div>
                                    </td>
                                    <td style={{width: '15%', textAlign: 'right', padding: '0.95rem 1rem', fontSize: '0.82rem', borderBottom: idx === ab.history.length - 1 ? 'none' : '1px solid #e2e8f0', verticalAlign: 'middle'}}>
                                      <div style={{fontWeight: 700, fontSize: '0.9rem', color: priceColor}}>${h.total.toFixed(2)}</div>
                                      <div style={{fontSize: '0.68rem', color: '#64748b', marginTop: '2px'}}>(Total {totalItems} items)</div>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AbandonedView
