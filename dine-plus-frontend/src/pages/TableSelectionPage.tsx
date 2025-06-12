import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle } from 'lucide-react';
import { restaurantTables, getAvailableTables, getTablesByCapacity } from '../data/tableData';
import { mockRestaurant } from '../data/mockData';

export const TableSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);

  const handleTableSelect = (tableId: string) => {
    setSelectedTableId(tableId);
  };

  const handleContinue = () => {
    if (selectedTableId) {
      navigate(`/table/${selectedTableId.replace('table_', '')}`);
    }
  };

  const availableTables = getAvailableTables();
  const suitableTables = partySize > 1 ? getTablesByCapacity(partySize) : availableTables;

  return (
    <div className="min-h-screen bg-primary-bg text-white">
      {/* Header */}
      <div className="bg-primary-card p-4 sticky top-0 z-10">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">{mockRestaurant.name}</h1>
          <p className="text-text-secondary mt-2">{mockRestaurant.address}</p>
        </div>

        {/* Party Size Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            <Users className="inline mr-2" size={16} />
            Party Size
          </label>
          <select
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="w-full bg-primary-bg text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
              <option key={size} value={size}>
                {size} {size === 1 ? 'Person' : 'People'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Grid */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Select Your Table</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {suitableTables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableSelect(table.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedTableId === table.id
                  ? 'border-primary-accent bg-primary-accent/10'
                  : 'border-gray-600 bg-primary-card hover:border-primary-accent/50'
              }`}
            >
              {selectedTableId === table.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="text-primary-accent" size={20} />
                </div>
              )}
              
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  Table {table.number}
                </div>
                <div className="text-sm text-text-secondary mb-2">
                  Seats {table.seatingCapacity}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  table.status === 'available' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {table.status === 'available' ? 'Available' : 'Occupied'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {suitableTables.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">
              No tables available for {partySize} {partySize === 1 ? 'person' : 'people'}
            </p>
            <p className="text-sm text-text-secondary">
              Please select a different party size or try again later
            </p>
          </div>
        )}

        {/* Continue Button */}
        {selectedTableId && (
          <div className="fixed bottom-4 left-4 right-4">
            <button
              onClick={handleContinue}
              className="w-full bg-primary-accent text-black py-4 rounded-lg font-bold text-lg hover:bg-green-400 transition-colors"
            >
              Continue to Menu
            </button>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="p-4 mt-8">
        <div className="bg-primary-card rounded-lg p-4">
          <h3 className="font-semibold mb-2">Restaurant Information</h3>
          <div className="text-sm text-text-secondary space-y-1">
            <p>📍 {mockRestaurant.address}</p>
            <p>⭐ {mockRestaurant.rating} ({mockRestaurant.totalReviews} reviews)</p>
            <p>🕒 Open: 11:00 AM - 11:00 PM</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 