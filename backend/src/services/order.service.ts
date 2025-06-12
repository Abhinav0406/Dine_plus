import { supabase } from '../lib/supabase';
import { handleSupabaseError, handleError } from '../lib/error';
import type { Order, OrderItem, TableInfo } from '../types';

export const orderService = {
  async createOrder(tableId: string, items: OrderItem[], specialInstructions?: string): Promise<Order> {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          table_id: tableId,
          status: 'pending',
          special_instructions: specialInstructions,
          total_amount: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })
        .select()
        .single();

      if (orderError) handleSupabaseError(orderError);

      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) handleSupabaseError(itemsError);

      return order;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  async getOrdersByStatus(status: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(\`
        id,
        status,
        created_at,
        table_id,
        special_instructions,
        order_items (
          id,
          menu_item_id,
          quantity,
          price
        )
      \`)
      .eq('status', status)
      .order('created_at', { ascending: true });

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) handleSupabaseError(error);
  },

  subscribeToNewOrders(callback: (order: Order) => void) {
    return supabase
      .channel('orders')
      .on('INSERT', { event: '*', schema: 'public', table: 'orders' }, 
        (payload) => callback(payload.new as Order)
      )
      .subscribe();
  },

  subscribeToOrderUpdates(callback: (order: Order) => void) {
    return supabase
      .channel('order_updates')
      .on('UPDATE', { event: '*', schema: 'public', table: 'orders' },
        (payload) => callback(payload.new as Order)
      )
      .subscribe();
  },

  subscribeToTableUpdates(callback: (table: TableInfo) => void) {
    return supabase
      .channel('table_updates')
      .on('UPDATE', { event: '*', schema: 'public', table: 'tables' },
        (payload) => callback(payload.new as TableInfo)
      )
      .subscribe();
  }
};
