"use client";

import type React from "react";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CheckoutModal } from "@/components/checkout-modal";
import "../styles/shopping-cart-sidebar.css";

interface ShoppingCartSidebarProps {
  children: React.ReactNode;
}

export function ShoppingCartSidebar({ children }: ShoppingCartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
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

  const handleCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {isOpen && (
        <div className="sheet-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="sheet-content sheet-content-right cart-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-header">
              <h2 className="sheet-title">
                <ShoppingCart size={20} />
                Your Cart ({totalItems} items)
              </h2>
            </div>

            <div className="cart-content">
              {items.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-content">
                    <div className="empty-cart-icon">🛒</div>
                    <h3 className="empty-cart-title">Your cart is empty</h3>
                    <p className="empty-cart-description">
                      Add some delicious items to get started!
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn btn-default continue-shopping-btn"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-content">
                          <img
                            src={item.menuItem.image || "/placeholder.svg"}
                            alt={item.menuItem.name}
                            className="cart-item-image"
                          />
                          <div className="cart-item-details">
                            <h4 className="cart-item-name">
                              {item.menuItem.name}
                            </h4>
                            {formatCustomizations(item) && (
                              <p className="cart-item-customizations">
                                {formatCustomizations(item)}
                              </p>
                            )}
                            {item.specialInstructions && (
                              <p className="cart-item-instructions">
                                Note: {item.specialInstructions}
                              </p>
                            )}
                            <div className="cart-item-controls">
                              <div className="quantity-controls">
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="quantity-display">
                                  {item.quantity}
                                </span>
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="item-actions">
                                <span className="item-price">
                                  $
                                  {(item.totalPrice * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  className="remove-item-btn"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="cart-summary">
                    <div className="cart-summary-header">
                      <button className="clear-cart-btn" onClick={clearCart}>
                        <Trash2 size={16} />
                        Clear Cart
                      </button>
                      <div className="cart-total">
                        <p className="cart-total-label">
                          Total ({totalItems} items)
                        </p>
                        <p className="cart-total-amount">
                          ${totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="cart-separator"></div>

                    <button
                      className="btn btn-default checkout-btn"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout - ${totalPrice.toFixed(2)}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
