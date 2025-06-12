import { supabase } from '../supabase';
import { handleSupabaseError } from '../error';
import type { MenuItem } from '../../types';

export const menuService = {
  async getAllItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category');

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async getItemById(id: string): Promise<MenuItem | null> {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error);
    return data;
  },

  async getItemsByCategory(category: string): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('is_available', true)
      .order('name');

    if (error) handleSupabaseError(error);
    return data || [];
  }
};
