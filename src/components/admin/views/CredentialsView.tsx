'use client'

import React from 'react'
import { useAdmin } from '@/components/admin/context/AdminContext'

const CredentialsView: React.FC = () => {
  const { credentials, setCredentials, showToastMsg } = useAdmin()

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.newPassword && credentials.newPassword !== credentials.confirmPassword) {
      showToastMsg('Passwords do not match!')
      return
    }
    setCredentials({...credentials, currentPassword: '', newPassword: '', confirmPassword: ''})
    showToastMsg('Account settings saved successfully!')
  }

  const handleSaveApi = (e: React.FormEvent) => {
    e.preventDefault()
    showToastMsg('API configurations saved successfully!')
  }

  return (
    <div className="p-4 md:p-8" style={{fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', color: '#0f172a', margin: '0', minHeight: 'calc(100vh - 80px)'}}>
      {/* Main Content */}
      <div style={{width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
        {/* Page Header */}
        <div style={{marginBottom: '32px'}}>
          <h1 style={{fontSize: '28px', fontWeight: 600, marginBottom: '8px'}}>Settings</h1>
          <p style={{color: '#64748b', fontSize: '15px'}}>Manage your account credentials and system integrations.</p>
        </div>

        {/* Account Security Card */}
        <div style={{backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
          <div style={{marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
            <h2 style={{fontSize: '18px', fontWeight: 600, color: '#0f172a'}}>Account Security</h2>
            <p style={{fontSize: '14px', color: '#64748b', marginTop: '4px'}}>Update your admin username and password here.</p>
          </div>

          <form onSubmit={handleSaveAccount}>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>Admin Username</label>
              <input type="text" placeholder="e.g. admin_john" value={credentials.username} required
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>Current Password</label>
              <input type="password" placeholder="Enter current password" value={credentials.currentPassword} required
                onChange={(e) => setCredentials({...credentials, currentPassword: e.target.value})}
                style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>New Password</label>
                <input type="password" placeholder="Enter new password" value={credentials.newPassword}
                  onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})}
                  style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                  onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" value={credentials.confirmPassword}
                  onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                  style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                  onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '12px'}}>
              <button type="submit"
                style={{backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'background-color 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}>
                Save Account Changes
              </button>
            </div>
          </form>
        </div>

        {/* Courier API Integration Card */}
        <div style={{backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', marginBottom: '0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
          <div style={{marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
            <h2 style={{fontSize: '18px', fontWeight: 600, color: '#0f172a'}}>Courier Service API</h2>
            <p style={{fontSize: '14px', color: '#64748b', marginTop: '4px'}}>Configure your logistics provider keys and webhook URL.</p>
          </div>

          <form onSubmit={handleSaveApi}>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>API Key</label>
              <input type="text" placeholder="pk_live_xxxxxxxxxxxxxxxxxxxx" value={credentials.apiKey} required
                onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>Secret Key</label>
              <input type="password" placeholder="sk_live_xxxxxxxxxxxxxxxxxxxx" value={credentials.secretKey} required
                onChange={(e) => setCredentials({...credentials, secretKey: e.target.value})}
                style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '8px'}}>Webhook Endpoint URL</label>
              <input type="url" placeholder="https://yourdomain.com/api/webhooks/courier" value={credentials.webhookUrl} required
                onChange={(e) => setCredentials({...credentials, webhookUrl: e.target.value})}
                style={{width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#0f172a', backgroundColor: '#f8fafc', transition: 'all 0.2s', outline: 'none'}}
                onFocus={(e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 4px rgba(15, 118, 110, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '12px'}}>
              <button type="submit"
                style={{backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'background-color 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}>
                Save API Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CredentialsView
