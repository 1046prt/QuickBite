"use client";

import { useState } from "react";
import { CreditCard, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import "../styles/checkout-modal.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">(
    "details"
  );
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "pickup",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [orderId, setOrderId] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const tax = totalPrice * 0.08; // 8% tax
  const deliveryFee = orderDetails.orderType === "delivery" ? 3.99 : 0;
  const finalTotal = totalPrice + tax + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setOrderDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = () => {
    if (!orderDetails.name || !orderDetails.email || !orderDetails.phone) {
      alert("Please fill in all required fields");
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = async () => {
    if (
      !orderDetails.cardNumber ||
      !orderDetails.expiryDate ||
      !orderDetails.cvv ||
      !orderDetails.cardName
    ) {
      alert("Please fill in all payment details");
      return;
    }

    setLoading(true);

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
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.orderId);
        setEstimatedTime(data.estimatedTime);
        setStep("confirmation");
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("details");
    setOrderDetails({
      name: "",
      email: "",
      phone: "",
      orderType: "pickup",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    });
    onClose();
  };

  const formatCustomizations = (item: any) => {
    const customizations = [];
    if (item.selectedSize) {
      customizations.push(`Size: ${item.selectedSize}`);
    }
    if (item.selectedAddons && item.selectedAddons.length > 0) {
      customizations.push(`Add-ons: ${item.selectedAddons.join(", ")}`);
    }
    return customizations.join(" • ");
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className="dialog-content checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">
            {step === "details" && "Order Details"}
            {step === "payment" && "Payment Information"}
            {step === "confirmation" && "Order Confirmed!"}
          </h2>
        </div>

        {step === "details" && (
          <div className="checkout-step-content">
            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-details">
                      <p className="order-item-name">
                        {item.quantity}x {item.menuItem.name}
                      </p>
                      {formatCustomizations(item) && (
                        <p className="order-item-customizations">
                          {formatCustomizations(item)}
                        </p>
                      )}
                    </div>
                    <p className="order-item-price">
                      ${(item.totalPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="customer-details">
              <h3>Your Details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    className="input"
                    value={orderDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    className="input"
                    value={orderDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="form-field full-width">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={orderDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Order Type */}
            <div className="order-type">
              <h3>Order Type</h3>
              <div className="radio-group">
                <div
                  className={`order-type-option ${
                    orderDetails.orderType === "pickup" ? "selected" : ""
                  }`}
                  onClick={() => handleInputChange("orderType", "pickup")}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderDetails.orderType === "pickup"}
                    onChange={() => handleInputChange("orderType", "pickup")}
                  />
                  <div className="order-type-details">
                    <div className="order-type-label">
                      <MapPin size={16} />
                      Pickup (Ready in 10-15 minutes)
                    </div>
                  </div>
                </div>
                <div
                  className={`order-type-option ${
                    orderDetails.orderType === "delivery" ? "selected" : ""
                  }`}
                  onClick={() => handleInputChange("orderType", "delivery")}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderDetails.orderType === "delivery"}
                    onChange={() => handleInputChange("orderType", "delivery")}
                  />
                  <div className="order-type-details">
                    <div className="order-type-label">
                      <Clock size={16} />
                      Delivery (+$3.99, 25-35 minutes)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleDetailsSubmit}
              className="btn btn-default btn-continue"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="checkout-step-content">
            {/* Order Total */}
            <div className="payment-total">
              <div className="payment-total-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="payment-total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="payment-total-row">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="separator"></div>
              <div className="payment-total-row">
                <span>Total</span>
                <span className="payment-total-final">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="payment-info">
              <h3>
                <CreditCard size={20} />
                Payment Information
              </h3>
              <div className="payment-form">
                <div className="form-field">
                  <label htmlFor="cardName" className="form-label">
                    Cardholder Name *
                  </label>
                  <input
                    id="cardName"
                    className="input"
                    value={orderDetails.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number *
                  </label>
                  <input
                    id="cardNumber"
                    className="input"
                    value={orderDetails.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="payment-row">
                  <div className="form-field">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date *
                    </label>
                    <input
                      id="expiryDate"
                      className="input"
                      value={orderDetails.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cvv" className="form-label">
                      CVV *
                    </label>
                    <input
                      id="cvv"
                      className="input"
                      value={orderDetails.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button
                className="btn btn-outline btn-back"
                onClick={() => setStep("details")}
              >
                Back to Details
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={loading}
                className="btn btn-default btn-continue"
              >
                {loading ? (
                  <>
                    <Loader2 className="spinner" size={16} />
                    Processing...
                  </>
                ) : (
                  `Place Order - $${finalTotal.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <CheckCircle size={64} />
            </div>
            <div>
              <h3 className="confirmation-title">Order Placed Successfully!</h3>
              <p className="confirmation-subtitle">
                Thank you for your order. We're preparing your delicious meal!
              </p>
            </div>

            <div className="confirmation-details">
              <div className="confirmation-row">
                <span className="confirmation-label">Order ID:</span>
                <span className="badge badge-outline confirmation-value">
                  {orderId}
                </span>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-label">Estimated Time:</span>
                <span className="confirmation-value primary">
                  {estimatedTime}
                </span>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-label">Order Type:</span>
                <span className="confirmation-value">
                  {orderDetails.orderType}
                </span>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-label">Total Paid:</span>
                <span className="confirmation-value total">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="confirmation-note">
              <p>
                We've sent a confirmation email to{" "}
                <strong>{orderDetails.email}</strong>. You'll receive updates
                about your order status.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="btn btn-default btn-continue-shopping"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
