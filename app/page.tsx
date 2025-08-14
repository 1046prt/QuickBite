"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Plus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { ItemCustomizationModal } from "@/components/item-customization-modal"
import { ShoppingCartSidebar } from "@/components/shopping-cart-sidebar"
import type { MenuItem, Category } from "@/lib/menu-data"

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("burgers")
  const [loading, setLoading] = useState(true)
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)

  const { getTotalItems } = useCartStore()
  const cartItemCount = getTotalItems()

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/menu")
        const data = await response.json()
        setCategories(data.categories)
        setMenuItems(data.items)
        setFilteredItems(data.items.filter((item: MenuItem) => item.category === selectedCategory))
      } catch (error) {
        console.error("Failed to fetch menu data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuData()
  }, [])

  useEffect(() => {
    setFilteredItems(menuItems.filter((item) => item.category === selectedCategory))
  }, [selectedCategory, menuItems])

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizations?.sizes || item.customizations?.addons) {
      setSelectedItem(item)
      setIsCustomizationOpen(true)
    } else {
      const cartItem = {
        id: Date.now().toString(),
        menuItem: item,
        quantity: 1,
        selectedAddons: [],
        totalPrice: item.price,
      }
      useCartStore.getState().addItem(cartItem)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce text-6xl mb-4">🍔</div>
          <p className="font-serif text-xl text-gray-600">Loading delicious menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🍔</div>
              <h1 className="font-serif font-black text-xl text-gray-900">QuickBite</h1>
            </div>

            <ShoppingCartSidebar>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </ShoppingCartSidebar>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-indigo-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-black text-4xl md:text-6xl mb-4">Craving Something Delicious?</h2>
          <p className="font-sans text-lg md:text-xl mb-8 opacity-90">Explore Our Menu & Order in Seconds!</p>
          <Button
            size="lg"
            className="bg-white text-cyan-600 hover:bg-gray-100 font-sans font-semibold px-8 py-3 text-lg"
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Order
          </Button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Navigation */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6 text-center">Choose Your Category</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`font-sans font-medium px-6 py-3 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "hover:bg-cyan-50 hover:border-cyan-300"
                  }`}
                >
                  <span className="text-xl mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Items Banner */}
          {selectedCategory === "burgers" && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white text-center">
                <h4 className="font-serif font-bold text-xl mb-2">Most Loved Items</h4>
                <p className="font-sans opacity-90">Try our customer favorites!</p>
              </div>
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white"
              >
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  {item.popular && (
                    <Badge className="absolute top-3 left-3 bg-indigo-500 hover:bg-indigo-600">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-serif font-bold text-lg text-gray-900 mb-2">{item.name}</h4>
                    <p className="font-sans text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xl text-cyan-600">${item.price.toFixed(2)}</span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-medium px-4 py-2"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  {item.customizations && (
                    <p className="font-sans text-xs text-gray-500 mt-2">Customization available</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h4 className="font-serif font-bold text-xl text-gray-900 mb-2">No items found</h4>
              <p className="font-sans text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-2xl">🍔</div>
            <h5 className="font-serif font-bold text-xl">QuickBite</h5>
          </div>
          <p className="font-sans text-gray-400">
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
  )
}
