import { PostgrestError } from '@supabase/supabase-js';

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: PostgrestError) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const handleSupabaseError = (error: PostgrestError) => {
  console.error('Supabase error:', error);
  throw new DatabaseError(error.message, error);
};

export const handleError = (error: unknown) => {
  console.error('Unexpected error:', error);
  throw new DatabaseError('An unexpected error occurred');
};
