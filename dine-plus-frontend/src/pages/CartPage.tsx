import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartPage: React.FC = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const navigate = useNavigate();
  const { 
    currentRestaurant, 
    cart, 
    updateCartItemQuantity, 
    removeFromCart, 
    getCartTotal,
    placeOrder,
    clearCart,
    setCurrentTable
  } = useStore();

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Calculate pricing
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  // Redirect to Order Status Page after placing an order
  const handleCheckout = async () => {
    if (!tableId || cart.length === 0) return;
    
    setIsPlacingOrder(true);
    try {
      // Set the current table in the store
      setCurrentTable(tableId);
      
      // Place the order with special instructions
      const result = await placeOrder(specialInstructions);
      
      if (result.success) {
        // Clear the cart after successful order
        clearCart();
        
        // Navigate to order status page with the new orderId
        navigate(`/order-status/${result.orderId}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleGoBack = () => {
    navigate(`/table/${tableId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-primary-bg text-white">
        <div className="bg-primary-card p-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={handleGoBack} className="p-2">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Your Order</h1>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className="text-text-secondary text-lg mb-4">Your cart is empty</div>
          <button
            onClick={handleGoBack}
            className="bg-primary-accent text-black px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg text-white">
      {/* Header */}
      <div className="bg-primary-card p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={handleGoBack} className="p-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Your Order</h1>
        </div>
        <div className="text-sm text-text-secondary">
          {currentRestaurant?.name}
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <div key={item.menuItem.id} className="bg-primary-card rounded-lg p-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-600 rounded-lg flex-shrink-0">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0QTRBIi8+CjxwYXRoIGQ9Ik0zNSA0MEg2NVY2MEgzNVY0MFoiIGZpbGw9IiM2QTZBNkEiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{item.menuItem.name}</h3>
                      <p className="text-sm text-text-secondary">
                        Quantity: {item.quantity}
                      </p>

                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-accent">
                        ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.menuItem.id, item.quantity - 1)}
                        className="w-8 h-8 bg-primary-bg rounded-full flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.menuItem.id, item.quantity + 1)}
                        className="w-8 h-8 bg-primary-bg rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-primary-card rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Special Instructions
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Add a note (e.g., allergies)"
            className="w-full bg-primary-card text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent resize-none"
            rows={3}
          />
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isPlacingOrder}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
            isPlacingOrder 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-primary-accent text-black hover:bg-green-400'
          }`}
        >
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};