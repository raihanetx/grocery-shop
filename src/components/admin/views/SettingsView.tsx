'use client'

import React, { useState } from 'react'
import { useAdmin } from '@/components/admin/context/AdminContext'

const SettingsView: React.FC = () => {
  const { settings, setSettings, showToastMsg } = useAdmin()
  
  const [universalDelivery, setUniversalDelivery] = useState(false)
  const [universalDeliveryCharge, setUniversalDeliveryCharge] = useState(60)

  const handleSaveSettings = () => {
    showToastMsg('Settings saved successfully!')
  }

  return (
    <div className="p-4 md:p-8" style={{fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', color: '#0f172a', margin: '0', minHeight: 'calc(100vh - 80px)'}}>
      {/* Page content */}
      <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem'}}>
          {/* Left Column: Branding & Links */}
          <div>
            {/* Branding Card */}
            <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <i className="ri-medal-line"></i> Store Branding
              </h3>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Website Name</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-global-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="e.g. GroceryHub" value={settings.websiteName}
                    onChange={(e) => setSettings({...settings, websiteName: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}} 
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Slogan</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-chat-quote-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="e.g. Freshness at your door" value={settings.slogan}
                    onChange={(e) => setSettings({...settings, slogan: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <div style={{marginBottom: '0'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Favicon URL</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-image-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="https://link-to-favicon.ico" value={settings.faviconUrl}
                    onChange={(e) => setSettings({...settings, faviconUrl: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
            </div>

            {/* Delivery Card */}
            <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <i className="ri-truck-line"></i> Delivery Settings
              </h3>
              
              {/* Universal Delivery Toggle */}
              <div style={{background: '#f8fafc', borderRadius: '8px', padding: '12px 16px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0'}}>
                <div>
                  <span style={{fontSize: '0.85rem', fontWeight: 500, color: '#0f172a'}}>Universal Delivery</span>
                  <p style={{fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0'}}>Same charge for all locations</p>
                </div>
                <div 
                  onClick={() => setUniversalDelivery(!universalDelivery)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: universalDelivery ? '#16a34a' : '#e2e8f0',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: universalDelivery ? '22px' : '2px',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}></div>
                </div>
              </div>
              
              {universalDelivery ? (
                /* Universal Charge Input */
                <div style={{marginBottom: '1rem'}}>
                  <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Delivery Charge (TK) - All Locations</label>
                  <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <i className="ri-global-line" style={{position: 'absolute', left: '12px', color: '#16a34a', fontSize: '1rem'}}></i>
                    <input type="number" value={universalDeliveryCharge}
                      onChange={(e) => setUniversalDeliveryCharge(parseInt(e.target.value) || 0)}
                      style={{width: '100%', background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#16a34a'} />
                  </div>
                </div>
              ) : (
                /* Inside/Outside Dhaka Inputs */
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Inside Dhaka (TK)</label>
                    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                      <i className="ri-map-pin-user-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                      <input type="number" value={settings.insideDhakaDelivery}
                        onChange={(e) => setSettings({...settings, insideDhakaDelivery: parseInt(e.target.value) || 0})}
                        style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                        onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Outside Dhaka (TK)</label>
                    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                      <i className="ri-map-pin-2-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                      <input type="number" value={settings.outsideDhakaDelivery}
                        onChange={(e) => setSettings({...settings, outsideDhakaDelivery: parseInt(e.target.value) || 0})}
                        style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                        onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{marginBottom: '0'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Free Delivery Minimum Amount (TK)</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-gift-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="number" placeholder="e.g. 1000" value={settings.freeDeliveryMin}
                    onChange={(e) => setSettings({...settings, freeDeliveryMin: parseInt(e.target.value) || 0})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <i className="ri-links-line"></i> Social & Contact
              </h3>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>WhatsApp Number</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-whatsapp-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="+8801xxxxxxxxx" value={settings.whatsappNumber}
                    onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Phone Number</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-phone-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="+8801xxxxxxxxx" value={settings.phoneNumber}
                    onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Facebook Page URL</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-facebook-circle-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="https://facebook.com/yourpage" value={settings.facebookUrl}
                    onChange={(e) => setSettings({...settings, facebookUrl: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <div style={{marginBottom: '0'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Messenger Username</label>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                  <i className="ri-messenger-line" style={{position: 'absolute', left: '12px', color: '#64748b', fontSize: '1rem'}}></i>
                  <input type="text" placeholder="e.g. groceryhub.bd" value={settings.messengerUsername}
                    onChange={(e) => setSettings({...settings, messengerUsername: e.target.value})}
                    style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem 0.6rem 2.5rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none'}}
                    onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Pages */}
          <div>
            <div style={{background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
              <h3 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <i className="ri-file-text-line"></i> Page Content (About & Policy)
              </h3>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>About Us</label>
                <textarea placeholder="Write about your company..." value={settings.aboutUs}
                  onChange={(e) => setSettings({...settings, aboutUs: e.target.value})}
                  style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none', minHeight: '120px', resize: 'vertical'}}
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}></textarea>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Terms & Conditions</label>
                <textarea placeholder="Company terms and rules..." value={settings.termsConditions}
                  onChange={(e) => setSettings({...settings, termsConditions: e.target.value})}
                  style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none', minHeight: '120px', resize: 'vertical'}}
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}></textarea>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Refund Policy</label>
                <textarea placeholder="Refund and return rules..." value={settings.refundPolicy}
                  onChange={(e) => setSettings({...settings, refundPolicy: e.target.value})}
                  style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none', minHeight: '120px', resize: 'vertical'}}
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}></textarea>
              </div>

              <div style={{marginBottom: '0'}}>
                <label style={{display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 500}}>Privacy Policy</label>
                <textarea placeholder="How you handle customer data..." value={settings.privacyPolicy}
                  onChange={(e) => setSettings({...settings, privacyPolicy: e.target.value})}
                  style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#0f172a', fontSize: '0.9rem', transition: 'border-color 0.2s', outline: 'none', minHeight: '120px', resize: 'vertical'}}
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}></textarea>
              </div>
            </div>

            {/* Save Button */}
            <button onClick={handleSaveSettings}
              style={{background: '#16a34a', color: '#ffffff', fontWeight: 700, padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContentContent: 'center', gap: '0.5rem', transition: 'transform 0.2s, opacity 0.2s', border: 'none', width: '100%', fontSize: '0.95rem'}}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <i className="ri-save-line"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsView
