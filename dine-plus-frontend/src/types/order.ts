import { MenuItem } from './menu';

export interface OrderItem {
  id?: string;
  item: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  specialInstructions?: string;
  customerName?: string;
  createdAt?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
