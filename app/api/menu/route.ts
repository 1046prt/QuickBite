import { NextResponse } from "next/server"
import { menuItems, categories } from "@/lib/menu-data"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    categories,
    items: menuItems,
    success: true,
  })
}
