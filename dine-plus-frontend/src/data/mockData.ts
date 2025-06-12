import { MenuItem, Restaurant, PaymentMethod } from '../types';
import { restaurantMenuItems, menuCategories } from './menuData';

export const mockRestaurant: Restaurant = {
  id: 'rest_1',
  name: 'Dine Plus Restaurant',
  rating: 4.6,
  totalReviews: 285,
  image: '/api/placeholder/400/200',
  address: '123 Fine Dining Street, Food District, Mumbai'
};

// Export the complete menu from menuData
export const mockMenuItems: MenuItem[] = restaurantMenuItems;

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    type: 'credit_card',
    name: 'Credit Card',
    icon: '💳'
  },
  {
    id: 'upi',
    type: 'upi',
    name: 'UPI',
    icon: '📱'
  },
  {
    id: 'digital_wallet',
    type: 'digital_wallet',
    name: 'Digital Wallets',
    icon: '💰'
  }
];

// Export menu categories from menuData
export { menuCategories }; 