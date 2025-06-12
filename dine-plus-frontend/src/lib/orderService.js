import { supabase } from './supabase';

// Create new order (customer side)
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  if (error) throw error;
  return data[0];
};

// Get active orders for kitchen
export const getKitchenOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .neq('status', 'served')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select();

  if (error) throw error;
  return data[0];
};

// Get order history
export const getOrderHistory = async (limit = 50) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

// Toggle menu item availability
export const toggleMenuAvailability = async (itemId, isAvailable) => {
  const { data, error } = await supabase
    .from('menu_availability')
    .upsert({ 
      item_id: itemId,
      is_available: isAvailable,
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) throw error;
  return data[0];
};

// Calculate revenue
export const calculateRevenue = async () => {
  const { data, error } = await supabase.rpc('calculate_revenue');
  if (error) {
    throw new Error('Error calculating revenue: ' + error.message);
  }
  return data;
};
