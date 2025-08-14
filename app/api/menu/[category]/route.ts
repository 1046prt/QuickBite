import { NextResponse } from "next/server"
import { getMenuItemsByCategory } from "@/lib/menu-data"

export async function GET(request: Request, { params }: { params: { category: string } }) {
  const { category } = params

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const items = getMenuItemsByCategory(category)

  return NextResponse.json({
    items,
    category,
    success: true,
  })
}
