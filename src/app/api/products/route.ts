import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Enable caching
export const dynamic = 'force-dynamic'
export const revalidate = 60 // Cache for 60 seconds

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const offer = searchParams.get('offer')
    const status = searchParams.get('status')
    
    let result = await db.select().from(products)
    
    // Filter by status first (most common filter)
    if (status === 'active') {
      result = result.filter(p => p.status === 'active' || p.status === 'Active')
    } else if (status === 'inactive') {
      result = result.filter(p => p.status === 'inactive' || p.status === 'Inactive')
    }
    
    if (category) {
      result = result.filter(p => p.category === category)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      )
    }
    if (offer === 'true') {
      result = result.filter(p => p.offer === true)
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      count: result.length
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProduct = await db.insert(products).values({
      name: body.name,
      category: body.category,
      categoryId: body.categoryId,
      image: body.image,
      images: body.images ? JSON.stringify(body.images) : null,
      price: body.price,
      oldPrice: body.oldPrice,
      discount: body.discount || '0%',
      offer: body.offer || false,
      status: body.status || 'active',
      shortDesc: body.shortDesc,
      longDesc: body.longDesc,
      weight: body.weight,
      variants: body.variants ? JSON.stringify(body.variants) : null,
      faqs: body.faqs ? JSON.stringify(body.faqs) : null,
      relatedProducts: body.relatedProducts ? JSON.stringify(body.relatedProducts) : null,
    }).returning()
    
    return NextResponse.json({
      success: true,
      data: newProduct[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT /api/products - Update a product
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    const updatedProduct = await db.update(products)
      .set({
        name: body.name,
        category: body.category,
        categoryId: body.categoryId,
        image: body.image,
        images: body.images ? JSON.stringify(body.images) : null,
        price: body.price,
        oldPrice: body.oldPrice,
        discount: body.discount,
        offer: body.offer,
        status: body.status,
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        variants: body.variants ? JSON.stringify(body.variants) : null,
        faqs: body.faqs ? JSON.stringify(body.faqs) : null,
        relatedProducts: body.relatedProducts ? JSON.stringify(body.relatedProducts) : null,
      })
      .where(eq(products.id, parseInt(id)))
      .returning()
    
    return NextResponse.json({
      success: true,
      data: updatedProduct[0]
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products - Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      )
    }
    
    await db.delete(products).where(eq(products.id, parseInt(id)))
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
