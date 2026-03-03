'use client'

import { useState, useEffect, memo } from 'react'
import { CartItem, ViewType } from '@/types'
import { useShopStore } from '@/store/useShopStore'
import { heroImages } from '@/lib/constants'

interface ShopProps {
  setView: (v: ViewType) => void
  addToCart: (item: CartItem) => void
}

function ShopComponent({ setView, addToCart }: ShopProps) {
  const [currentHero, setCurrentHero] = useState(0)
  const { categories, products, fetchData, setSelectedProduct } = useShopStore()

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setView('product')
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Filter products with offers for the offer cards section
  const offerProducts = products.filter(p => p.offer).slice(0, 3)

  return (
    <main className="flex-grow">
      {/* Hero Carousel */}
      <section className="w-full pb-4 md:pb-0">
        <div className="mx-6 mt-6 md:mx-6 md:mt-6 relative h-[172.5px] md:h-[260px] rounded-2xl overflow-hidden shadow-xl group">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === currentHero ? 'opacity-100' : 'opacity-0'}`}
              style={{backgroundImage: `url('${img}')`}}
            ></div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHero(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentHero ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pt-2 pb-6 md:pt-10 md:pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 font-bangla">ক্যাটাগরি</h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base font-bangla">আপনার প্রয়োজনীয় সবকিছু এখানেই পাবেন</p>
          </div>
          
          {categories.length === 0 ? (
            <div className="flex justify-center">
              <div className="flex gap-4 md:gap-5 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 flex flex-col items-center animate-pulse">
                    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl bg-gray-200"></div>
                    <div className="w-12 h-3 bg-gray-200 rounded mt-1"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex gap-4 md:gap-5 overflow-x-auto md:flex-wrap md:justify-center pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                {categories.filter(c => c.status === 'Active').map((cat) => (
                  <div key={cat.id} className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
                    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700 group-hover:text-[#16a34a] group-hover:border-[#16a34a] transition-colors duration-300 mb-1 overflow-hidden">
                      {cat.type === 'icon' && cat.icon ? (
                        <i className={`${cat.icon} text-2xl md:text-4xl`}></i>
                      ) : cat.type === 'image' && cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <i className="ri-folder-line text-2xl md:text-4xl"></i>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* OFFER CARDS SECTION */}
      <section id="offers" className="pb-6 md:pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-4 text-left">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Offer Cards</h2>
            <p className="text-gray-500 mt-0.5 text-xs md:text-sm">Exclusive deals just for you</p>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {offerProducts.length > 0 ? offerProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-[10px] flex items-center overflow-hidden border border-[#eee] transition-all shrink-0 w-[240px] h-[100px] cursor-pointer" 
                onClick={() => setView('product')}
              >
                <div className="w-[80px] h-full flex justify-center items-center p-2 pl-6">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <div className="w-[1px] h-[70%] bg-[#e0e0e0]"></div>
                <div className="flex-1 py-2 px-3 flex flex-col justify-center">
                  <div className="text-[11px] text-[#ff4757] font-bold mb-1">Save {product.discount} today</div>
                  <h2 className="text-[13px] font-semibold text-[#333] mb-1 truncate">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#16a34a]">TK{product.price}.00</span>
                    {product.oldPrice && (
                      <span className="text-[10px] line-through text-[#aaa]">TK{product.oldPrice}.00</span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              // Fallback offer cards when no data
              <>
                <div className="bg-white rounded-[10px] flex items-center overflow-hidden border border-[#eee] transition-all shrink-0 w-[240px] h-[100px] cursor-pointer" onClick={() => setView('product')}>
                  <div className="w-[80px] h-full flex justify-center items-center p-2 pl-6">
                    <img src="https://i.postimg.cc/B6sD1hKt/1000020579-removebg-preview.png" alt="Product" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="w-[1px] h-[70%] bg-[#e0e0e0]"></div>
                  <div className="flex-1 py-2 px-3 flex flex-col justify-center">
                    <div className="text-[11px] text-[#ff4757] font-bold mb-1">Loading...</div>
                    <h2 className="text-[13px] font-semibold text-[#333] mb-1 truncate">Loading offers...</h2>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-12 pt-2">
        <div className="container mx-auto px-4 md:px-6">
          {products.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white p-3 shadow-sm border border-gray-200 rounded-2xl animate-pulse">
                  <div className="h-[140px] bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.filter(p => p.status === 'active').map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleProductClick(item)}
                  className="bg-white p-3 shadow-sm relative cursor-pointer transition-all duration-300 flex flex-col w-full min-h-[250px] border border-gray-200 rounded-2xl hover:shadow-lg"
                >
                  {item.discount !== '0%' && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10">-{item.discount}</span>
                  )}
                  <div className="flex-grow flex items-center justify-center py-2">
                    <div className="w-full h-[140px] flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" loading="lazy"/>
                    </div>
                  </div>
                  <div className="flex flex-col mt-auto">
                    <h3 className="text-sm font-medium text-gray-900 truncate font-bangla">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-2 mt-0.5">
                      <span className="text-sm font-semibold text-[#16a34a]">TK {typeof item.price === 'number' ? item.price : item.price}</span>
                      {item.oldPrice && (
                        <span className="text-xs text-gray-500 line-through">TK {item.oldPrice}</span>
                      )}
                    </div>
                    <button 
                      className="w-full text-xs font-bold py-1.5 flex items-center justify-center gap-1 bg-[#16a34a] text-white rounded-full border-none cursor-pointer transition-transform duration-200 active:scale-95" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          oldPrice: item.oldPrice || item.price,
                          img: item.image,
                          weight: '1 KG'
                        });
                      }}
                    >
                      <i className="ri-shopping-cart-line text-sm"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(ShopComponent)
