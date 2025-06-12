import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  tableNumber: string;
  status: string;
}

interface FeedbackItem {
  itemName: string;
  rating: number;
  comment: string;
}

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedback, setFeedback] = useState<{ [key: string]: FeedbackItem }>({});
  const [overallRating, setOverallRating] = useState<number>(0);
  const [overallComment, setOverallComment] = useState<string>('');

  useEffect(() => {
    const orderIds = searchParams.get('orders')?.split(',') || [];
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    
    const relevantOrders = orderIds
      .map(id => allOrders[id])
      .filter((order): order is Order => order != null);

    setOrders(relevantOrders);

    // Initialize feedback state for all unique items
    const uniqueItems = new Set<string>();
    relevantOrders.forEach((order: Order) => {
      order.items.forEach((item: OrderItem) => uniqueItems.add(item.name));
    });

    const initialFeedback: { [key: string]: FeedbackItem } = {};
    uniqueItems.forEach((itemName: string) => {
      initialFeedback[itemName] = {
        itemName,
        rating: 0,
        comment: ''
      };
    });
    setFeedback(initialFeedback);
  }, [searchParams]);

  const handleItemRating = (itemName: string, rating: number) => {
    setFeedback(prev => ({
      ...prev,
      [itemName]: { ...prev[itemName], rating }
    }));
  };

  const handleItemComment = (itemName: string, comment: string) => {
    setFeedback(prev => ({
      ...prev,
      [itemName]: { ...prev[itemName], comment }
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      items: feedback,
      overall: {
        rating: overallRating,
        comment: overallComment
      }
    });
    
    navigate('/thank-you');
  };

  const renderStars = (rating: number, onRate: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="bg-[#1E1E1E] p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Feedback</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Overall Experience */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Overall Experience</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-gray-400">How would you rate your overall experience?</p>
              {renderStars(overallRating, setOverallRating)}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">
                Any additional comments?
              </label>
              <textarea
                value={overallComment}
                onChange={(e) => setOverallComment(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Share your thoughts..."
              />
            </div>
          </div>
        </div>

        {/* Item Feedback */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-lg">Rate Your Items</h3>
          <div className="space-y-6">
            {Object.values(feedback).map((item) => (
              <div key={item.itemName} className="pb-4 border-b border-[#333333] last:border-0">
                <h4 className="font-medium mb-2">{item.itemName}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Rating</p>
                    {renderStars(item.rating, (rating) => handleItemRating(item.itemName, rating))}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={item.comment}
                      onChange={(e) => handleItemComment(item.itemName, e.target.value)}
                      placeholder="Any comments about this item? (optional)"
                      className="w-full bg-[#2A2A2A] text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 px-6 rounded-lg font-bold text-lg bg-green-500 hover:bg-green-600 text-black shadow-lg transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};