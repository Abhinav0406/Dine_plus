import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockPaymentMethods } from '../data/mockData';

export const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { currentRestaurant, getCartTotal } = useStore();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate(`/order-status/${orderId}`);
    }, 1000);
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'credit_card':
        return <CreditCard size={20} />;
      case 'upi':
        return <Smartphone size={20} />;
      case 'digital_wallet':
        return <Wallet size={20} />;
      default:
        return <CreditCard size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg text-white">
      {/* Header */}
      <div className="bg-primary-card p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Payment</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="bg-primary-card rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
              <div>
                <div className="font-medium">{currentRestaurant?.name}</div>
                <div className="text-sm text-text-secondary">2 items</div>
              </div>
            </div>
          </div>
          <div className="bg-primary-card rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
              <div>
                <div className="font-medium">{currentRestaurant?.name}</div>
                <div className="text-sm text-text-secondary">2 items</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            {mockPaymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`w-full bg-primary-card p-4 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedPaymentMethod === method.id 
                    ? 'ring-2 ring-primary-accent' 
                    : 'hover:bg-gray-700'
                }`}
              >
                {getPaymentIcon(method.type)}
                <span>{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        {selectedPaymentMethod === 'credit_card' && (
          <div className="mb-6">
            <h2 className="font-semibold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-primary-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-primary-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-primary-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name on Card</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full bg-primary-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-primary-accent text-black py-4 rounded-lg font-bold text-lg hover:bg-green-400 transition-colors"
        >
          Pay ₹{(total * 83).toFixed(0)} {/* Convert to INR for demo */}
        </button>
      </div>
    </div>
  );
}; 