import { create } from 'zustand';
import { CartItem, MenuItem, Restaurant, Table, Order, User } from '../types';

interface AppState {
  // Table & Restaurant
  currentTable: Table | null;
  currentRestaurant: Restaurant | null;
  
  // Cart
  cart: CartItem[];
  
  // Orders
  currentOrder: Order | null;
  
  // User
  user: User | null;
  
  // Actions
  setCurrentTable: (table: Table) => void;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  addToCart: (menuItem: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrentOrder: (order: Order) => void;
  setUser: (user: User) => void;
  
  // Computed values
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  currentTable: null,
  currentRestaurant: null,
  cart: [],
  currentOrder: null,
  user: null,
  
  setCurrentTable: (table) => set({ currentTable: table }),
  
  setCurrentRestaurant: (restaurant) => set({ currentRestaurant: restaurant }),
  
  addToCart: (menuItem, quantity = 1) => {
    const existingItem = get().cart.find(item => item.menuItem.id === menuItem.id);
    
    if (existingItem) {
      set({
        cart: get().cart.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({
        cart: [...get().cart, {
          id: `${menuItem.id}_${Date.now()}`,
          menuItem,
          quantity
        }]
      });
    }
  },
  
  removeFromCart: (itemId) => {
    set({
      cart: get().cart.filter(item => item.id !== itemId)
    });
  },
  
  updateCartItemQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    
    set({
      cart: get().cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    });
  },
  
  clearCart: () => set({ cart: [] }),
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  
  setUser: (user) => set({ user }),
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  },
  
  getCartItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
})); 