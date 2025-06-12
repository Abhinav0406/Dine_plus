import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Utensils, Bell, Filter, Search, Calendar } from 'lucide-react';
import { orderTrackingService } from '../../lib/orderTrackingService';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  total: number;
  specialInstructions?: string;
  placedAt: string;
}

interface OrderFilter {
  search: string;
  dateRange: 'today' | 'yesterday' | 'week' | 'all';
  specialInstructions: boolean;
}

export const KitchenOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [filter, setFilter] = useState<OrderFilter>({
    search: '',
    dateRange: 'today',
    specialInstructions: false
  });
  const [showNotification, setShowNotification] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState(0);

  // Load initial orders
  useEffect(() => {
    loadOrders();
    
    // Set up polling for new orders
    const interval = setInterval(checkNewOrders, 10000); // Check every 10 seconds
    
    // Add real-time event listener for immediate order notifications
    const handleNewOrder = (event: CustomEvent) => {
      const { order, tableNumber } = event.detail;
      setNewOrderCount(prev => prev + 1);
      setShowNotification(true);
      console.log(`New order received for table ${tableNumber}:`, order);
      loadOrders(); // Immediately refresh orders
    };
    
    window.addEventListener('newOrder', handleNewOrder as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('newOrder', handleNewOrder as EventListener);
    };
  }, []);

  const loadOrders = () => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const ordersList = Object.values(allOrders) as Order[];
    setOrders(ordersList);
    setNewOrderCount(0); // Reset notification counter
  };

  const checkNewOrders = () => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const newOrders = Object.values(allOrders) as Order[];
    const currentOrderIds = orders.map(o => o.id);
    const newOrdersCount = newOrders.filter(
      order => !currentOrderIds.includes(order.id) && order.status === 'pending'
    ).length;

    if (newOrdersCount > 0) {
      setNewOrderCount(newOrdersCount);
      setShowNotification(true);
      
      // Enhanced notification - show order details
      const newOrderDetails = newOrders.filter(
        order => !currentOrderIds.includes(order.id) && order.status === 'pending'
      );
      
      // Create a more detailed notification
      if (newOrderDetails.length > 0) {
        const tableNumbers = newOrderDetails.map(order => order.tableNumber).join(', ');
        console.log(`New orders received for tables: ${tableNumbers}`);
      }
      
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Auto-refresh orders
      loadOrders();
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'confirmed':
        return <CheckCircle className="text-blue-500" size={20} />;
      case 'preparing':
        return <Utensils className="text-orange-500" size={20} />;
      case 'ready':
        return <Bell className="text-green-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-600" size={20} />;
    }
  };
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    if (allOrders[orderId]) {
      const order = allOrders[orderId];
      const oldStatus = order.status;
      order.status = newStatus;
      
      // Add a timestamp for analytics
      if (!order.statusHistory) {
        order.statusHistory = [];
      }
      order.statusHistory.push({
        status: newStatus,
        timestamp: new Date().toISOString()
      });

      // For analytics, store in a separate orders history
      const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]');
      const existingOrderIndex = ordersHistory.findIndex((o: any) => o.id === orderId);
      if (existingOrderIndex >= 0) {
        ordersHistory[existingOrderIndex] = { ...order };
      } else {
        ordersHistory.push({ ...order });
      }
      localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory));

      // Update the current orders
      localStorage.setItem('orders', JSON.stringify(allOrders));
      
      // Record status update with tracking service
      orderTrackingService.updateOrderStatus(orderId, oldStatus, newStatus, order.tableNumber);
      
      // Update local state
      setOrders(Object.values(allOrders));
    }
  };

  const getFilteredOrders = () => {
    let filtered = [...orders];

    // Apply date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    filtered = filtered.filter(order => {
      const orderDate = new Date(order.placedAt);
      switch (filter.dateRange) {
        case 'today':
          return orderDate >= today;
        case 'yesterday':
          return orderDate >= yesterday && orderDate < today;
        case 'week':
          return orderDate >= weekAgo;
        default:
          return true;
      }
    });

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchLower) ||
        order.tableNumber.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.name.toLowerCase().includes(searchLower))
      );
    }

    // Apply special instructions filter
    if (filter.specialInstructions) {
      filtered = filtered.filter(order => order.specialInstructions);
    }

    // Apply tab filter
    switch (activeTab) {
      case 'pending':
        return filtered.filter(order => ['pending', 'confirmed'].includes(order.status));
      case 'in-progress':
        return filtered.filter(order => order.status === 'preparing');
      case 'completed':
        return filtered.filter(order => ['ready', 'delivered'].includes(order.status));
      default:
        return filtered;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
          <Bell size={20} />
          <div>
            <p className="font-medium">New Orders!</p>
            <p className="text-sm">{newOrderCount} new order(s) received</p>
          </div>
          <button 
            onClick={() => {
              setShowNotification(false);
              loadOrders();
            }}
            className="ml-4 hover:text-green-200"
          >
            View Orders
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1E1E1E] p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Kitchen Orders</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-[#1E1E1E] border-b border-[#333333] p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <select
              value={filter.dateRange}
              onChange={(e) => setFilter(prev => ({ ...prev, dateRange: e.target.value as OrderFilter['dateRange'] }))}
              className="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 days</option>
              <option value="all">All time</option>
            </select>
          </div>

          {/* Special Instructions Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filter.specialInstructions}
              onChange={(e) => setFilter(prev => ({ ...prev, specialInstructions: e.target.checked }))}
              className="form-checkbox h-4 w-4 text-green-500 rounded bg-[#2A2A2A]"
            />
            <span className="text-sm">Special Instructions Only</span>
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#333333] px-4">
        {(['pending', 'in-progress', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-6 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            {tab === 'pending' && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {orders.filter(order => ['pending', 'confirmed'].includes(order.status)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredOrders().map((order) => (
          <div key={order.id} className="bg-[#1E1E1E] rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Table {order.tableNumber}</h3>
                <p className="text-sm text-gray-400">Order #{order.id.slice(-8)}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="text-sm font-medium capitalize">{order.status}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{item.name} x{item.quantity}</span>
                </div>
              ))}
            </div>

            {order.specialInstructions && (
              <div className="mb-4 p-2 bg-[#2A2A2A] rounded">
                <p className="text-sm text-yellow-400">Special Instructions:</p>
                <p className="text-sm">{order.specialInstructions}</p>
              </div>
            )}

            {/* Status Update Buttons */}
            <div className="flex gap-2 mt-4">
              {order.status === 'pending' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Confirm Order
                </button>
              )}
              {order.status === 'confirmed' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                  className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="flex-1 bg-green-500 text-black py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Mark as Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
