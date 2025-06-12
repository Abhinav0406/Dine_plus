import { supabase } from '../supabase';
import type { User } from '../../types';

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('role, full_name')
      .eq('id', user.id)
      .single();

    if (error || !userData) return null;

    return {
      id: user.id,
      email: user.email,
      role: userData.role || 'user',
      fullName: userData.full_name || ''
    };
  },

  async isStaffOrAdmin() {
    const user = await this.getCurrentUser();
    return user?.role === 'staff' || user?.role === 'admin';
  },

  async isKitchenStaff() {
    const user = await this.getCurrentUser();
    return user?.role === 'kitchen_staff';
  }
};
