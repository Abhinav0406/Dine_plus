export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isAvailable: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  image: string;
  address: string;
}

export interface Table {
  id: string;
  number: string;
  restaurantId: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  subtotal: number;
  tax: number;
  total: number;
  estimatedTime?: number;
  createdAt: Date;
  specialInstructions?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'upi' | 'digital_wallet';
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
} 