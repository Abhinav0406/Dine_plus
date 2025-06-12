export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff' | 'kitchen_staff' | 'user';
  fullName: string;
}
