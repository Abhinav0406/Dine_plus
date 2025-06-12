import React from 'react';
import { useParams } from 'react-router-dom';

export const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="min-h-screen bg-primary-bg text-white p-4">
      <h1 className="text-xl font-bold mb-4">Order Status</h1>
      <p>Order ID: {orderId}</p>
      <p>Coming soon...</p>
    </div>
  );
}; 