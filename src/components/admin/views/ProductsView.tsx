'use client'

import React from 'react'
import type { Product } from '@/types'
import { useAdmin } from '@/components/admin/context/AdminContext'

export default function ProductsView() {
  const {
    products,
    setProducts,
    editingProduct,
    setEditingProduct,
    prodVarieties,
    setProdVarieties,
    prodFaqs,
    setProdFaqs,
    prodImages,
    setProdImages,
    prodRelated,
    setProdRelated,
    allRelatedOptions,
    showToastMsg,
    categories,
  } = useAdmin()

  // Product Functions
  const openProductEdit = (prod: Product | null = null) => {
    if (prod) {
      // Edit existing product - keep the actual id
      setEditingProduct({ ...prod, shortDesc: prod.shortDesc || '', longDesc: prod.longDesc || '', offerSwitch: prod.offer })
      
      // Load variants from product data (API returns as variants or variantsData)
      const variantsData = (prod as any).variantsData || (prod as any).variants
      if (variantsData) {
        if (typeof variantsData === 'string') {
          try {
            const parsed = JSON.parse(variantsData)
            setProdVarieties(parsed)
          } catch {
            setProdVarieties([])
          }
        } else if (Array.isArray(variantsData)) {
          setProdVarieties(variantsData)
        } else {
          setProdVarieties([])
        }
      } else {
        setProdVarieties([])
      }
      
      // Load FAQs
      const faqsData = (prod as any).faqs
      if (faqsData) {
        if (typeof faqsData === 'string') {
          try {
            const parsed = JSON.parse(faqsData)
            setProdFaqs(parsed)
          } catch {
            setProdFaqs([])
          }
        } else if (Array.isArray(faqsData)) {
          setProdFaqs(faqsData)
        } else {
          setProdFaqs([])
        }
      } else {
        setProdFaqs([])
      }
      
      // Load images
      const imagesData = (prod as any).images
      if (imagesData) {
        if (typeof imagesData === 'string') {
          try {
            const parsed = JSON.parse(imagesData)
            setProdImages(parsed)
          } catch {
            setProdImages([prod.image].filter(Boolean))
          }
        } else if (Array.isArray(imagesData)) {
          setProdImages(imagesData)
        } else {
          setProdImages([prod.image].filter(Boolean))
        }
      } else {
        setProdImages([prod.image].filter(Boolean))
      }
      
      // Load related products
      const relatedData = (prod as any).relatedProducts
      if (relatedData) {
        if (typeof relatedData === 'string') {
          try {
            const parsed = JSON.parse(relatedData)
            setProdRelated(parsed)
          } catch {
            setProdRelated([])
          }
        } else if (Array.isArray(relatedData)) {
          setProdRelated(relatedData)
        } else {
          setProdRelated([])
        }
      } else {
        setProdRelated([])
      }
    } else {
      // Add new product
      setEditingProduct({
        id: Date.now(), name: '', category: '', image: 'https://via.placeholder.com/80', variants: '0 variants', price: '$0.00', discount: '0%', offer: false, status: 'active', shortDesc: '', longDesc: '', offerSwitch: false
      })
      setProdVarieties([])
      setProdFaqs([])
      setProdImages([])
      setProdRelated([])
    }
  }

  const handleSaveProduct = async () => {
    if (!editingProduct?.name) { showToastMsg('Please enter product name'); return }
    if (!editingProduct?.category) { showToastMsg('Please select a category'); return }
    
    // Get price from first variant
    const firstVariant = prodVarieties[0]
    const price = firstVariant?.price ? parseFloat(firstVariant.price) : 0
    const discount = firstVariant?.discount ? `${firstVariant.discount}%` : '0%'
    
    // Get image from uploaded images or default
    const image = prodImages[0] || 'https://via.placeholder.com/80'
    
    const productData = {
      name: editingProduct.name,
      category: editingProduct.category,
      image,
      images: prodImages, // Save all uploaded images
      price,
      oldPrice: price,
      discount,
      offer: editingProduct.offerSwitch || false,
      status: editingProduct.status || 'active',
      shortDesc: editingProduct.shortDesc || '',
      longDesc: editingProduct.longDesc || '',
      variants: prodVarieties, // Save all variants
      faqs: prodFaqs, // Save all FAQs
      relatedProducts: prodRelated, // Save related product IDs
    }
    
    try {
      // Check if editing existing product (id is a real number, not from Date.now())
      const isEditing = editingProduct.id && editingProduct.id < 9000000000000
      
      const response = await fetch(`/api/products${isEditing ? '?id=' + editingProduct.id : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      const result = await response.json()
      
      if (result.success) {
        if (isEditing) {
          // Update existing product in state
          const updatedProducts = products.map(p => 
            p.id === editingProduct.id 
              ? { ...p, ...productData, id: editingProduct.id }
              : p
          )
          setProducts(updatedProducts)
          showToastMsg('Product Updated Successfully!')
        } else {
          // Add new product
          const newProduct = {
            ...editingProduct,
            id: result.data.id,
            ...productData,
            offer: editingProduct.offerSwitch || false
          }
          setProducts([...products, newProduct])
          showToastMsg('Product Added Successfully!')
        }
        setEditingProduct(null)
      } else {
        showToastMsg('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      showToastMsg('Error saving product')
    }
  }

  const toggleProdStatus = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p))
  }

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      setProducts(products.filter(p => p.id !== id))
      showToastMsg('Product deleted')
    } catch (error) {
      console.error('Error deleting product:', error)
      showToastMsg('Failed to delete product')
    }
  }

  const addVariety = () => setProdVarieties(prev => [...prev, { id: Date.now(), name: '', price: '', stock: '', discount: '' }])
  const addFaq = () => setProdFaqs(prev => [...prev, { id: Date.now(), question: '', answer: '' }])
  const removeVariety = (id: number) => setProdVarieties(prev => prev.filter(v => v.id !== id))
  const removeFaq = (id: number) => setProdFaqs(prev => prev.filter(f => f.id !== id))
  const updateVariety = (id: number, field: 'name' | 'price' | 'stock' | 'discount', value: string) => {
    setProdVarieties(prev => prev.map(v => v.id === id ? {...v, [field]: value} : v))
  }
  const updateFaq = (id: number, field: 'question' | 'answer', value: string) => {
    setProdFaqs(prev => prev.map(f => f.id === id ? {...f, [field]: value} : f))
  }
  const toggleRelated = (id: number) => {
    if (prodRelated.includes(id)) setProdRelated(prodRelated.filter(i => i !== id))
    else if (prodRelated.length < 4) setProdRelated([...prodRelated, id])
  }

  return (
    <div className="prod-mgmt-wrapper">
      {editingProduct ? (
        <div className="prod-edit-wrapper">
          <div className="max-w-3xl mx-auto" style={{padding: '0 16px'}}>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct(); }}>
              <div className="ep-card">
                <h2 style={{fontSize: '16px', fontWeight: 600, marginBottom: '20px'}}>Basic Information</h2>
                <div style={{marginBottom: '18px'}}>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px'}}>Product Name</label>
                  <input type="text" className="form-input" placeholder="e.g., Organic Red Apples" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                <div style={{marginBottom: '18px'}}>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px'}}>Category</label>
                  <select className="form-input" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{background: '#f9fafb', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div><label style={{fontSize: '13px', fontWeight: 500, display: 'block'}}>Offer Product</label><p style={{fontSize: '12px', color: '#64748b'}}>Toggle if this product is currently on sale</p></div>
                  <div className={`switch-lg ${editingProduct.offerSwitch ? 'active' : ''}`} onClick={() => setEditingProduct({...editingProduct, offerSwitch: !editingProduct.offerSwitch})}></div>
                </div>
              </div>

              <div className="ep-card">
                <h2 style={{fontSize: '16px', fontWeight: 600, marginBottom: '20px'}}>Descriptions</h2>
                <div style={{marginBottom: '18px'}}>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px'}}>Short Description</label>
                  <input type="text" className="form-input" placeholder="Fresh and organic" value={editingProduct.shortDesc || ''} onChange={(e) => setEditingProduct({...editingProduct, shortDesc: e.target.value})} />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px'}}>Long Description</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the product..." value={editingProduct.longDesc || ''} onChange={(e) => setEditingProduct({...editingProduct, longDesc: e.target.value})}></textarea>
                </div>
              </div>

              <div className="ep-card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                  <h2 style={{fontSize: '16px', fontWeight: 600}}>Product Images</h2>
                  <span style={{fontSize: '12px', color: prodImages.length >= 5 ? '#ef4444' : '#16a34a', fontWeight: 500}}>{prodImages.length}/5 images</span>
                </div>
                
                {/* Hidden file input with multiple support */}
                <input 
                  type="file" 
                  id="prodImgUp" 
                  style={{display: 'none'}} 
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files
                    if (!files || files.length === 0) return
                    
                    const remainingSlots = 5 - prodImages.length
                    const filesToProcess = Math.min(files.length, remainingSlots)
                    
                    for (let i = 0; i < filesToProcess; i++) {
                      const file = files[i]
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const result = reader.result as string
                        setProdImages(prev => {
                          if (prev.length < 5) {
                            return [...prev, result]
                          }
                          return prev
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                    
                    if (files.length > remainingSlots) {
                      showToastMsg(`Only ${remainingSlots} image(s) added. Maximum 5 allowed.`)
                    }
                    
                    // Reset input
                    e.target.value = ''
                  }}
                />
                
                <div 
                  className="upload-zone-prod" 
                  style={{
                    cursor: prodImages.length >= 5 ? 'not-allowed' : 'pointer',
                    opacity: prodImages.length >= 5 ? 0.5 : 1,
                    border: prodImages.length >= 5 ? '2px dashed #d1d5db' : '2px dashed #16a34a',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    background: prodImages.length >= 5 ? '#f8fafc' : '#f0fdf4'
                  }}
                  onClick={() => {
                    if (prodImages.length < 5) {
                      document.getElementById('prodImgUp')?.click()
                    } else {
                      showToastMsg('Maximum 5 images allowed!')
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (prodImages.length >= 5) return
                    
                    const files = e.dataTransfer.files
                    const remainingSlots = 5 - prodImages.length
                    const filesToProcess = Math.min(files.length, remainingSlots)
                    
                    for (let i = 0; i < filesToProcess; i++) {
                      if (files[i].type.startsWith('image/')) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          const result = reader.result as string
                          setProdImages(prev => {
                            if (prev.length < 5) {
                              return [...prev, result]
                            }
                            return prev
                          })
                        }
                        reader.readAsDataURL(files[i])
                      }
                    }
                  }}
                >
                  <i className="ri-image-add-line" style={{fontSize: '32px', color: prodImages.length >= 5 ? '#9ca3af' : '#16a34a', marginBottom: '8px', display: 'block'}}></i>
                  <p style={{color: prodImages.length >= 5 ? '#64748b' : '#16a34a', fontSize: '13px', margin: 0, fontWeight: 500}}>
                    {prodImages.length >= 5 ? 'Maximum limit reached (5 images)' : 'Click or drag to upload images'}
                  </p>
                  <p style={{color: '#9ca3af', fontSize: '11px', margin: '4px 0 0 0'}}>
                    PNG, JPG, WEBP up to 5MB • Select multiple
                  </p>
                </div>
                
                {prodImages.length > 0 && (
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '16px'}}>
                    {prodImages.map((img, i) => (
                      <div key={i} style={{position: 'relative', aspectRatio: '1/1'}}>
                        <img 
                          src={img} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '2px solid #16a34a'
                          }} 
                          alt={`Product image ${i+1}`} 
                        />
                        <button
                          type="button"
                          onClick={() => setProdImages(prodImages.filter((_, idx) => idx !== i))}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#ef4444',
                            color: 'white',
                            border: '2px solid white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                        <div style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          background: '#16a34a',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 500
                        }}>
                          {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="ep-card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                  <div><h2 style={{fontSize: '16px', fontWeight: 600}}>Varieties & Pricing</h2><p style={{fontSize: '12px', color: '#64748b'}}>Add different sizes or options</p></div>
                  <button type="button" onClick={addVariety} style={{color: '#16a34a', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer'}}>+ Add Variety</button>
                </div>
                {prodVarieties.length === 0 && <div style={{textAlign: 'center', padding: '24px', color: '#64748b', border: '1px dashed #e2e8e0', borderRadius: '8px'}}>No varieties added. Click "+ Add Variety" to add product variants.</div>}
                {prodVarieties.map(v => (
                  <div key={v.id} style={{background: '#f9fafb', borderRadius: '8px', padding: '16px', marginBottom: '12px', border: '1px solid #e2e8e0'}}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'center'}}>
                      {/* Variety Name */}
                      <div>
                        <label style={{display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 500}}>Variety Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g., 250g, 1KG" 
                          value={v.name}
                          onChange={(e) => updateVariety(v.id, 'name', e.target.value)}
                          style={{fontSize: '13px'}}
                        />
                      </div>
                      {/* Variety Price */}
                      <div>
                        <label style={{display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 500}}>Price (TK)</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="e.g., 150" 
                          value={v.price}
                          onChange={(e) => updateVariety(v.id, 'price', e.target.value)}
                          style={{fontSize: '13px'}}
                        />
                      </div>
                      {/* Variety Stock */}
                      <div>
                        <label style={{display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 500}}>Stock</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="e.g., 50" 
                          value={v.stock}
                          onChange={(e) => updateVariety(v.id, 'stock', e.target.value)}
                          style={{fontSize: '13px'}}
                        />
                      </div>
                      {/* Discount */}
                      <div>
                        <label style={{display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 500}}>Discount</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g., 10 or 10%" 
                          value={v.discount}
                          onChange={(e) => updateVariety(v.id, 'discount', e.target.value)}
                          style={{fontSize: '13px'}}
                        />
                      </div>
                      {/* Remove Button */}
                      <div>
                        <label style={{display: 'block', fontSize: '11px', color: 'transparent', marginBottom: '4px'}}>.</label>
                        <button 
                          type="button"
                          onClick={() => removeVariety(v.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '10px 12px',
                            height: '38px',
                            background: 'white',
                            border: '1px solid #ef4444',
                            borderRadius: '8px',
                            color: '#ef4444',
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#ef4444'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#ef4444'; }}
                        >
                          <i className="ri-delete-bin-line" style={{fontSize: '14px', color: '#ef4444'}}></i>
                          <span style={{color: '#ef4444'}}>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ep-card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                  <div><h2 style={{fontSize: '16px', fontWeight: 600}}>Frequently Asked Questions</h2><p style={{fontSize: '12px', color: '#64748b'}}>Add common questions about this product</p></div>
                  <button type="button" onClick={addFaq} style={{color: '#16a34a', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer'}}>+ Add FAQ</button>
                </div>
                {prodFaqs.length === 0 && <div style={{textAlign: 'center', padding: '24px', color: '#64748b', border: '1px dashed #e2e8e0', borderRadius: '8px'}}>No FAQs added. Click "+ Add FAQ" to add questions.</div>}
                {prodFaqs.map(f => (
                  <div key={f.id} style={{background: '#f9fafb', borderRadius: '8px', padding: '16px', marginBottom: '12px', border: '1px solid #e2e8e0'}}>
                    {/* Question Input with Remove Button */}
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px'}}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Question" 
                        value={f.question}
                        onChange={(e) => updateFaq(f.id, 'question', e.target.value)}
                        style={{flex: 1, fontSize: '13px'}}
                      />
                      {/* Remove Button */}
                      <button 
                        type="button"
                        onClick={() => removeFaq(f.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '10px 12px',
                          height: '38px',
                          background: 'white',
                          border: '1px solid #ef4444',
                          borderRadius: '8px',
                          color: '#ef4444',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          flexShrink: 0,
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#ef4444'; }}
                      >
                        <i className="ri-delete-bin-line" style={{fontSize: '14px', color: '#ef4444'}}></i>
                        <span style={{color: '#ef4444'}}>Remove</span>
                      </button>
                    </div>
                    {/* Answer Input - Full Width */}
                    <textarea 
                      className="form-input" 
                      rows={2} 
                      placeholder="Answer"
                      value={f.answer}
                      onChange={(e) => updateFaq(f.id, 'answer', e.target.value)}
                      style={{fontSize: '13px', width: '100%'}}
                    ></textarea>
                  </div>
                ))}
              </div>

              <div className="ep-card">
                <div style={{marginBottom: '12px'}}>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px'}}>Related Products</label>
                  <p style={{fontSize: '11px', color: '#64748b'}}>Select up to 4 related products to display</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px'}}>
                  {allRelatedOptions.map(p => (
                    <div 
                      key={p.id} 
                      className={`related-product-card ${prodRelated.includes(p.id) ? 'selected' : ''}`} 
                      onClick={() => toggleRelated(p.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: prodRelated.includes(p.id) ? '2px solid #16a34a' : '1px solid #e2e8e0',
                        background: prodRelated.includes(p.id) ? '#f0fdf4' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                      }}
                    >
                      <img src={p.image} alt={p.name} style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0}} />
                      <div style={{flex: 1, minWidth: 0}}>
                        <p style={{fontSize: '12px', fontWeight: 600, color: '#1c2333', margin: 0}}>{p.name}</p>
                        <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}>
                          <span style={{fontSize: '11px', color: '#64748b'}}>{p.category}</span>
                          <span style={{fontSize: '11px', color: '#d1d5db'}}>|</span>
                          <span style={{fontSize: '12px', color: '#16a34a', fontWeight: 600}}>${p.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{display: 'flex', gap: '12px', marginTop: '8px', marginBottom: '40px'}}>
                <button type="button" className="btn-cancel-prod" style={{flex: 1}} onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className="btn-primary-prod" style={{flex: 1}}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="prod-container">
          <div style={{marginBottom: '20px', fontSize: '18px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans'"}}>Product Management</div>
          <div className="prod-table-header">
            <div className="prod-grid-row">
              <div>Product Details</div><div>Variants</div><div>Price Range</div><div>Discount</div><div>Offer</div><div>Status</div><div style={{textAlign: 'right'}}>Action</div>
            </div>
          </div>
          {products.map((prod) => (
            <div key={prod.id} className="prod-order-card product-row">
              <div className="prod-grid-row">
                <div className="product-cell">
                  <img src={prod.image} alt={prod.name} loading="lazy" />
                  <div className="product-info"><span className="product-name">{prod.name}</span><span className="product-cat">{prod.category}</span></div>
                </div>
                <div>{(prod as any).variantsData ? (Array.isArray((prod as any).variantsData) ? (prod as any).variantsData.length : 0) : 0} variants</div>
                <div>{prod.price}</div>
                <div className="bracket-text text-red">[{prod.discount}]</div>
                <div className={`bracket-text ${prod.offer ? 'text-blue' : 'text-muted-val'}`}>[{prod.offer ? 'Yes' : 'No'}]</div>
                <div><div className={`switch-sm ${prod.status === 'active' ? 'active' : ''}`} onClick={() => toggleProdStatus(prod.id)}></div></div>
                <div className="prod-manage-col">
                  <i className="ri-pencil-line" onClick={() => openProductEdit(prod)}></i>
                  <i className="ri-delete-bin-line" onClick={() => deleteProduct(prod.id)}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
