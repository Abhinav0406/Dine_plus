import { supabase } from './supabase';
import { handleSupabaseError, handleError } from './error';
import { MenuItem, Table, Order, Feedback } from '../types';

// Menu Items
export const menuService = {
  async getAllItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true);
    
    if (error) handleSupabaseError(error);
    return data;
  },

  async getItemsByCategory(category: string) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('is_available', true);
    
    if (error) handleSupabaseError(error);
    return data;
  },

  async updateItemAvailability(itemId: string, isAvailable: boolean) {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: isAvailable })
      .eq('id', itemId);
    if (error) throw error;
  }
};

// Orders
export const orderService = {
  async createOrder(tableId: string, items: any[], specialInstructions?: string) {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          table_id: tableId,
          special_instructions: specialInstructions,
          total_amount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        })
        .select()
        .single();

      if (orderError) handleSupabaseError(orderError);

      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        item_price: item.price,
        special_instructions: item.specialInstructions
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) handleSupabaseError(itemsError);

      return order;
    } catch (error) {
      throw handleError(error);
    }
  },

  async getOrdersByTable(tableId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_items (*)
        )
      `)
      .eq('table_id', tableId);
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    if (error) throw error;
  },

  subscribeToTableOrders(tableId: string, callback: (payload: any) => void) {
    return supabase
      .channel('table_orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `table_id=eq.${tableId}`
        },
        callback
      )
      .subscribe();
  },

  subscribeToKitchenOrders(callback: (payload: any) => void) {
    return supabase
      .channel('kitchen_orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `status=in.(pending,confirmed,preparing)`
        },
        callback
      )
      .subscribe();
  },

  subscribeToOrderItems(orderId: string, callback: (payload: any) => void) {
    return supabase
      .channel('order_items')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'order_items',
          filter: `order_id=eq.${orderId}`
        },
        callback
      )
      .subscribe();
  }
};

// Tables
export const tableService = {
  async getAllTables() {
    const { data, error } = await supabase
      .from('tables')
      .select('*');
    if (error) throw error;
    return data;
  },

  async updateTableStatus(tableId: string, status: string) {
    const { error } = await supabase
      .from('tables')
      .update({ status })
      .eq('id', tableId);
    if (error) throw error;
  }
};

// Feedback
export const feedbackService = {
  async submitFeedback(orderId: string, rating: number, comment: string) {
    const { error } = await supabase
      .from('feedback')
      .insert({
        order_id: orderId,
        rating,
        comment
      });
    if (error) throw error;
  },

  async getFeedbackByOrder(orderId: string) {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('order_id', orderId);
    if (error) throw error;
    return data;
  }
};
