# DINE+ Restaurant Management System

## Purpose
DINE+ is a modern, full-stack restaurant management system designed to streamline restaurant operations, enhance customer experience, and provide real-time analytics for administrators. It supports digital menu browsing, order placement, kitchen order tracking, and payment analytics, all in a seamless web application.

## Overview
DINE+ enables restaurants to digitize their menu and table management, allowing customers to:
- Browse a rich, categorized menu (see `menu.md` for the full catalog)
- Place orders directly from their table
- Track order status in real time
- Make payments using multiple methods (UPI, card, wallet, etc.)

Meanwhile, the kitchen staff receives instant notifications for new orders, can update order statuses, and the admin dashboard provides:
- Real-time analytics on orders, revenue, and payment methods
- Insights into popular menu items and peak hours
- Conversion rates and average order values

The system is designed for scalability and ease of use, with a focus on both customer and staff experience.

## Table Layout
The system supports flexible table arrangements. Example (see `table.md`):
```
table-1 seating-6
table-2 seating-6
...
table-24 seating-6
```

## Key Features
- Digital menu with categories and images
- Customer order placement and tracking
- Real-time kitchen order dashboard
- Admin analytics dashboard (orders, revenue, payment methods)
- Multiple payment methods
- Event-driven architecture for instant updates

## Dependencies
Main dependencies (see `package.json` for full list):
- React 19
- Zustand (state management)
- React Router DOM
- Supabase (backend integration)
- Lucide React (icons)
- Tailwind CSS (styling)

## Installation
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure
- `src/` - Main frontend source code
- `docs_to_follow/menu.md` - Full menu catalog
- `docs_to_follow/table.md` - Table layout

## License
This project is for educational and demonstration purposes. 