import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockRestaurant, mockMenuItems, menuCategories } from '../data/mockData';
import { MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const navigate = useNavigate();
  const { 
    currentRestaurant, 
    setCurrentRestaurant, 
    cart, 
    addToCart, 
    getCartTotal, 
    getCartItemCount 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(mockMenuItems);

  useEffect(() => {
    // Set restaurant data when component mounts
    setCurrentRestaurant(mockRestaurant);
  }, [setCurrentRestaurant]);

  useEffect(() => {
    // Filter menu items based on search and category
    let filtered = mockMenuItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (menuItem: MenuItem) => {
    addToCart(menuItem);
  };

  const handleGoToCart = () => {
    navigate(`/cart/${tableId}`);
  };

  if (!currentRestaurant) {
    return <div className="min-h-screen bg-primary-bg flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-primary-bg text-white">
      {/* Header */}
      <div className="bg-primary-card p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{currentRestaurant.name}</h1>
            {currentRestaurant.rating && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-text-secondary">
                  {currentRestaurant.rating}
                </span>
              </div>
            )}
          </div>
        </div>        {/* Banner Image */}
        <div className="mb-4">
          <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/images/banner-placeholder.jpg" 
              alt="Restaurant Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRiNTY2MyI+QmFubmVyIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
              }}
            />
          </div>
        </div>

        {/* Table Number */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-primary-bg p-3 rounded-lg">
            <span>Table Number</span>
            <div className="flex items-center gap-2">
              <span>{tableId}</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search for dishes"
            className="w-full bg-primary-bg text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary-accent text-black'
                  : 'bg-primary-bg text-text-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-primary-card rounded-lg p-4 flex gap-4 ${
                index < 3 ? 'border border-primary-accent/20' : ''
              }`}
            >
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{item.name}</h4>
                <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-accent">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary-accent text-black px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1 hover:bg-green-400 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="w-20 h-20 bg-gray-600 rounded-lg flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0QTRBIi8+CjxwYXRoIGQ9Ik0zNSA0MEg2NVY2MEgzNVY0MFoiIGZpbGw9IiM2QTZBNkEiLz4KPC9zdmc+';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleGoToCart}
            className="bg-primary-accent text-black p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-400 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="font-semibold">{getCartItemCount()}</span>
          </button>
        </div>
      )}
    </div>
  );
}; 