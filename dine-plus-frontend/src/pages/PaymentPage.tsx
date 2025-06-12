import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode, Wallet } from 'lucide-react';
import { orderTrackingService } from '../lib/orderTrackingService';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  total: number;
  specialInstructions?: string;
  placedAt: string;
  status: string;
  paymentStatus?: string;
  paymentMethod?: string;
  paidAt?: string;
  statusHistory?: { status: string; timestamp: string; paymentMethod: string }[];
}

export const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} /> },
    { id: 'upi', name: 'UPI', icon: <QrCode size={24} /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet size={24} /> },
  ];

  useEffect(() => {
    // Fetch all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const currentOrder = allOrders[orderId || ''];
    
    if (currentOrder) {
      // Get all orders for the same table that haven't been paid
      const tableOrders = Object.values<Order>(allOrders).filter((order: Order) => 
        order.tableNumber === currentOrder.tableNumber &&
        order.status !== 'paid'
      );
      setOrders(tableOrders);
    }
  }, [orderId]);

  const getTotalAmount = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getAllItems = () => {
    // Combine and merge similar items across all orders
    const itemMap = new Map<string, { name: string; quantity: number; price: number }>();
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = itemMap.get(item.name);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          itemMap.set(item.name, { ...item });
        }
      });
    });

    return Array.from(itemMap.values());
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    // Mark all orders as paid in localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const currentTime = new Date().toISOString();
    
    orders.forEach(order => {
      if (allOrders[order.id]) {
        // Update order status and add payment details
        allOrders[order.id].status = 'paid';
        allOrders[order.id].paymentStatus = 'completed';
        allOrders[order.id].paymentMethod = selectedMethod;
        allOrders[order.id].paidAt = currentTime;
        
        // Add payment status to status history for analytics
        if (!allOrders[order.id].statusHistory) {
          allOrders[order.id].statusHistory = [];
        }
        allOrders[order.id].statusHistory.push({
          status: 'paid',
          timestamp: currentTime,
          paymentMethod: selectedMethod
        });
      }
    });
    localStorage.setItem('orders', JSON.stringify(allOrders));

    // Enhanced analytics recording
    const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]');
    const paidOrdersAnalytics = JSON.parse(localStorage.getItem('paidOrdersAnalytics') || '[]');
    
    orders.forEach(order => {
      const enhancedOrder = {
        ...allOrders[order.id],
        // Analytics specific fields
        completedAt: currentTime,
        totalRevenue: order.total,
        paymentMethod: selectedMethod,
        orderDuration: new Date(currentTime).getTime() - new Date(order.placedAt).getTime(),
        tableNumber: order.tableNumber,
        itemCount: order.items.reduce((count, item) => count + item.quantity, 0)
      };
      
      // Update orders history
      const existingOrderIndex = ordersHistory.findIndex((o: any) => o.id === order.id);
      if (existingOrderIndex >= 0) {
        ordersHistory[existingOrderIndex] = enhancedOrder;
      } else {
        ordersHistory.push(enhancedOrder);
      }
      
      // Add to paid orders analytics for detailed payment tracking
      paidOrdersAnalytics.push(enhancedOrder);
    });
    
    localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory));
    localStorage.setItem('paidOrdersAnalytics', JSON.stringify(paidOrdersAnalytics));

    // Record payment events for each order using tracking service
    orders.forEach(order => {
      orderTrackingService.recordPayment(
        order.id,
        selectedMethod,
        order.total,
        order.tableNumber
      );
    });

    // Navigate to feedback page with all order IDs
    const orderIds = orders.map(order => order.id);
    navigate(`/feedback?orders=${orderIds.join(',')}`);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  const tableNumber = orders[0].tableNumber;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-[#1E1E1E] p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Payment</h1>
            <p className="text-sm text-gray-400">Table #{tableNumber}</p>
          </div>
          <button
            onClick={() => navigate(`/table/${tableNumber}`)}
            className="ml-auto bg-[#2A2A2A] hover:bg-[#333333] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Order Summary */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
          <div className="space-y-4">
            {getAllItems().map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-400 ml-2">x{item.quantity}</span>
                </div>
                <span className="text-green-400">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-[#333333]">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-green-400">₹{getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Select Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg flex items-center gap-4 transition-colors ${
                  selectedMethod === method.id
                    ? 'bg-green-500 text-black'
                    : 'bg-[#2A2A2A] hover:bg-[#333333]'
                }`}
              >
                {method.icon}
                <span className="font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-colors ${
            selectedMethod
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed'
          }`}
        >
          Pay Now (₹{getTotalAmount().toFixed(2)})
        </button>
      </div>
    </div>
  );
};