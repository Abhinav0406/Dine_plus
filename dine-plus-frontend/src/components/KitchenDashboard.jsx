import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getKitchenOrders, updateOrderStatus } from '../lib/orderService';

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial orders
    loadOrders();

    // Set up real-time subscription
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
          playNotificationSound();
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prev) => 
            prev.map((order) => 
              order.id === payload.new.id ? payload.new : order
            )
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getKitchenOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.play();
  };

  return (
    <div>
      <h1>Kitchen Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Table: {order.table_id}</p>
              <p>Status: {order.status}</p>
              <button onClick={() => handleStatusUpdate(order.id, 'preparing')}>Start Preparing</button>
              <button onClick={() => handleStatusUpdate(order.id, 'ready')}>Ready for Pickup</button>
              <button onClick={() => handleStatusUpdate(order.id, 'served')}>Mark as Served</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
