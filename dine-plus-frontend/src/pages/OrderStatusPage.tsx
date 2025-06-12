import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Utensils, Bell, CreditCard } from 'lucide-react';
import './OrderStatusPage.css';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  items: OrderItem[];
  total: number;
  estimatedTime: number;
  tableNumber: string;
  specialInstructions?: string;
  placedAt: Date;
}

export const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchOrderDetails = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const orderData = orders[orderId || ''];
        
        if (orderData) {
          // Convert placedAt string back to Date object
          orderData.placedAt = new Date(orderData.placedAt);
          setOrder(currentOrder => {
            // Only update if the status has changed
            if (!currentOrder || currentOrder.status !== orderData.status) {
              return orderData;
            }
            return currentOrder;
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails(); // Initial fetch

    // Poll for updates every 5 seconds
    interval = setInterval(fetchOrderDetails, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [orderId]);

  // Simulate status updates
  useEffect(() => {
    if (!order) return;

    const statusProgression = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    let currentIndex = statusProgression.indexOf(order.status);

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setOrder(prev => prev ? { 
          ...prev, 
          status: statusProgression[currentIndex] as OrderDetails['status']
        } : null);
      } else {
        clearInterval(interval);
      }
    }, 10000); // Update status every 10 seconds

    return () => clearInterval(interval);
  }, [order]);

  const getStatusIcon = (status: string) => {
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
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Received';
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Being Prepared';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusColor = (status: string, isActive: boolean) => {
    if (!isActive) return 'text-gray-400';
    
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'confirmed':
        return 'text-blue-500';
      case 'preparing':
        return 'text-orange-500';
      case 'ready':
        return 'text-green-500';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const handleGoBack = () => {
    navigate('/table-selection');
  };

  if (loading) {
    return (
      <div className="order-status-page min-h-screen bg-primary-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-status-page min-h-screen bg-primary-bg text-white">
        <div className="bg-primary-card p-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={handleGoBack} className="p-2">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Order Status</h1>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-red-400 mb-4">Order not found</p>
          <button
            onClick={handleGoBack}
            className="bg-primary-accent text-black px-6 py-3 rounded-lg font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-[#1E1E1E] p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={handleGoBack} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Order Status</h1>
            <p className="text-sm text-gray-400">Order #{order.id.slice(-8)}</p>
          </div>
          <button
            onClick={() => navigate(`/table/${order.tableNumber}`)}
            className="ml-auto bg-[#2A2A2A] hover:bg-[#333333] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Menu
          </button>
        </div>
        
        {/* Current Status Card */}
        <div className="bg-[#2A2A2A] rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon(order.status)}
            <span className="font-semibold text-lg">{getStatusText(order.status)}</span>
          </div>
          {order.status === 'preparing' && (
            <p className="text-sm text-gray-300">
              Estimated time: {order.estimatedTime} minutes
            </p>
          )}
          {order.status === 'ready' && (
            <p className="text-sm text-green-400 font-medium">
              Your order is ready! Please collect from Table {order.tableNumber}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Status Progress */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-6 text-lg">Order Progress</h3>
          <div className="space-y-6">
            {statusSteps.map((status, index) => (
              <div key={status} className="flex items-center gap-4 relative">
                <div className={`w-4 h-4 rounded-full ${
                  index <= currentStatusIndex 
                    ? 'bg-green-400' 
                    : 'bg-[#333333]'
                } flex items-center justify-center`}>
                  {index <= currentStatusIndex && (
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  )}
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`absolute h-12 w-0.5 left-2 top-4 ${
                    index < currentStatusIndex ? 'bg-green-400' : 'bg-[#333333]'
                  }`}></div>
                )}
                <span className={`flex-1 ${
                  index <= currentStatusIndex 
                    ? 'text-white' 
                    : 'text-gray-500'
                }`}>
                  {getStatusText(status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Order Details</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-[#333333] last:border-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-400 text-sm">x{item.quantity}</span>
                </div>
                <span className="text-green-400">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            {order.specialInstructions && (
              <div className="pt-4 mt-4 border-t border-[#333333]">
                <p className="text-sm text-gray-400">Special Instructions:</p>
                <p className="text-sm mt-1">{order.specialInstructions}</p>
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t border-[#333333]">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-green-400">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Order Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Table Number:</span>
              <span>{order.tableNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Time:</span>
              <span>{order.placedAt.toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order ID:</span>
              <span>{order.id.slice(-8)}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={() => navigate(`/payment/${order.id}`)}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard size={20} />
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};