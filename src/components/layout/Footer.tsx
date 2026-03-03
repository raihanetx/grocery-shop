'use client'

import { settings } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer" style={{
      position: 'relative',
      background: '#f0fdf4',
      borderTop: '1px solid #bbf7d0'
    }}>
      <div className="footer-container" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '2rem 1rem 5rem'
      }}>
        {/* Mobile Layout */}
        <div className="footer-mobile" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.25rem'
        }}>
          <a href="/" className="footer-logo" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <h2 className="footer-logo-text" style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111827',
              fontFamily: 'Inter, sans-serif'
            }}>
              Krishi<span style={{ color: '#16a34a' }}>Bitan</span>
            </h2>
          </a>
          
          <p className="footer-slogan" style={{
            fontSize: '0.8125rem',
            color: '#4b5563',
            maxWidth: '18rem',
            lineHeight: 1.5
          }}>
            {settings.slogan || 'Your trusted marketplace for fresh organic products and groceries.'}
          </p>
          
          <div className="footer-links" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8125rem'
          }}>
            <a href="#" className="footer-link" style={{ color: '#4b5563', textDecoration: 'none' }}>About Us</a>
            <span style={{ color: '#86efac' }}>•</span>
            <a href="#" className="footer-link" style={{ color: '#4b5563', textDecoration: 'none' }}>Terms & Conditions</a>
            <span style={{ color: '#86efac' }}>•</span>
            <a href="#" className="footer-link" style={{ color: '#4b5563', textDecoration: 'none' }}>Refund Policy</a>
            <span style={{ color: '#86efac' }}>•</span>
            <a href="#" className="footer-link" style={{ color: '#4b5563', textDecoration: 'none' }}>Return Policy</a>
          </div>
          
          <div className="footer-social" style={{ display: 'flex', gap: '0.625rem' }}>
            <a href="#" aria-label="Facebook" style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '8px',
              border: '1px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: '#ffffff'
            }}>
              <i className="ri-facebook-fill" style={{ fontSize: '1rem' }}></i>
            </a>
            <a href="#" aria-label="Messenger" style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '8px',
              border: '1px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: '#ffffff'
            }}>
              <i className="ri-messenger-fill" style={{ fontSize: '1rem' }}></i>
            </a>
            <a href="#" aria-label="WhatsApp" style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '8px',
              border: '1px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: '#ffffff'
            }}>
              <i className="ri-whatsapp-fill" style={{ fontSize: '1rem' }}></i>
            </a>
            <a href="#" aria-label="Phone" style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '8px',
              border: '1px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: '#ffffff'
            }}>
              <i className="ri-phone-fill" style={{ fontSize: '1rem' }}></i>
            </a>
          </div>
          
          <p className="footer-copyright" style={{
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            © {currentYear} Krishi Bitan
          </p>
        </div>
        
        {/* Desktop Layout */}
        <div className="footer-desktop" style={{ display: 'none' }}>
          <div className="footer-main" style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid #bbf7d0'
          }}>
            <div className="footer-brand" style={{ maxWidth: '16rem' }}>
              <a href="/" style={{ display: 'inline-block', marginBottom: '0.75rem', textDecoration: 'none' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Krishi<span style={{ color: '#16a34a' }}>Bitan</span>
                </h2>
              </a>
              <p style={{
                fontSize: '0.8125rem',
                color: '#4b5563',
                lineHeight: 1.6
              }}>
                {settings.slogan || 'Your trusted marketplace for fresh organic products and groceries.'}
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '4rem'
            }}>
              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#16a34a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.875rem'
                }}>Shop</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>All Products</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Fruits & Vegetables</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Dairy & Eggs</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Meat & Seafood</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#16a34a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.875rem'
                }}>Company</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>About Us</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Contact</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#16a34a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.875rem'
                }}>Policies</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Terms & Conditions</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Refund Policy</a></li>
                  <li><a href="#" style={{ fontSize: '0.8125rem', color: '#4b5563', textDecoration: 'none' }}>Return Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#16a34a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.875rem'
                }}>Connect</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href="#" aria-label="Facebook" style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: '#ffffff'
                  }}>
                    <i className="ri-facebook-fill" style={{ fontSize: '0.875rem' }}></i>
                  </a>
                  <a href="#" aria-label="Messenger" style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: '#ffffff'
                  }}>
                    <i className="ri-messenger-fill" style={{ fontSize: '0.875rem' }}></i>
                  </a>
                  <a href="#" aria-label="WhatsApp" style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: '#ffffff'
                  }}>
                    <i className="ri-whatsapp-fill" style={{ fontSize: '0.875rem' }}></i>
                  </a>
                  <a href="#" aria-label="Phone" style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '6px',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: '#ffffff'
                  }}>
                    <i className="ri-phone-fill" style={{ fontSize: '0.875rem' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              © {currentYear} Krishi Bitan. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem'
            }}>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>About Us</a>
              <span style={{ color: '#86efac' }}>•</span>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms</a>
              <span style={{ color: '#86efac' }}>•</span>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Refund</a>
              <span style={{ color: '#86efac' }}>•</span>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Return</a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (min-width: 1024px) {
          .footer-container {
            padding: 3rem 3.5rem 3rem !important;
          }
          .footer-mobile {
            display: none !important;
          }
          .footer-desktop {
            display: block !important;
          }
        }
        
        .footer-link:hover,
        .footer-desktop ul a:hover,
        .footer-desktop > div:last-child a:hover {
          color: #16a34a !important;
        }
        
        .footer-social a:hover {
          background: #16a34a !important;
          color: white !important;
          border-color: #16a34a !important;
        }
      `}</style>
    </footer>
  )
}
