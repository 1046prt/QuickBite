# 🍔 QuickBite - Modern Food Delivery Platform

A comprehensive, modern food delivery platform built with Next.js and React. Features a complete restaurant experience with 100+ menu items, advanced filtering, responsive design, authentication system, and multiple pages - delivering a premium user experience similar to top food delivery platforms.

![QuickBite Platform](https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop)

## Features

### Complete Menu System

- **100+ Menu Items** across 10 diverse categories
- **10 Food Categories**: Burgers, Sides, Drinks, Desserts, Pizzas, Biryani, Noodles, North Indian, South Indian, Rolls & Momos
- **Rich Product Details** with descriptions, pricing, and high-quality images
- **Advanced Search & Filtering** with price ranges and category filters
- **Popular Items** highlighting with special badges

### Advanced Customization & Features

- **Size Selection** (Small, Medium, Large, Extra Large)
- **Add-ons & Extras** (cheese, bacon, vegetables, sauces, spices)
- **Special Instructions** for dietary preferences and allergies
- **Real-time Price Calculation** as you customize
- **Quantity Management** with intuitive controls
- **Smart Search Bar** with real-time results

### Enhanced Shopping Cart

- **Persistent Cart** with localStorage integration
- **Item Management** (add, remove, modify quantities)
- **Order Summary** with itemized pricing
- **Tax Calculation** and total computation
- **Responsive Cart Sidebar** with smooth animations
- **Empty State Handling** with helpful suggestions

### Authentication System

- **Login/Signup Modal** with modern UI
- **Social Authentication** (Google, Facebook)
- **Password Visibility Toggle**
- **Form Validation** with error handling
- **Responsive Design** for all screen sizes

### Multi-Page Architecture

- **Home/Menu Page** - Main ordering interface
- **About Us Page** - Company story, team, and values
- **FAQ Page** - Comprehensive help section with categories
- **Contact Page** - Multiple contact methods and form
- **Changelog Page** - Feature updates and version history
- **Enhanced 404 Page** - Helpful error page with suggestions

### Modern Design System

- **Native CSS Architecture** - No external CSS frameworks
- **Global CSS Variables** - Consistent theming system
- **Responsive Design** - Mobile-first approach
- **Professional Color Palette** - Orange/red food-focused theme
- **Typography System** - Montserrat + Open Sans combination
- **Smooth Animations** and micro-interactions
- **Accessibility Compliant** (WCAG AA standards)
- **Dark Mode Support** - Complete theme switching

### Component Architecture

- **Reusable Components** - Modular and maintainable
- **Layout Components** - Header, Footer, Navigation
- **Independent CSS Files** - No component dependencies
- **TypeScript Integration** - Full type safety
- **Performance Optimized** - Lazy loading and code splitting

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Frontend**: [React 18](https://reactjs.org/) - Modern React with hooks
- **Styling**: **Native CSS** - Custom CSS architecture with variables
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Fonts**: [Google Fonts](https://fonts.google.com/) - Montserrat & Open Sans
- **TypeScript**: Full type safety throughout the application
- **Build Tool**: [Turbopack](https://turbo.build/) - Fast bundler for development

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quickbite-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   ```bash
   Navigate to `http://localhost:3000`
   ```

### Build for Production

```bash
npm run build
npm run start
```

### Linting & Code Quality

```bash
npm run lint
npm run lint:fix
```

## 📁 Project Structure

```bash
quickbite-platform/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 about/                    # About page
│   ├── 📁 api/                      # API routes
│   │   ├── 📁 menu/                 # Menu data endpoints
│   │   └── 📁 orders/               # Order processing
│   ├── 📁 changelog/                # Changelog page
│   ├── 📁 contact/                  # Contact page
│   ├── 📁 faq/                      # FAQ page
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 not-found.tsx             # 404 page
│   └── 📄 page.tsx                  # Home/Menu page
├── 📁 components/                   # React components
│   ├── 📁 auth/                     # Authentication components
│   │   └── 📄 auth-modal.tsx        # Login/Signup modal
│   ├── 📁 layout/                   # Layout components
│   │   ├── 📄 header.tsx            # Site header
│   │   └── 📄 footer.tsx            # Site footer
│   ├── 📁 ui/                       # UI components
│   ├── 📄 checkout-modal.tsx        # Checkout flow
│   ├── 📄 item-customization-modal.tsx
│   ├── 📄 shopping-cart-sidebar.tsx
│   └── 📄 theme-provider.tsx
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 use-mobile.ts
│   └── 📄 use-toast.ts
├── 📁 lib/                          # Utility libraries
│   ├── 📄 cart-store.ts             # Shopping cart state
│   ├── 📄 menu-data.ts              # Menu data & types
│   └── 📄 utils.ts                  # Utility functions
├── 📁 public/                       # Static assets
│   ├── 📁 burger/                   # Food images
│   ├── 📁 desserts/
│   ├── 📁 drinks/
│   ├── 📁 logo/                     # Brand assets
│   ├── 📁 pizzas/
│   └── 📁 sides/
├── 📁 styles/                       # CSS files
│   ├── 📄 globals.css               # Global styles & variables
│   ├── 📄 components.css            # Component styles
│   ├── 📄 layout.css                # Layout styles
│   ├── 📄 pages.css                 # Page-specific styles
│   ├── 📄 auth.css                  # Authentication styles
│   └── 📄 additional-pages.css      # Additional page styles
├── 📄 components.json               # shadcn/ui config
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 package.json                  # Dependencies
├── 📄 tsconfig.json                 # TypeScript config
└── 📖 README.md                     # Documentation
```

## API Endpoints

### Menu Endpoints

- `GET /api/menu` - Get all menu items and categories
- `GET /api/menu/[category]` - Get items by category

### Order Endpoints

- `POST /api/orders` - Submit new order
- `GET /api/orders/[id]` - Get order status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Customization

### Adding New Menu Items

Edit `lib/menu-data.ts` and add items to the appropriate category:

```typescript
{
  id: "new-item",
  name: "New Delicious Item",
  description: "Amazing description",
  price: 12.99,
  image: "/path/to/image.png",
  category: "burgers",
  popular: true,
  customizations: {
    sizes: [
      { name: "Regular", price: 0 },
      { name: "Large", price: 2.5 }
    ],
    addons: [
      { name: "Extra Cheese", price: 1.5 }
    ]
  }
}
```

### Modifying Styles

- **Global styles**: `styles/globals.css` - CSS variables and base styles
- **Component styles**: `styles/components.css` - Reusable component styles
- **Layout styles**: `styles/layout.css` - Header, footer, navigation
- **Page styles**: `styles/pages.css` - Page-specific styles
- **Theme colors**: Modify CSS variables in `globals.css`

### Adding New Pages

1. Create new page in `app/[page-name]/page.tsx`
2. Add corresponding styles in appropriate CSS file
3. Update navigation in `components/layout/header.tsx`
4. Add to footer links in `components/layout/footer.tsx`

### Customizing Colors

Modify the CSS variables in `styles/globals.css`:

```css
:root {
  --brand-primary: #ff6b35; /* Main brand color */
  --brand-secondary: #f7931e; /* Secondary brand color */
  --brand-accent: #ffd23f; /* Accent color */
  /* ... other variables */
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Key Features Implemented

###  Completed Features

-  **Native CSS Architecture** - No external CSS frameworks
- **Global CSS Variables** - Consistent theming system
-  **Responsive Design** - Mobile-first approach
-  **Search Functionality** - Real-time search with filters
- **Price Filtering** - Filter by price ranges
- **Authentication Modal** - Login/Signup with social options
-  **Multi-page Architecture** - About, FAQ, Contact, Changelog
-  **Enhanced 404 Page** - Helpful error page with suggestions
-  **Footer Component** - Complete footer with links and info
-  **Header Component** - Navigation with search and cart
- **Reusable Components** - Modular and maintainable
-  **TypeScript Integration** - Full type safety
-  **Performance Optimized** - Fast loading and smooth interactions

### Design System

- **Color Palette**: Food-focused orange/red theme
- **Typography**: Montserrat (headings) + Open Sans (body)
- **Spacing**: Consistent spacing scale with CSS variables
- **Border Radius**: Rounded corners for modern look
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## Performance Features

- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Google Fonts with display swap
- **CSS Optimization** - Minimal CSS with variables
- **Bundle Analysis** - Optimized bundle sizes

## Security Features

- **Form Validation** - Client and server-side validation
- **XSS Protection** - Sanitized inputs and outputs
- **CSRF Protection** - Built-in Next.js protection
- **Secure Headers** - Security headers configuration

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Chrome Mobile

Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic HTML elements
- Maintain accessibility standards
- Write descriptive commit messages
- Test on multiple devices and browsers

License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
