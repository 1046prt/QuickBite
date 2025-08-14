"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details")
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "pickup",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [orderId, setOrderId] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const tax = totalPrice * 0.08 // 8% tax
  const deliveryFee = orderDetails.orderType === "delivery" ? 3.99 : 0
  const finalTotal = totalPrice + tax + deliveryFee

  const handleInputChange = (field: string, value: string) => {
    setOrderDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handleDetailsSubmit = () => {
    if (!orderDetails.name || !orderDetails.email || !orderDetails.phone) {
      alert("Please fill in all required fields")
      return
    }
    setStep("payment")
  }

  const handlePaymentSubmit = async () => {
    if (!orderDetails.cardNumber || !orderDetails.expiryDate || !orderDetails.cvv || !orderDetails.cardName) {
      alert("Please fill in all payment details")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerDetails: {
            name: orderDetails.name,
            email: orderDetails.email,
            phone: orderDetails.phone,
          },
          orderType: orderDetails.orderType,
          totals: {
            subtotal: totalPrice,
            tax,
            deliveryFee,
            total: finalTotal,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOrderId(data.orderId)
        setEstimatedTime(data.estimatedTime)
        setStep("confirmation")
        clearCart()
      } else {
        alert("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("Order failed:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep("details")
    setOrderDetails({
      name: "",
      email: "",
      phone: "",
      orderType: "pickup",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    })
    onClose()
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold text-xl text-gray-900">
            {step === "details" && "Order Details"}
            {step === "payment" && "Payment Information"}
            {step === "confirmation" && "Order Confirmed!"}
          </DialogTitle>
        </DialogHeader>

        {step === "details" && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-gray-900">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-2">
                    <div className="flex-1">
                      <p className="font-sans font-medium text-gray-900">
                        {item.quantity}x {item.menuItem.name}
                      </p>
                      {formatCustomizations(item) && (
                        <p className="font-sans text-xs text-gray-500">{formatCustomizations(item)}</p>
                      )}
                    </div>
                    <p className="font-sans font-semibold text-cyan-600">
                      ${(item.totalPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-gray-900">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="font-sans font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={orderDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="font-sans"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-sans font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={orderDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="font-sans"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="font-sans font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={orderDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="font-sans"
                />
              </div>
            </div>

            {/* Order Type */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-gray-900">Order Type</h3>
              <RadioGroup
                value={orderDetails.orderType}
                onValueChange={(value) => handleInputChange("orderType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer font-sans">
                    <MapPin className="h-4 w-4" />
                    Pickup (Ready in 10-15 minutes)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer font-sans">
                    <Clock className="h-4 w-4" />
                    Delivery (+$3.99, 25-35 minutes)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleDetailsSubmit}
              className="w-full bg-cyan-600 hover:bg-cyan-700 font-sans font-semibold"
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            {/* Order Total */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-sans">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-sans">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between font-sans">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-serif font-bold text-lg">
                    <span>Total</span>
                    <span className="text-cyan-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-gray-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName" className="font-sans font-medium">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardName"
                    value={orderDetails.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    placeholder="John Doe"
                    className="font-sans"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber" className="font-sans font-medium">
                    Card Number *
                  </Label>
                  <Input
                    id="cardNumber"
                    value={orderDetails.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="font-sans"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="font-sans font-medium">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiryDate"
                      value={orderDetails.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      className="font-sans"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="font-sans font-medium">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      value={orderDetails.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      className="font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1 font-sans">
                Back to Details
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                disabled={loading}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 font-sans font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - $${finalTotal.toFixed(2)}`
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">Order Placed Successfully!</h3>
              <p className="font-sans text-gray-600">Thank you for your order. We're preparing your delicious meal!</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans font-medium">Order ID:</span>
                    <Badge variant="outline" className="font-mono">
                      {orderId}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans font-medium">Estimated Time:</span>
                    <span className="font-sans text-cyan-600 font-semibold">{estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans font-medium">Order Type:</span>
                    <span className="font-sans capitalize">{orderDetails.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans font-medium">Total Paid:</span>
                    <span className="font-serif font-bold text-lg text-cyan-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-cyan-50 rounded-lg p-4">
              <p className="font-sans text-sm text-cyan-800">
                We've sent a confirmation email to <strong>{orderDetails.email}</strong>. You'll receive updates about
                your order status.
              </p>
            </div>

            <Button onClick={handleClose} className="w-full bg-cyan-600 hover:bg-cyan-700 font-sans font-semibold">
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
