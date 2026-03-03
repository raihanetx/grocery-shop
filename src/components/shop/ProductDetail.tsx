'use client'

import { useState, useEffect } from 'react'
import { CartItem, ViewType, Review } from '@/types'
import { useShopStore } from '@/store/useShopStore'

interface ProductDetailProps {
  setView: (v: ViewType) => void
  addToCart: (item: CartItem) => void
}

export default function ProductDetail({ setView, addToCart }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState('desc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  
  const { products, selectedProduct, setSelectedProduct } = useShopStore()
  
  // Use selected product from store, fallback to first product or demo
  const product = selectedProduct || products[0] || null
  
  // Get related products from the store (products with offers)
  const relatedProducts = products.filter(p => p.offer && p.id !== product?.id).slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    oldPrice: p.oldPrice || p.price,
    img: p.image,
    weight: '500g',
    discount: parseInt(p.discount) || 0,
    rating: 4.5,
    reviews: 100
  }))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmitReview = () => {
    const nameInput = document.getElementById('reviewName') as HTMLInputElement
    const textInput = document.getElementById('reviewText') as HTMLTextAreaElement
    const name = nameInput?.value || ''
    const text = textInput?.value || ''

    if (name && text && userRating > 0) {
      const initials = name.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase() || name.substring(0, 2).toUpperCase()
      const newReview: Review = { id: Date.now(), initials, name, rating: userRating, text, date: 'Just now' }
      setReviews([newReview, ...reviews])
      setIsModalOpen(false)
      setUserRating(0)
    } else {
      alert("Please fill all fields and rate.")
    }
  }

  // Use selected product or fallback to demo
  const sampleProduct: CartItem = product ? {
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice || product.price,
    img: product.image,
    weight: '1 KG'
  } : { id: 99, name: 'Organic Premium Carrots', price: 80, oldPrice: 95, img: 'https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png', weight: '1 KG' }

  // Get variants from product data
  const productVariants = product?.variants ? 
    (typeof product.variants === 'string' ? JSON.parse(product.variants) : product.variants) 
    : []

  // Get FAQs from product data
  const productFaqs = product?.faqs ? 
    (typeof product.faqs === 'string' ? JSON.parse(product.faqs) : product.faqs) 
    : []

  // Get related products from product data
  const productRelated = product?.relatedProducts ? 
    (typeof product.relatedProducts === 'string' ? JSON.parse(product.relatedProducts) : product.relatedProducts) 
    : []

  // Get description from product or fallback
  const productDescription = product?.shortDesc || product?.longDesc || 'No description available.'

  return (
    <div className="bg-white w-full py-6 md:py-10 px-[30px] md:px-[45px] max-w-5xl mx-auto min-h-[calc(100vh-120px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div className="flex flex-col w-full">
          <div className="flex-grow relative w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm min-h-[200px]">
            {product?.discount && product.discount !== '0%' && (
              <div className="absolute top-3 left-3 bg-[#16a34a] text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10 shadow-md">-{product.discount} OFF</div>
            )}
            <img src={sampleProduct.img} className="absolute inset-0 w-full h-full object-contain" alt={sampleProduct.name} loading="lazy" />
          </div>
          {product?.image && (
          <div className="grid grid-cols-4 gap-2 mt-3 flex-shrink-0">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity border-[#16a34a]">
              <img src={product.image} className="w-full h-full object-cover" alt="Product image" loading="lazy" />
            </div>
          </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl md:text-3xl font-bold text-[#1F2937] leading-tight mb-3">{sampleProduct.name}</h1>
          <div className="flex items-center flex-wrap gap-4 mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#16a34a]">TK<span>{sampleProduct.price}</span></span>
              {sampleProduct.oldPrice && sampleProduct.oldPrice > sampleProduct.price && (
                <span className="text-sm text-gray-300 line-through font-medium">TK{sampleProduct.oldPrice}</span>
              )}
            </div>
          </div>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-6 line-clamp-2">{productDescription}</p>

          {/* Quantity & Variant Section */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            {productVariants.length > 0 ? (
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Variants</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {productVariants.map((v: any, idx: number) => (
                    <button 
                      key={idx}
                      style={{ 
                        padding: '6px 14px', 
                        borderRadius: '8px', 
                        border: '1px solid #16a34a', 
                        background: 'white', 
                        color: '#16a34a', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        cursor: 'pointer' 
                      }}
                    >
                      {v.name} - TK{v.price}
                      {v.discount && ` (${v.discount}% off)`}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quantity</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><i className="ri-subtract-line"></i></button>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', minWidth: '24px', textAlign: 'center' }}>1</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><i className="ri-add-line"></i></button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>TK{sampleProduct.price}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <button onClick={() => addToCart(sampleProduct)} className="btn-tap flex-1 border border-[#16a34a] text-[#16a34a] h-12 rounded-lg text-sm font-bold hover:bg-teal-50 uppercase flex items-center justify-center gap-2"><i className="ri-shopping-cart-line"></i> Add to Cart</button>
            <button onClick={() => setView('checkout')} className="btn-tap flex-1 bg-[#16a34a] text-white h-12 rounded-lg text-sm font-bold shadow-lg shadow-teal-100 uppercase flex items-center justify-center gap-2"><i className="ri-shopping-bag-line"></i> Buy Now</button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-center items-center gap-5 border-y border-gray-200 py-2.5 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-4 md:px-0">
          <button onClick={() => setActiveTab('desc')} className={`text-sm transition-colors ${activeTab === 'desc' ? 'text-[#1F2937] font-bold' : 'text-gray-400 font-medium'}`}>Description</button>
          <div className="w-px h-3 bg-gray-300 shrink-0"></div>
          <button onClick={() => setActiveTab('rev')} className={`text-sm transition-colors ${activeTab === 'rev' ? 'text-[#1F2937] font-bold' : 'text-gray-400 font-medium'}`}>Reviews</button>
          <div className="w-px h-3 bg-gray-300 shrink-0"></div>
          <button onClick={() => setActiveTab('qa')} className={`text-sm transition-colors ${activeTab === 'qa' ? 'text-[#1F2937] font-bold' : 'text-gray-400 font-medium'}`}>FAQ</button>
        </div>
        <div className="max-w-2xl mx-auto">
          {activeTab === 'desc' && (
            <div className="fade-in text-[0.9rem] text-[#6B7280] leading-7 text-center md:text-left">
              <p className="mb-4">{productDescription}</p>
              {product?.longDesc && (
                <p className="mb-4">{product.longDesc}</p>
              )}
            </div>
          )}
          {activeTab === 'rev' && (
            <div className="fade-in">
              <div className="flex justify-center md:justify-start mb-6 cursor-pointer text-[#16a34a]" onClick={() => setIsModalOpen(true)}>
                <div className="flex items-center gap-2"><i className="ri-edit-circle-line text-lg"></i><span className="text-sm font-semibold underline decoration-dotted">Write a review</span></div>
              </div>
              {reviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100 fade-in w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-[#16a34a] flex items-center justify-center text-xs font-bold">{rev.initials}</div>
                        <span className="text-sm font-bold text-[#1F2937]">{rev.name}</span>
                        <div className="flex text-yellow-400 text-[10px] ml-1">
                          {[1, 2, 3, 4, 5].map(i => <i key={i} className={`${i <= rev.rating ? 'ri-star-fill' : 'ri-star-line'}`}></i>)}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                    </div>
                    <div className="pl-[44px]">
                      <p className="text-xs text-[#6B7280] leading-relaxed">{rev.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No reviews yet. Be the first to write a review!
                </div>
              )}
            </div>
          )}
          {activeTab === 'qa' && (
            <div className="fade-in">
              {productFaqs.length > 0 ? (
                <div className="space-y-4">
                  {productFaqs.map((faq: any, idx: number) => (
                    <div key={idx} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-sm font-bold text-[#1F2937] mb-1 flex items-center gap-2"><i className="ri-question-fill text-[#16a34a]"></i> {faq.question}</h4>
                      <p className="text-xs text-[#6B7280] pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No FAQs added yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* You May Like Section */}
      <div style={{ marginTop: '48px' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>You May Like</h2>
          <button className="text-sm font-medium text-[#16a34a] hover:underline flex items-center gap-1">
            View All <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
          {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const prod = products.find(p => p.id === item.id)
                if (prod) {
                  setSelectedProduct(prod)
                  window.scrollTo(0, 0)
                }
              }}
              className="flex-shrink-0 w-[180px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
            >
              <div className="relative h-[140px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                {item.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md z-10">
                    -{item.discount}%
                  </div>
                )}
                <button
                  className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white hover:text-red-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="ri-heart-line text-sm"></i>
                </button>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-3">
                <div className="flex items-center gap-1 mb-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i
                        key={star}
                        className={`ri-star-${star <= Math.floor(item.rating) ? 'fill' : 'line'} text-yellow-400`}
                        style={{ fontSize: '10px' }}
                      ></i>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">({item.reviews})</span>
                </div>

                <h3 className="text-sm font-semibold text-gray-800 truncate mb-0.5 group-hover:text-[#16a34a] transition-colors">{item.name}</h3>
                <span className="text-[10px] text-gray-400 block mb-2">{item.weight}</span>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-[#16a34a]">TK{item.price}</span>
                    <span className="text-[10px] text-gray-400 line-through">TK{item.oldPrice}</span>
                  </div>
                  <button
                    className="w-8 h-8 bg-[#16a34a] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#15803d] transition-colors transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ id: item.id, name: item.name, price: item.price, oldPrice: item.oldPrice, img: item.img, weight: item.weight });
                    }}
                  >
                    <i className="ri-add-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="text-center text-gray-500 py-8 w-full">
              No related products found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6">
            <h3 className="text-center text-lg font-bold text-[#1F2937] mb-4">Write a Review</h3>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <i key={i} className={`ri-star-${i <= userRating ? 'fill' : 'line'} text-2xl cursor-pointer transition-colors ${i <= userRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} onClick={() => setUserRating(i)}></i>
              ))}
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Name</label>
                <input id="reviewName" type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#16a34a]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Review</label>
                <textarea id="reviewText" rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#16a34a] resize-none"></textarea>
              </div>
            </div>
            <button onClick={handleSubmitReview} className="w-full py-3 bg-[#16a34a] text-white font-bold rounded-lg shadow-lg hover:bg-[#15803d] transition-colors">Submit Review</button>
          </div>
        </div>
      )}
    </div>
  )
}
