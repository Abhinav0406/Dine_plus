import { supabase } from '../lib/supabase';
import { USER_ROLES } from '../constants';

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

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('role, full_name')
      .eq('id', user.id)
      .single();

    if (error || !userData) return null;

    return {
      id: user.id,
      email: user.email,
      role: userData.role,
      fullName: userData.full_name
    };
  },

  async isStaffOrAdmin() {
    const user = await this.getCurrentUser();
    return user?.role === USER_ROLES.STAFF || user?.role === USER_ROLES.ADMIN;
  },

  async isKitchenStaff() {
    const user = await this.getCurrentUser();
    return user?.role === USER_ROLES.KITCHEN_STAFF;
  }
};
