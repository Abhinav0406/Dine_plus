import React, { useState, useEffect } from 'react';
import { BarChart, Users, DollarSign, Clock, Star, ChevronRight, TrendingUp, Calendar } from 'lucide-react';

interface OrderStats {
  total: number;
  completed: number;
  paid: number;
  averageTime: number;
  revenue: number;
  paidRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  paymentMethodStats: {
    method: string;
    count: number;
    revenue: number;
  }[];
  itemStats: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  hourlyStats: {
    hour: number;
    orders: number;
    revenue: number;
  }[];
}

interface AnalyticCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');
  const [orderStats, setOrderStats] = useState<OrderStats>({
    total: 0,
    completed: 0,
    paid: 0,
    averageTime: 0,
    revenue: 0,
    paidRevenue: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    paymentMethodStats: [],
    itemStats: [],
    hourlyStats: []
  });

  useEffect(() => {
    calculateStats();
  }, [dateRange]);

  const calculateStats = () => {
    const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]');
    
    // Filter orders based on date range
    const now = new Date();
    const startDate = new Date();
    switch (dateRange) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate.setHours(0, 0, 0, 0);
    }

    const filteredOrders = ordersHistory.filter((order: any) => 
      new Date(order.placedAt) >= startDate && new Date(order.placedAt) <= now
    );

    // Calculate basic stats
    const completed = filteredOrders.filter((order: any) => 
      order.status === 'ready' || order.status === 'delivered'
    );

    // Calculate average preparation time
    const avgTime = completed.reduce((acc: number, order: any) => {
      if (order.statusHistory && order.statusHistory.length >= 2) {
        const start = new Date(order.statusHistory[0].timestamp);
        const end = new Date(order.statusHistory[order.statusHistory.length - 1].timestamp);
        return acc + (end.getTime() - start.getTime()) / (1000 * 60);
      }
      return acc;
    }, 0) / (completed.length || 1);

    // Calculate item statistics
    const itemStats = calculateItemStats(filteredOrders);
    
    // Calculate hourly statistics
    const hourlyStats = calculateHourlyStats(filteredOrders);

    setOrderStats({
      total: filteredOrders.length,
      completed: completed.length,
      paid: completed.filter((order: any) => order.status === 'delivered').length,
      averageTime: Math.round(avgTime),
      revenue: filteredOrders.reduce((acc: number, order: any) => acc + order.total, 0),
      paidRevenue: completed.reduce((acc: number, order: any) => acc + order.total, 0),
      conversionRate: (completed.length > 0 ? (completed.filter((order: any) => order.status === 'delivered').length / completed.length) * 100 : 0),
      averageOrderValue: (completed.length > 0 ? (completed.reduce((acc: number, order: any) => acc + order.total, 0) / completed.length) : 0),
      paymentMethodStats: calculatePaymentMethodStats(filteredOrders),
      itemStats,
      hourlyStats
    });
  };

  const calculateItemStats = (orders: any[]) => {
    const itemMap = new Map<string, { quantity: number; revenue: number }>();
    
    orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        const existing = itemMap.get(item.name) || { quantity: 0, revenue: 0 };
        itemMap.set(item.name, {
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + (item.price * item.quantity)
        });
      });
    });

    return Array.from(itemMap.entries())
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const calculateHourlyStats = (orders: any[]) => {
    const hourlyMap = new Map<number, { orders: number; revenue: number }>();
    
    // Initialize all hours
    for (let i = 0; i < 24; i++) {
      hourlyMap.set(i, { orders: 0, revenue: 0 });
    }

    orders.forEach((order: any) => {
      const hour = new Date(order.placedAt).getHours();
      const current = hourlyMap.get(hour)!;
      hourlyMap.set(hour, {
        orders: current.orders + 1,
        revenue: current.revenue + order.total
      });
    });

    return Array.from(hourlyMap.entries())
      .map(([hour, stats]) => ({ hour, ...stats }))
      .sort((a, b) => a.hour - b.hour);
  };

  const calculatePaymentMethodStats = (orders: any[]) => {
    const paymentMethodMap = new Map<string, { count: number; revenue: number }>();
    
    orders.forEach((order: any) => {
      if (order.paymentMethod) {
        const existing = paymentMethodMap.get(order.paymentMethod) || { count: 0, revenue: 0 };
        paymentMethodMap.set(order.paymentMethod, {
          count: existing.count + 1,
          revenue: existing.revenue + order.total
        });
      }
    });

    return Array.from(paymentMethodMap.entries())
      .map(([method, stats]) => ({ method, ...stats }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const analyticCards: AnalyticCard[] = [
    {
      title: "Today's Orders",
      value: orderStats.total,
      change: 5.4,
      icon: <Clock className="text-blue-500" size={24} />,
    },
    {
      title: "Paid Orders",
      value: orderStats.paid,
      change: 2.1,
      icon: <DollarSign className="text-green-500" size={24} />,
    },
    {
      title: "Conversion Rate",
      value: `${orderStats.conversionRate.toFixed(1)}%`,
      change: 1.2,
      icon: <TrendingUp className="text-purple-500" size={24} />,
    },
    {
      title: "Total Revenue",
      value: `₹${orderStats.paidRevenue.toFixed(2)}`,
      change: 8.2,
      icon: <DollarSign className="text-green-500" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header with Date Range Selector */}
      <div className="bg-[#1E1E1E] p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as 'today' | 'week' | 'month')}
            className="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticCards.map((card, index) => (
          <div key={index} className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              {card.icon}
            </div>
            <div className={`mt-4 text-sm ${card.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
              <span className="text-gray-400 ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Top Selling Items</h2>
          <div className="space-y-4">
            {orderStats.itemStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.quantity} orders</p>
                </div>
                <div className="text-green-500">
                  ₹{item.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Analytics */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Payment Methods</h2>
          <div className="space-y-4">
            {orderStats.paymentMethodStats.map((method, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium capitalize">{method.method}</h3>
                  <p className="text-sm text-gray-400">{method.count} transactions</p>
                </div>
                <div className="text-green-500">
                  ₹{method.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Hourly Order Distribution</h2>
          <div className="h-64 relative">
            {orderStats.hourlyStats.map((stat, index) => {
              const maxOrders = Math.max(...orderStats.hourlyStats.map(s => s.orders));
              const height = (stat.orders / maxOrders) * 100;
              return (
                <div
                  key={index}
                  className="absolute bottom-0 bg-green-500 rounded-t"
                  style={{
                    left: `${(index / 24) * 100}%`,
                    width: `${100 / 24}%`,
                    height: `${height}%`,
                    opacity: stat.orders > 0 ? 0.7 : 0.2
                  }}
                  title={`${stat.hour}:00 - ${stat.orders} orders`}
                />
              );
            })}
            <div className="absolute bottom-0 w-full h-px bg-gray-600" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>
    </div>
  );
};
