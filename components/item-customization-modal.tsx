"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItem } from "@/lib/menu-data";
import "../styles/item-customization-modal.css";

interface ItemCustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemCustomizationModal({
  item,
  isOpen,
  onClose,
}: ItemCustomizationModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const { addItem } = useCartStore();

  useEffect(() => {
    if (!item) return;

    // Reset form when item changes
    setSelectedSize(item.customizations?.sizes?.[0]?.name || "");
    setSelectedAddons([]);
    setSpecialInstructions("");
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;

    let price = item.price;

    // Add size price
    if (selectedSize && item.customizations?.sizes) {
      const sizeOption = item.customizations.sizes.find(
        (size) => size.name === selectedSize
      );
      if (sizeOption) {
        price += sizeOption.price;
      }
    }

    // Add addon prices
    if (item.customizations?.addons) {
      selectedAddons.forEach((addonName) => {
        const addon = item.customizations!.addons!.find(
          (a) => a.name === addonName
        );
        if (addon) {
          price += addon.price;
        }
      });
    }

    setTotalPrice(price);
  }, [item, selectedSize, selectedAddons]);

  const handleAddonToggle = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((name) => name !== addonName)
        : [...prev, addonName]
    );
  };

  const handleAddToCart = () => {
    if (!item) return;

    const cartItem = {
      id: Date.now().toString(),
      menuItem: item,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedAddons,
      specialInstructions: specialInstructions || undefined,
      totalPrice,
    };

    addItem(cartItem);
    onClose();

    // Reset form
    setSelectedSize(item.customizations?.sizes?.[0]?.name || "");
    setSelectedAddons([]);
    setSpecialInstructions("");
    setQuantity(1);
  };

  if (!isOpen || !item) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog-content customization-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">{item.name}</h2>
        </div>

        <div className="customization-content">
          {/* Item Image and Description */}
          <div className="item-display">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="item-image"
            />
            <p className="item-description">{item.description}</p>
            <div className="item-price-row">
              <span className="item-price">${item.price.toFixed(2)}</span>
              {item.popular && (
                <span className="item-popular-badge">Popular</span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          {item.customizations?.sizes && (
            <div className="size-selection">
              <h3>Choose Size</h3>
              <div className="size-options">
                {item.customizations.sizes.map((size) => (
                  <div
                    key={size.name}
                    className={`size-option ${
                      selectedSize === size.name ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.name}
                      checked={selectedSize === size.name}
                      onChange={() => setSelectedSize(size.name)}
                    />
                    <div className="size-option-content">
                      <span className="size-option-name">{size.name}</span>
                      <span className="size-option-price">
                        {size.price > 0 ? `+$${size.price.toFixed(2)}` : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Selection */}
          {item.customizations?.addons && (
            <div className="addons-selection">
              <h3>Add Extras</h3>
              <div className="addon-options">
                {item.customizations.addons.map((addon) => (
                  <div
                    key={addon.name}
                    className={`addon-option ${
                      selectedAddons.includes(addon.name) ? "selected" : ""
                    }`}
                    onClick={() => handleAddonToggle(addon.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.name)}
                      onChange={() => handleAddonToggle(addon.name)}
                    />
                    <div className="addon-option-content">
                      <span className="addon-option-name">{addon.name}</span>
                      <span className="addon-option-price">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="special-instructions">
            <h3>Special Instructions (Optional)</h3>
            <textarea
              className="textarea instructions-textarea"
              placeholder="Any special requests or dietary requirements..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          {/* Quantity and Price */}
          <div className="quantity-price-section">
            <div className="quantity-controls">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-buttons">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="price-display">
              <div className="total-price">
                ${(totalPrice * quantity).toFixed(2)}
              </div>
              {quantity > 1 && (
                <div className="unit-price">${totalPrice.toFixed(2)} each</div>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="btn btn-default add-to-cart-btn"
          >
            <ShoppingCart size={20} />
            Add to Cart - ${(totalPrice * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
