"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { CheckoutModal } from "@/components/checkout-modal"

interface ShoppingCartSidebarProps {
  children: React.ReactNode
}

export function ShoppingCartSidebar({ children }: ShoppingCartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const formatCustomizations = (item: any) => {
    const customizations = []
    if (item.selectedSize) {
      customizations.push(`Size: ${item.selectedSize}`)
    }
    if (item.selectedAddons && item.selectedAddons.length > 0) {
      customizations.push(`Add-ons: ${item.selectedAddons.join(", ")}`)
    }
    return customizations.join(" • ")
  }

  const handleCheckout = () => {
    setIsOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="font-serif font-bold text-xl text-gray-900 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart ({totalItems} items)
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="font-sans text-gray-600 mb-4">Add some delicious items to get started!</p>
                  <Button onClick={() => setIsOpen(false)} className="bg-cyan-600 hover:bg-cyan-700">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex gap-3">
                        <img
                          src={item.menuItem.image || "/placeholder.svg"}
                          alt={item.menuItem.name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-semibold text-gray-900 truncate">{item.menuItem.name}</h4>
                          {formatCustomizations(item) && (
                            <p className="font-sans text-xs text-gray-500 mt-1">{formatCustomizations(item)}</p>
                          )}
                          {item.specialInstructions && (
                            <p className="font-sans text-xs text-gray-500 mt-1 italic">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-sans font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-semibold text-cyan-600">
                                ${(item.totalPrice * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </Button>
                    <div className="text-right">
                      <p className="font-sans text-sm text-gray-600">Total ({totalItems} items)</p>
                      <p className="font-serif font-bold text-2xl text-cyan-600">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-semibold py-3 text-lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout - ${totalPrice.toFixed(2)}
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}
