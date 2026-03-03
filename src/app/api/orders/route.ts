import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/orders - Get all orders
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const customerId = searchParams.get('customerId')
    
    let result = await db.select().from(orders)
    
    // Apply filters
    if (status) {
      result = result.filter(o => o.status === status)
    }
    if (customerId) {
      result = result.filter(o => o.customerId === parseInt(customerId))
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      count: result.length
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create order
    const newOrder = await db.insert(orders).values({
      id: body.id || `ORD-${Date.now().toString().slice(-5)}`,
      customerId: body.customerId,
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: body.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: body.paymentMethod || 'Cash on Delivery',
      status: body.status || 'pending',
      subtotal: body.subtotal,
      delivery: body.delivery,
      discount: body.discount || 0,
      couponAmount: body.couponAmount || 0,
      total: body.total,
      couponCodes: JSON.stringify(body.couponCodes || []),
    }).returning()
    
    // Create order items
    if (body.items && body.items.length > 0) {
      await db.insert(orderItems).values(
        body.items.map((item: any) => ({
          name: item.name,
          variant: item.variant,
          qty: item.qty,
          basePrice: item.basePrice,
          offerText: item.offerText,
          offerDiscount: item.offerDiscount || 0,
          couponCode: item.couponCode,
          couponDiscount: item.couponDiscount || 0,
          orderId: newOrder[0].id,
          productId: item.productId,
        }))
      )
    }
    
    return NextResponse.json({
      success: true,
      data: newOrder[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// PATCH /api/orders - Update order status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, courierStatus, canceledBy } = body
    
    const updateData: any = {}
    if (status) updateData.status = status
    if (courierStatus) updateData.courierStatus = courierStatus
    if (canceledBy) updateData.canceledBy = canceledBy
    
    const updated = await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning()
    
    return NextResponse.json({
      success: true,
      data: updated[0]
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
