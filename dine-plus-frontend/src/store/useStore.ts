import { create } from 'zustand';
import { menuService, orderService } from '../lib/services';
import { orderTrackingService } from '../lib/orderTrackingService';
import type { CartItem, Restaurant, MenuItem } from '../types';

interface StoreState {
  menuItems: MenuItem[];
  cart: CartItem[];
  currentTable: string | null;
  currentRestaurant: Restaurant | null;
  orders: any[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchMenuItems: () => Promise<void>;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  setCurrentTable: (tableId: string) => void;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  placeOrder: (specialInstructions?: string) => Promise<{ success: boolean, orderId?: string }>;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  menuItems: [],
  cart: [],
  currentTable: null,
  currentRestaurant: null,
  orders: [],
  loading: false,
  error: null,

  fetchMenuItems: async () => {
    set({ loading: true, error: null });
    try {
      const items = await menuService.getAllItems();
      set({ menuItems: items || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch menu items', loading: false });
    }
  },

  addToCart: (item: MenuItem) => {
    set((state) => {
      const existingItem = state.cart.find((i) => i.menuItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { menuItem: item, quantity: 1 }] };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.menuItem.id !== itemId),
    }));
  },

  updateCartItemQuantity: (itemId, quantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  setCurrentTable: (tableId) => {
    set({ currentTable: tableId });
  },

  setCurrentRestaurant: (restaurant) => {
    set({ currentRestaurant: restaurant });
  },

  placeOrder: async (specialInstructions) => {
    const { cart, currentTable } = get();
    if (!currentTable || cart.length === 0) throw new Error('No table selected or cart is empty');

    set({ loading: true, error: null });
    try {
      const orderId = `order_${Date.now()}`;
      const currentTime = new Date().toISOString();
      const order = {
        id: orderId,
        tableId: currentTable,
        items: cart.map(item => ({
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.menuItem.price
        })),
        status: 'pending',
        total: cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0),
        estimatedTime: 25,
        tableNumber: currentTable,
        specialInstructions,
        placedAt: currentTime,
        // Enhanced order tracking for analytics
        statusHistory: [{
          status: 'pending',
          timestamp: currentTime
        }],
        orderCreatedAt: currentTime,
        paymentStatus: 'pending'
      };

      // Store the order in localStorage for persistence
      const orders = JSON.parse(localStorage.getItem('orders') || '{}');
      orders[orderId] = order;
      localStorage.setItem('orders', JSON.stringify(orders));

      // Immediately add to orders history for analytics tracking
      const ordersHistory = JSON.parse(localStorage.getItem('ordersHistory') || '[]');
      ordersHistory.push(order);
      localStorage.setItem('ordersHistory', JSON.stringify(ordersHistory));

      // Use order tracking service for better notifications and analytics
      orderTrackingService.notifyKitchen(orderId, order, currentTable);
      
      set({ loading: false });
      return { success: true, orderId };
    } catch (error) {
      set({ error: 'Failed to place order', loading: false });
      throw error;
    }
  },

  clearCart: () => {
    set({ cart: [] });
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
}));