import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TableSelectionPage } from './pages/TableSelectionPage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { PaymentPage } from './pages/PaymentPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { KitchenLayout } from './kitchen/components/Layout';
import { KitchenOrdersPage } from './kitchen/pages/OrdersPage';
import { AdminLayout } from './admin/components/Layout';
import { AdminDashboard } from './admin/pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-primary-bg">
        <Routes>
          {/* Table selection page */}
          <Route path="/" element={<TableSelectionPage />} />
          
          {/* Main customer routes */}
          <Route path="/table/:tableId" element={<MenuPage />} />
          <Route path="/cart/:tableId" element={<CartPage />} />
          <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />

          {/* Kitchen routes */}
          <Route path="/kitchen" element={<KitchenLayout />}>
            <Route index element={<Navigate to="/kitchen/orders" replace />} />
            <Route path="orders" element={<KitchenOrdersPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
