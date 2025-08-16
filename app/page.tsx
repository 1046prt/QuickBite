"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Star, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { ItemCustomizationModal } from "@/components/item-customization-modal";
import { ShoppingCartSidebar } from "@/components/shopping-cart-sidebar";
import type { MenuItem, Category } from "@/lib/menu-data";
import "../styles/page.css";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const { getTotalItems } = useCartStore();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/menu");
        const data = await response.json();
        setCategories(data.categories);
        setMenuItems(data.items);
        setFilteredItems(
          data.items.filter(
            (item: MenuItem) => item.category === selectedCategory
          )
        );
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    setFilteredItems(
      menuItems.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory, menuItems]);

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizations?.sizes || item.customizations?.addons) {
      setSelectedItem(item);
      setIsCustomizationOpen(true);
    } else {
      const cartItem = {
        id: Date.now().toString(),
        menuItem: item,
        quantity: 1,
        selectedAddons: [],
        totalPrice: item.price,
      };
      useCartStore.getState().addItem(cartItem);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-emoji">🍔</div>
          <p>Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="menu-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-icon">
              <img
                src="/logo/QuickBite.svg"
                alt="QuickBite"
                className="logo-circle"
              />
            </div>

            <h1>QuickBite</h1>
          </div>
          <ShoppingCartSidebar>
            <button className="btn btn-outline btn-sm cart-btn">
              <ShoppingCart className="cart-icon" />
              Cart
              {cartItemCount > 0 && (
                <span className="badge badge-destructive cart-badge">
                  {cartItemCount}
                </span>
              )}
            </button>
          </ShoppingCartSidebar>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Craving Something Delicious?</h2>
          <p>Explore Our Menu & Order in Seconds!</p>
          <button
            className="btn btn-lg hero-btn"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Your Order
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="menu-container">
          {/* Category Navigation */}
          <div className="category-section">
            <h3>Choose Your Category</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-lg category-btn ${
                    selectedCategory === category.id
                      ? "btn-default active"
                      : "btn-outline"
                  }`}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Items Banner */}
          {selectedCategory === "burgers" && (
            <div className="popular-banner">
              <h4>Most Loved Items</h4>
              <p>Try our customer favorites!</p>
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="card menu-card">
                <div className="card-image-wrapper">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="card-image"
                  />
                  {item.popular && (
                    <span className="badge badge-default popular-badge">
                      <Star className="badge-icon" />
                      Popular
                    </span>
                  )}
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <span>${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-default add-btn"
                    >
                      <Plus className="add-icon" />
                      Add
                    </button>
                  </div>
                  {item.customizations && (
                    <p className="customization-note">
                      Customization available
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <div className="empty-emoji">🍽️</div>
              <h4>No items found</h4>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="menu-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-icon">🍔</div>
            <h5>QuickBite</h5>
          </div>
          <p>
            Delicious food, delivered fast. Order now and satisfy your cravings!
          </p>
        </div>
      </footer>

      {/* Customization Modal */}
      <ItemCustomizationModal
        item={selectedItem}
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
      />
    </div>
  );
}
