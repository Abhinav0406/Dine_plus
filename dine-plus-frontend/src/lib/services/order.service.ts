import { supabase } from '../supabase';
import { handleSupabaseError } from '../error';
import type { Order, OrderItem } from '../../types';

export const orderService = {
  async createOrder(tableId: string, items: OrderItem[], specialInstructions?: string): Promise<Order> {
    const { data, error: orderError } = await supabase
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
      order_id: data.id,
      item_name: item.item,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) handleSupabaseError(itemsError);

    return data;
  },

  async getOrdersByTable(tableId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_item:menu_items (*)
        )
      `)
      .eq('table_id', tableId)
      .order('created_at', { ascending: false });

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_item:menu_items (*)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) handleSupabaseError(error);
    return data;
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) handleSupabaseError(error);
  },

  async submitFeedback(orderId: string, rating: number, comments?: string): Promise<void> {
    const { error } = await supabase
      .from('feedback')
      .insert({
        order_id: orderId,
        rating,
        comments
      });

    if (error) handleSupabaseError(error);
  },

  subscribeToOrderUpdates(callback: (order: Order) => void) {
    return supabase
      .channel('order_status')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' },
        (payload: any) => callback(payload.new as Order)
      )
      .subscribe();
  }
};
