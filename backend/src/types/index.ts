export enum USER_ROLES {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  ADMIN = 'admin',
  KITCHEN_STAFF = 'kitchen_staff'
}

export interface User {
  id: string;
  email: string;
  role: USER_ROLES;
  fullName: string;
}

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

export interface TableInfo {
  id: string;
  number: string;
  restaurantId: string;
  seatingCapacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  menu_item_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  table_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  created_at: string;
  special_instructions?: string;
  total_amount: number;
  order_items?: OrderItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
}

export interface Feedback {
  id: string;
  order_id: string;
  rating: number;
  comments?: string;
  created_at: string;
}
