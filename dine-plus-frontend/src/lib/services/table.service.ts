import { supabase } from '../supabase';
import { handleSupabaseError } from '../error';
import type { TableInfo } from '../../types';

export const tableService = {
  async getAllTables(): Promise<TableInfo[]> {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .order('number');

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async getAvailableTables(): Promise<TableInfo[]> {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .eq('status', 'available')
      .order('number');

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async getTablesByCapacity(minCapacity: number): Promise<TableInfo[]> {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .gte('seating_capacity', minCapacity)
      .order('number');

    if (error) handleSupabaseError(error);
    return data || [];
  },

  async updateTableStatus(tableId: string, status: 'available' | 'occupied' | 'reserved'): Promise<void> {
    const { error } = await supabase
      .from('tables')
      .update({ status })
      .eq('id', tableId);

    if (error) handleSupabaseError(error);
  },

  subscribeToTableUpdates(callback: (table: TableInfo) => void) {
    return supabase
      .channel('table_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tables' },
        (payload: any) => callback(payload.new as TableInfo)
      )
      .subscribe();
  }
};
