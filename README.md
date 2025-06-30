# Dine Plus

Dine Plus is a modern, full-stack restaurant management and food ordering platform designed to streamline restaurant operations and enhance the dining experience for both customers and staff.

## Overview
Dine Plus provides an end-to-end solution for restaurants, including menu management, order processing, kitchen coordination, and customer engagement. The platform is built with a robust backend (Node.js/TypeScript) and a responsive frontend (React/TypeScript), making it scalable and easy to use.

## Key Features
- **Digital Menu:** Interactive, visually rich menu for customers to browse and order from.
- **Order Management:** Real-time order placement, tracking, and status updates for both customers and kitchen staff.
- **Admin Dashboard:** Tools for restaurant managers to add/edit menu items, manage tables, and monitor orders.
- **Kitchen Display:** Dedicated kitchen interface for chefs to view and update order statuses.
- **Authentication:** Secure login and role-based access for admins, staff, and customers.
- **Analytics:** Insights into sales, popular dishes, and operational efficiency (optional/extendable).

## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, TypeScript, Express.js
- **Database:** (e.g., PostgreSQL, Supabase)
- **Deployment:** Vercel

## How It Works
1. **Customers** can view the digital menu, place orders, and track their order status in real time.
2. **Kitchen staff** receive orders instantly and update their status as they are prepared and completed.
3. **Admins** manage menu items, tables, and monitor all restaurant activity from a central dashboard.

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v7 or higher)

### Installation

1. **Clone the repository**

2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../dine-plus-frontend
   npm install
   ```

## Running the Project

### Backend
```sh
cd backend
npm run dev
```

### Frontend
```sh
cd dine-plus-frontend
npm start
```

## Folder Details
- **backend/**: API, database, and business logic
- **dine-plus-frontend/**: User interface for customers and admins
- **docs_to_follow/**: Additional documentation (menu, table, etc.)

## Deployment
- The project includes a `vercel.json` for deployment on Vercel.

## License
MIT
