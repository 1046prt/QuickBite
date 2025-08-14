# 🍔 Digital Menu & Ordering System

A modern, fully-functional digital menu and ordering system built with Astro and React. Features a comprehensive restaurant experience with 100+ menu items, customizable orders, shopping cart, and complete checkout flow - similar to McDonald's kiosks or Swiggy's ordering interface.

![Digital Menu System](https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop)

## ✨ Features

### 🍽️ Complete Menu System

- **100+ Menu Items** across 12 categories
- **12 Food Categories**: Burgers, Pizza, Chicken, Seafood, Pasta, Salads, Sandwiches, Breakfast, Desserts, Beverages, Sides, and Healthy Options
- **Rich Product Details** with descriptions, pricing, and appetizing images
- **Category Filtering** with smooth navigation
- **Popular Items** highlighting and badges

### 🎛️ Advanced Customization

- **Size Selection** (Regular, Large, Extra Large)
- **Add-ons & Extras** (cheese, bacon, vegetables, sauces)
- **Special Instructions** for dietary preferences
- **Real-time Price Calculation** as you customize
- **Quantity Management** with intuitive controls

### 🛒 Smart Shopping Cart

- **Persistent Cart** with localStorage integration
- **Item Management** (add, remove, modify quantities)
- **Order Summary** with itemized pricing
- **Tax Calculation** and total computation
- **Cart Sidebar** with smooth animations

### 💳 Complete Checkout Flow

- **3-Step Checkout Process**:
  1. Customer Details (name, phone, email)
  2. Order Options (pickup/delivery, payment method)
  3. Order Confirmation with tracking details
- **Form Validation** with error handling
- **Order Processing** simulation
- **Receipt Generation** with order summary

### 🎨 Modern Design

- **Mobile-First Responsive Design**
- **Vibrant Color Palette** (Cyan & Indigo theme)
- **Professional Typography** (Montserrat + Open Sans)
- **Smooth Animations** and hover effects
- **Accessibility Compliant** (WCAG AA standards)

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Modern static site generator
- **Frontend**: [React](https://reactjs.org/) - Component library
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icons
- **Fonts**: [Google Fonts](https://fonts.google.com/) - Montserrat & Open Sans
- **TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd digital-menu-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
digital-menu-system/
├── src/
│ ├── components/ # React components
│ │ ├── ui/ # Reusable UI components
│ │ ├── MenuPage.tsx # Main menu interface
│ │ ├── CartInitializer.tsx
│ │ └── ...
│ ├── layouts/
│ │ └── Layout.astro # Main layout template
│ ├── lib/
│ │ ├── menu-data.ts # Menu items database
│ │ ├── cart-store.ts # Zustand cart store
│ │ └── utils.ts # Utility functions
│ ├── pages/
│ │ ├── index.astro # Homepage
│ │ └── api/ # API endpoints
│ │ ├── menu.json.ts
│ │ ├── menu/[category].json.ts
│ │ └── orders.json.ts
│ └── styles/
│ └── globals.css # Global styles
├── public/ # Static assets
│ └── \*.png # Menu item images
├── astro.config.mjs # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json
\`\`\`

## 🔌 API Endpoints

### Menu Endpoints

- `GET /api/menu.json` - Fetch all menu items
- `GET /api/menu/[category].json` - Fetch items by category

### Order Endpoints

- `POST /api/orders.json` - Submit new order

### Example API Response

\`\`\`json
{
"success": true,
"data": [
{
"id": "burger-001",
"name": "Classic Beef Burger",
"category": "Burgers",
"price": 12.99,
"description": "Juicy beef patty with fresh lettuce...",
"image": "/classic-beef-burger.png",
"popular": true,
"customizable": true,
"sizes": [
{ "name": "Regular", "price": 0 },
{ "name": "Large", "price": 2.00 }
],
"addons": [
{ "name": "Extra Cheese", "price": 1.50 },
{ "name": "Bacon", "price": 2.00 }
]
}
]
}
\`\`\`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 🍔 Menu Categories

1. **Burgers** (15 items) - Classic to gourmet burgers
2. **Pizza** (12 items) - Traditional and specialty pizzas
3. **Chicken** (10 items) - Fried, grilled, and specialty chicken
4. **Seafood** (8 items) - Fresh fish and seafood dishes
5. **Pasta** (8 items) - Italian classics and modern twists
6. **Salads** (8 items) - Fresh and healthy options
7. **Sandwiches** (10 items) - Deli-style and gourmet sandwiches
8. **Breakfast** (8 items) - Morning favorites
9. **Desserts** (8 items) - Sweet treats and indulgences
10. **Beverages** (10 items) - Hot and cold drinks
11. **Sides** (8 items) - Perfect accompaniments
12. **Healthy** (6 items) - Nutritious and diet-friendly options

## 🎨 Design System

### Colors

- **Primary**: Cyan-600 (#0891b2)
- **Accent**: Indigo-500 (#6366f1)
- **Neutrals**: White, Gray-100 to Gray-900

### Typography

- **Headings**: Montserrat (Black, Bold, SemiBold)
- **Body**: Open Sans (Regular, Medium)

### Components

- Consistent spacing using Tailwind's spacing scale
- Rounded corners (rounded-lg, rounded-xl)
- Subtle shadows and hover effects
- Mobile-first responsive breakpoints

## 🔧 Customization

### Adding New Menu Items

Edit `src/lib/menu-data.ts` and add items to the appropriate category:

\`\`\`typescript
{
id: "unique-id",
name: "Item Name",
category: "Category",
price: 9.99,
description: "Delicious description",
image: "/item-image.png",
popular: false,
customizable: true,
sizes: [...],
addons: [...]
}
\`\`\`

### Modifying Styles

- Global styles: `src/styles/globals.css`
- Component styles: Individual component files
- Theme colors: `tailwind.config.mjs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from McDonald's and KFC digital kiosks
- UI components from shadcn/ui
- Icons from Lucide React
- Images from Unsplash and custom generation

---

**Built with ❤️ using Astro, React, and TailwindCSS**
