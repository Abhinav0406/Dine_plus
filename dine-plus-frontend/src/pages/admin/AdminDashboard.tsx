import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Feedback {
  id: number;
  comment: string;
}

interface Order {
  id: number;
  details: string;
}

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, yearly: 0 });

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase.from('feedback').select('*');
      if (error) {
        console.error('Error fetching feedback:', error);
      } else {
        setFeedback(data);
      }
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    const fetchRevenue = async () => {
      const { data, error } = await supabase.rpc('calculate_revenue');
      if (error) {
        console.error('Error fetching revenue:', error);
      } else {
        setRevenue(data);
      }
    };

    fetchFeedback();
    fetchOrders();
    fetchRevenue();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Revenue</h2>
        <p>Daily: ${revenue.daily}</p>
        <p>Weekly: ${revenue.weekly}</p>
        <p>Yearly: ${revenue.yearly}</p>
      </section>

      <section>
        <h2>Feedback</h2>
        <ul>
          {feedback.map((item) => (
            <li key={item.id}>{item.comment}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.details}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
