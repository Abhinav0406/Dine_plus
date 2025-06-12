import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TableSelectionPage } from './pages/TableSelectionPage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { PaymentPage } from './pages/PaymentPage';
import { FeedbackPage } from './pages/FeedbackPage';
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
          <Route path="/feedback/:orderId" element={<FeedbackPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
