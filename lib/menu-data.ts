export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  popular?: boolean
  customizations?: {
    sizes?: { name: string; price: number }[]
    addons?: { name: string; price: number }[]
  }
}

export interface Category {
  id: string
  name: string
  icon: string
}

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "sides", name: "Sides", icon: "🍟" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
]

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "classic-burger",
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and our signature sauce",
    price: 12.99,
    image: "/classic-beef-burger.png",
    category: "burgers",
    popular: true,
    customizations: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 2.5 },
      ],
      addons: [
        { name: "Extra Cheese", price: 1.5 },
        { name: "Bacon", price: 2.0 },
        { name: "Avocado", price: 1.75 },
      ],
    },
  },
  {
    id: "chicken-deluxe",
    name: "Chicken Deluxe",
    description: "Crispy chicken breast with mayo, lettuce, and pickles on a toasted bun",
    price: 11.99,
    image: "/crispy-chicken-deluxe.png",
    category: "burgers",
    customizations: {
      sizes: [
        { name: "Regular", price: 0 },
        { name: "Large", price: 2.5 },
      ],
      addons: [
        { name: "Extra Cheese", price: 1.5 },
        { name: "Spicy Sauce", price: 0.5 },
      ],
    },
  },
  {
    id: "veggie-burger",
    name: "Garden Veggie Burger",
    description: "Plant-based patty with fresh vegetables and herb aioli",
    price: 10.99,
    image: "/veggie-burger-with-fresh-ingredients.png",
    category: "burgers",
    customizations: {
      addons: [
        { name: "Vegan Cheese", price: 1.5 },
        { name: "Grilled Mushrooms", price: 1.25 },
      ],
    },
  },

  // Sides
  {
    id: "golden-fries",
    name: "Golden Fries",
    description: "Crispy golden fries seasoned with sea salt",
    price: 4.99,
    image: "/golden-crispy-fries.png",
    category: "sides",
    popular: true,
    customizations: {
      sizes: [
        { name: "Small", price: 0 },
        { name: "Medium", price: 1.5 },
        { name: "Large", price: 2.5 },
      ],
    },
  },
  {
    id: "onion-rings",
    name: "Crispy Onion Rings",
    description: "Beer-battered onion rings served with ranch dipping sauce",
    price: 5.99,
    image: "/crispy-onion-rings.png",
    category: "sides",
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description: "Tender chicken nuggets with your choice of dipping sauce",
    price: 7.99,
    image: "/golden-chicken-nuggets.png",
    category: "sides",
    customizations: {
      sizes: [
        { name: "6 pieces", price: 0 },
        { name: "10 pieces", price: 2.5 },
        { name: "20 pieces", price: 5.0 },
      ],
    },
  },

  // Drinks
  {
    id: "cola",
    name: "Classic Cola",
    description: "Refreshing cola with ice",
    price: 2.99,
    image: "/cola-with-ice.png",
    category: "drinks",
    customizations: {
      sizes: [
        { name: "Small", price: 0 },
        { name: "Medium", price: 0.5 },
        { name: "Large", price: 1.0 },
      ],
    },
  },
  {
    id: "milkshake",
    name: "Vanilla Milkshake",
    description: "Creamy vanilla milkshake topped with whipped cream",
    price: 4.99,
    image: "/vanilla-milkshake.png",
    category: "drinks",
    popular: true,
  },
  {
    id: "orange-juice",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 3.99,
    image: "/fresh-orange-juice.png",
    category: "drinks",
  },

  // Desserts
  {
    id: "chocolate-cake",
    name: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: 5.99,
    image: "/chocolate-fudge-cake-slice.png",
    category: "desserts",
  },
  {
    id: "ice-cream",
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream with chocolate chips",
    price: 3.99,
    image: "/vanilla-chocolate-chip-ice-cream.png",
    category: "desserts",
    customizations: {
      addons: [
        { name: "Extra Chocolate Chips", price: 0.75 },
        { name: "Caramel Sauce", price: 0.5 },
      ],
    },
  },
]

export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter((item) => item.category === categoryId)
}

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter((item) => item.popular)
}
