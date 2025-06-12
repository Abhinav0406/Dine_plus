import { MenuItem, Restaurant, PaymentMethod } from '../types';
import { restaurantMenuItems, menuCategories } from './menuData';

export const mockRestaurant: Restaurant = {
  id: 'rest_1',
  name: 'DINE+',
  image: '/images/ch.webp',
  address: '123 Main Street, City',
  rating: 4.5,
  totalReviews: 128
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