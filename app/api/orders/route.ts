import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const orderData = await request.json()

  // Simulate order processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const orderId = `ORD-${Date.now()}`

  return NextResponse.json({
    success: true,
    orderId,
    estimatedTime: "15-20 minutes",
    message: "Order placed successfully!",
  })
}
