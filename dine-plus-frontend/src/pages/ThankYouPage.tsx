import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Heart className="text-black" size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-400 mb-8">
          Thanks for dining with us. We appreciate your feedback and hope to serve you again soon!
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg w-full flex items-center justify-center gap-2 transition-colors"
        >
          Visit Again <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
