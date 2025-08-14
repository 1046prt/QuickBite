"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import type { MenuItem } from "@/lib/menu-data"

interface ItemCustomizationModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

export function ItemCustomizationModal({ item, isOpen, onClose }: ItemCustomizationModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)

  const { addItem } = useCartStore()

  useEffect(() => {
    if (!item) return

    // Reset form when item changes
    setSelectedSize(item.customizations?.sizes?.[0]?.name || "")
    setSelectedAddons([])
    setSpecialInstructions("")
    setQuantity(1)
  }, [item])

  useEffect(() => {
    if (!item) return

    let price = item.price

    // Add size price
    if (selectedSize && item.customizations?.sizes) {
      const sizeOption = item.customizations.sizes.find((size) => size.name === selectedSize)
      if (sizeOption) {
        price += sizeOption.price
      }
    }

    // Add addon prices
    if (item.customizations?.addons) {
      selectedAddons.forEach((addonName) => {
        const addon = item.customizations!.addons!.find((a) => a.name === addonName)
        if (addon) {
          price += addon.price
        }
      })
    }

    setTotalPrice(price)
  }, [item, selectedSize, selectedAddons])

  const handleAddonToggle = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((name) => name !== addonName) : [...prev, addonName],
    )
  }

  const handleAddToCart = () => {
    if (!item) return

    const cartItem = {
      id: Date.now().toString(),
      menuItem: item,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedAddons,
      specialInstructions: specialInstructions || undefined,
      totalPrice,
    }

    addItem(cartItem)
    onClose()

    // Reset form
    setSelectedSize(item.customizations?.sizes?.[0]?.name || "")
    setSelectedAddons([])
    setSpecialInstructions("")
    setQuantity(1)
  }

  if (!item) return null

  const hasCustomizations = item.customizations?.sizes || item.customizations?.addons

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold text-xl text-gray-900">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image and Description */}
          <div className="space-y-4">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="font-sans text-gray-600 leading-relaxed">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl text-cyan-600">${item.price.toFixed(2)}</span>
              {item.popular && <Badge className="bg-indigo-500">Popular</Badge>}
            </div>
          </div>

          {/* Size Selection */}
          {item.customizations?.sizes && (
            <div className="space-y-3">
              <Label className="font-serif font-semibold text-lg text-gray-900">Choose Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {item.customizations.sizes.map((size) => (
                  <div key={size.name} className="flex items-center space-x-2">
                    <RadioGroupItem value={size.name} id={size.name} />
                    <Label htmlFor={size.name} className="flex-1 cursor-pointer font-sans">
                      <div className="flex justify-between items-center">
                        <span>{size.name}</span>
                        <span className="text-cyan-600 font-medium">
                          {size.price > 0 ? `+$${size.price.toFixed(2)}` : ""}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Add-ons Selection */}
          {item.customizations?.addons && (
            <div className="space-y-3">
              <Label className="font-serif font-semibold text-lg text-gray-900">Add Extras</Label>
              <div className="space-y-2">
                {item.customizations.addons.map((addon) => (
                  <div key={addon.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={addon.name}
                      checked={selectedAddons.includes(addon.name)}
                      onCheckedChange={() => handleAddonToggle(addon.name)}
                    />
                    <Label htmlFor={addon.name} className="flex-1 cursor-pointer font-sans">
                      <div className="flex justify-between items-center">
                        <span>{addon.name}</span>
                        <span className="text-cyan-600 font-medium">+${addon.price.toFixed(2)}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-3">
            <Label htmlFor="instructions" className="font-serif font-semibold text-lg text-gray-900">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="instructions"
              placeholder="Any special requests or dietary requirements..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="font-sans"
              rows={3}
            />
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Label className="font-serif font-semibold text-gray-900">Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-sans font-semibold text-lg w-8 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-serif font-bold text-2xl text-cyan-600">${(totalPrice * quantity).toFixed(2)}</div>
              {quantity > 1 && <div className="font-sans text-sm text-gray-500">${totalPrice.toFixed(2)} each</div>}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-semibold py-3 text-lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart - ${(totalPrice * quantity).toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
