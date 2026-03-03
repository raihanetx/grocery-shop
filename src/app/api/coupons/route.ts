import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { coupons } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Enable caching
export const dynamic = 'force-dynamic'
export const revalidate = 30

// GET /api/coupons - Get all coupons
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    
    if (code) {
      // Validate coupon code
      const coupon = await db.select().from(coupons).where(eq(coupons.code, code))
      
      if (coupon.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'Invalid coupon code'
        }, { status: 404 })
      }
      
      const foundCoupon = coupon[0]
      
      // Check expiry
      if (foundCoupon.expiry) {
        const expiryDate = new Date(foundCoupon.expiry)
        if (expiryDate < new Date()) {
          return NextResponse.json({
            success: false,
            error: 'Coupon has expired'
          }, { status: 400 })
        }
      }
      
      return NextResponse.json({
        success: true,
        data: foundCoupon
      })
    }
    
    const allCoupons = await db.select().from(coupons)
    
    return NextResponse.json({
      success: true,
      data: allCoupons,
      count: allCoupons.length
    })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}

// POST /api/coupons - Create new coupon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCoupon = await db.insert(coupons).values({
      id: body.id || `coupon-${Date.now()}`,
      code: body.code,
      type: body.type, // 'pct' or 'fixed'
      value: body.value,
      scope: body.scope, // 'all', 'products', 'categories'
      expiry: body.expiry,
      selectedProducts: body.selectedProducts ? JSON.stringify(body.selectedProducts) : null,
      selectedCategories: body.selectedCategories ? JSON.stringify(body.selectedCategories) : null,
    }).returning()
    
    return NextResponse.json({
      success: true,
      data: newCoupon[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create coupon' },
      { status: 500 }
    )
  }
}

// DELETE /api/coupons - Delete coupon
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    
    await db.delete(coupons).where(eq(coupons.id, id))
    
    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete coupon' },
      { status: 500 }
    )
  }
}
