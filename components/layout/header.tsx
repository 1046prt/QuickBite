"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Filter } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCartSidebar } from "@/components/shopping-cart-sidebar";
import { useDebounce } from "@/hooks/use-debounce";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  category: string;
  dietType: string;
}

export function Header({ onSearch, onFilterChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDietType, setSelectedDietType] = useState("all");
  const { getTotalItems } = useCartStore();
  const cartItemCount = getTotalItems();

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Auto-search when debounced query changes
  useEffect(() => {
    onSearch?.(debouncedSearchQuery);
    onFilterChange?.({
      query: debouncedSearchQuery,
      category: selectedCategory,
      dietType: selectedDietType,
    });
  }, [
    debouncedSearchQuery,
    selectedCategory,
    selectedDietType,
    onSearch,
    onFilterChange,
  ]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDietTypeChange = (dietType: string) => {
    setSelectedDietType(dietType);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDietType("all");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-brand">
            <img src="/logo/QuickBite.png" alt="QuickBite" className="logo" />
            <h1 className="brand-name">QuickBite</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="search-container desktop-only">
            <div className="search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="search-input"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline filter-btn"
              >
                <Filter className="filter-icon" />
                Filters
              </button>
            </div>

            {/* Search Filters - Desktop */}
            {showFilters && (
              <div className="search-filters">
                <div className="filter-group">
                  <label>Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="burgers">🍔 Burgers</option>
                    <option value="pizzas">🍕 Pizzas</option>
                    <option value="sides">🍟 Sides</option>
                    <option value="drinks">🥤 Drinks</option>
                    <option value="desserts">🍰 Desserts</option>
                    <option value="biryani">🍛 Biryani</option>
                    <option value="noodles">🍜 Noodles</option>
                    <option value="north-indian">🥘 North Indian</option>
                    <option value="south-indian">🍲 South Indian</option>
                    <option value="rolls-momos">🥟 Rolls & Momos</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Diet Type:</label>
                  <select
                    value={selectedDietType}
                    onChange={(e) => handleDietTypeChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="veg">🥬 Vegetarian</option>
                    <option value="non-veg">🍖 Non-Vegetarian</option>
                  </select>
                </div>

                <button
                  onClick={clearFilters}
                  className="btn btn-ghost clear-filters-btn"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="header-actions">
            <ShoppingCartSidebar>
              <button className="btn btn-outline cart-btn">
                <ShoppingCart className="cart-icon" />
                <span className="desktop-only">Cart</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
            </ShoppingCartSidebar>

            <button
              className="mobile-menu-btn mobile-only"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-search">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="search-input"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline filter-btn mobile-filter-btn"
              >
                <Filter className="filter-icon" />
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mobile-filters">
                <div className="filter-group">
                  <label>Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="burgers">🍔 Burgers</option>
                    <option value="pizzas">🍕 Pizzas</option>
                    <option value="sides">🍟 Sides</option>
                    <option value="drinks">🥤 Drinks</option>
                    <option value="desserts">🍰 Desserts</option>
                    <option value="biryani">🍛 Biryani</option>
                    <option value="noodles">🍜 Noodles</option>
                    <option value="north-indian">🥘 North Indian</option>
                    <option value="south-indian">🍲 South Indian</option>
                    <option value="rolls-momos">🥟 Rolls & Momos</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Diet Type:</label>
                  <select
                    value={selectedDietType}
                    onChange={(e) => handleDietTypeChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="veg">🥬 Vegetarian</option>
                    <option value="non-veg">🍖 Non-Vegetarian</option>
                  </select>
                </div>

                <button
                  onClick={clearFilters}
                  className="btn btn-ghost clear-filters-btn"
                >
                  Clear All
                </button>
              </div>
            )}

            <nav className="mobile-nav">
              <a
                href="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </a>
              <a
                href="/about"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="/faq"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
