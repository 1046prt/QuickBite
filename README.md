# 🍔 Digital Menu & Ordering System

A modern, fully-functional digital menu and ordering system built with Astro and React. Features a comprehensive restaurant experience with 100+ menu items, customizable orders, shopping cart, and complete checkout flow - similar to McDonald's kiosks or Swiggy's ordering interface.

![Digital Menu System](https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop)

## ✨ Features

### 🍽️ Complete Menu System

- **100+ Menu Items** across 12 categories
- **12 Food Categories**: Burgers, Pizza,Pasta, Salads, Sandwiches, Breakfast, Desserts, Beverages, Sides, and Healthy Options
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

- **Framework**: [Astro](https://astro.build/)                          # Modern static site generator
- **Frontend**: [React](https://reactjs.org/)                           # Component library
- **Styling**: [TailwindCSS](https://tailwindcss.com/)                  # Utility-first CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)    # Lightweight state management
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)                # Reusable component library
- **Icons**: [Lucide React](https://lucide.dev/)                        # Beautiful icons
- **Fonts**: [Google Fonts](https://fonts.google.com/)                  # Montserrat & Open Sans
- **TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd digital-menu-system
   ```

2. **Install dependencies**

    ```bash
    npm install
    or
    yarn install
    ```

3. **Start development server**

    ```bash
    npm run dev
    or
    yarn dev
    ```

4. **Open your browser**

    ```bash
    Navigate to `http://localhost:4321`
    ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure of QickBite

```bash
├── 📁 .git/
├── 📁 .next/
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 menu/
│   │   │   ├── 📁 [category]
│   │   └── 📁 orders/
├── 📁 components/
│   ├── 📁 ui/
├── 📁 hooks/
├── 📁 lib/
├── 📁 node_modules/
├── 📁 public/
├── 📁 styles/
│   └── 🎨 globals.css
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 components.json
├── 📄 next-env.d.ts
├── 📄 next.config.mjs
├── 📄 package-lock.json
├── 📄 package.json
├── ⚙️ pnpm-lock.yaml
├── 📄 postcss.config.mjs
└── 📄 tsconfig.json
```

## 🔌 API Endpoints

### Menu Endpoints

- `GET /api/menu.json`              # Fetch all menu items
- `GET /api/menu/[category].json`   # Fetch items by category

### Order Endpoints

- `POST/api/orders.json`            # Submit new order

## 🎯 Available Scripts

- `npm run dev`                     # Start development server
- `npm run build`                   # Build for production
- `npm run preview`                 # Preview production build
- `npm run astro`                   # Run Astro CLI commands

## 🔧 Customization

### Adding New Menu Items

```bash
Edit `src/lib/menu-data.ts` and add items to the appropriate category:
```

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

## Acknowledgments

- Design inspiration from McDonald's and KFC digital kiosks
- UI components from shadcn/ui
- Icons from Lucide React
- Images from Unsplash and custom generation

---
