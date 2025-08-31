"use client";

import { useState, useEffect } from "react";
import { Star, Plus, Filter } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { ItemCustomizationModal } from "@/components/item-customization-modal";
import { Header, SearchFilters } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthModal } from "@/components/auth/auth-modal";
import type { MenuItem, Category } from "@/lib/menu-data";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    dietType: "all",
  });
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = menuItems;

    // Apply category filter from header or local selection
    const categoryToFilter =
      searchFilters.category !== "all"
        ? searchFilters.category
        : selectedCategory;
    if (categoryToFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryToFilter);
    }

    // Apply search filter
    if (searchFilters.query) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchFilters.query.toLowerCase())
      );
    }

    // Apply diet type filter
    if (searchFilters.dietType !== "all") {
      filtered = filtered.filter((item) => {
        const isVeg = isVegetarianItem(item);
        return searchFilters.dietType === "veg" ? isVeg : !isVeg;
      });
    }

    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-10":
          filtered = filtered.filter((item) => item.price < 10);
          break;
        case "10-20":
          filtered = filtered.filter(
            (item) => item.price >= 10 && item.price <= 20
          );
          break;
        case "over-20":
          filtered = filtered.filter((item) => item.price > 20);
          break;
      }
    }

    setFilteredItems(filtered);
  }, [selectedCategory, menuItems, searchFilters, priceFilter]);

  const handleSearch = (query: string) => {
    setSearchFilters((prev) => ({ ...prev, query }));
  };

  const handleFilterChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const clearFilters = () => {
    setSearchFilters({ query: "", category: "all", dietType: "all" });
    setPriceFilter("all");
  };

  // Helper function to determine if an item is vegetarian
  const isVegetarianItem = (item: MenuItem): boolean => {
    const vegKeywords = [
      "veg",
      "vegetable",
      "paneer",
      "dal",
      "aloo",
      "gobi",
      "palak",
      "malai",
      "rajma",
      "chole",
      "naan",
      "dosa",
      "idli",
      "uttapam",
      "vada",
      "sambar",
    ];
    const nonVegKeywords = [
      "chicken",
      "mutton",
      "beef",
      "fish",
      "prawn",
      "lamb",
      "meat",
      "egg",
    ];

    const itemText = (item.name + " " + item.description).toLowerCase();

    // Check for explicit non-veg keywords first
    if (nonVegKeywords.some((keyword) => itemText.includes(keyword))) {
      return false;
    }

    // Check for veg keywords or assume veg for certain categories
    if (
      vegKeywords.some((keyword) => itemText.includes(keyword)) ||
      ["desserts", "drinks"].includes(item.category)
    ) {
      return true;
    }

    // Default assumption based on item name patterns
    return (
      itemText.includes("veggie") ||
      itemText.includes("garden") ||
      (item.category === "sides" &&
        !itemText.includes("chicken") &&
        !itemText.includes("bacon"))
    );
  };

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
      <Header onSearch={handleSearch} onFilterChange={handleFilterChange} />

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

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-header">
              <h4>Filter Options</h4>
              <button className="filter-clear" onClick={clearFilters}>
                Clear All
              </button>
            </div>
            <div className="filter-options">
              <div className="filter-option-group">
                <label>Price Range:</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Prices</option>
                  <option value="under-10">Under $10</option>
                  <option value="10-20">$10 - $20</option>
                  <option value="over-20">Over $20</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {(searchFilters.query ||
            searchFilters.category !== "all" ||
            searchFilters.dietType !== "all" ||
            priceFilter !== "all") && (
            <div className="search-results-info">
              <div className="results-count">
                {filteredItems.length} item
                {filteredItems.length !== 1 ? "s" : ""} found
              </div>
              <div className="active-filters">
                {searchFilters.query && (
                  <span className="filter-tag">
                    Search: "{searchFilters.query}"
                    <button
                      onClick={() =>
                        setSearchFilters((prev) => ({ ...prev, query: "" }))
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchFilters.category !== "all" && (
                  <span className="filter-tag">
                    Category:{" "}
                    {categories.find((c) => c.id === searchFilters.category)
                      ?.name || searchFilters.category}
                    <button
                      onClick={() =>
                        setSearchFilters((prev) => ({
                          ...prev,
                          category: "all",
                        }))
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchFilters.dietType !== "all" && (
                  <span className="filter-tag">
                    Diet:{" "}
                    {searchFilters.dietType === "veg"
                      ? "Vegetarian"
                      : "Non-Vegetarian"}
                    <button
                      onClick={() =>
                        setSearchFilters((prev) => ({
                          ...prev,
                          dietType: "all",
                        }))
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
                {priceFilter !== "all" && (
                  <span className="filter-tag">
                    Price:{" "}
                    {priceFilter === "under-10"
                      ? "Under $10"
                      : priceFilter === "10-20"
                      ? "$10-$20"
                      : "Over $20"}
                    <button onClick={() => setPriceFilter("all")}>×</button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Popular Items Banner */}
          {selectedCategory === "burgers" &&
            !searchFilters.query &&
            searchFilters.category === "all" && (
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
                  <div className="card-badges">
                    {item.popular && (
                      <span className="badge badge-default popular-badge">
                        <Star className="badge-icon" />
                        Popular
                      </span>
                    )}
                    <span
                      className={`badge diet-badge ${
                        isVegetarianItem(item) ? "veg-badge" : "non-veg-badge"
                      }`}
                    >
                      {isVegetarianItem(item) ? "🟢 Veg" : "🔴 Non-Veg"}
                    </span>
                  </div>
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

      <Footer />

      {/* Modals */}
      <ItemCustomizationModal
        item={selectedItem}
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
