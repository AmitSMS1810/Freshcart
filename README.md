# 🛒 FreshKart - Grocery E-Commerce App

A full-featured grocery delivery app built with React + Vite + Tailwind CSS.

## Features
- 🔍 Live search across 30+ products
- 📂 8 categories with filter sidebar
- 💰 Price range & sort filters
- 🛒 Cart with quantity controls & free delivery logic
- 🔐 Login / Sign Up with form validation
- 📦 Orders page
- 📱 Fully responsive (mobile + desktop)
- 🔔 Toast notifications

## Setup & Run

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Start dev server
```bash
npm run dev
```

### Step 3 — Open in browser
Visit: http://localhost:5173

## Project Structure
```
src/
├── components/
│   ├── Navbar.jsx       # Top navigation with search & cart
│   ├── Sidebar.jsx      # Category, price & sort filters
│   ├── ProductCard.jsx  # Individual product card
│   ├── CartModal.jsx    # Slide-in cart drawer
│   └── AuthModal.jsx    # Login / Signup modal
├── context/
│   ├── AuthContext.jsx  # User auth state
│   └── CartContext.jsx  # Cart state management
├── pages/
│   ├── Home.jsx         # Product listing page
│   └── Orders.jsx       # Order history page
├── data/
│   └── products.js      # 30 products + 8 categories
├── App.jsx              # Routes + providers
├── main.jsx             # Entry point
└── index.css            # Tailwind + custom styles
```

## Tech Stack
- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **React Router v6** — Client-side routing
- **React Hot Toast** — Notifications
- **Lucide React** — Icons
# Freshcart
