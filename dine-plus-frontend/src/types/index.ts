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
  menuItem: MenuItem;
  quantity: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image?: string;
  address?: string;
  rating?: number;
  totalReviews?: number;
}

export interface Table {
  id: string;
  number: string;
  restaurantId: string;
  status: 'available' | 'occupied' | 'reserved';
}

export interface TableInfo extends Table {
  seatingCapacity: number;
  isOccupied?: boolean;
}

export interface OrderItem {
  id?: string;
  item: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  specialInstructions?: string;
  createdAt: Date;
}

export interface Feedback {
  id: string;
  orderId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'upi' | 'digital_wallet';
  name: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff' | 'kitchen_staff' | 'user';
  fullName: string;
}