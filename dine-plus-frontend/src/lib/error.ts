import { PostgrestError } from '@supabase/supabase-js';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public originalError?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleSupabaseError = (error: PostgrestError | null): never => {
  if (!error) throw new ApiError('Unknown error occurred');

  // Handle specific error codes
  switch (error.code) {
    case '42501':
      throw new ApiError('You do not have permission to perform this action', 403);
    case '23505':
      throw new ApiError('This record already exists', 409);
    case '23503':
      throw new ApiError('Referenced record does not exist', 404);
    default:
      throw new ApiError(error.message, 500, error);
  }
};

export const handleError = (error: any): ApiError => {
  if (error instanceof ApiError) return error;
  
  console.error('Unhandled error:', error);
  return new ApiError(
    'An unexpected error occurred. Please try again later.',
    500,
    error
  );
};
