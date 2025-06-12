-- Enable Row Level Security
ALTER TABLE auth.users FORCE ROW LEVEL SECURITY;

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('customer', 'staff', 'admin', 'kitchen_staff');

-- Create enum for order status
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'served', 'completed', 'cancelled');

-- Create enum for table status
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved');

-- Create users table with profile info
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'customer',
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create restaurants table
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tables table
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  seating_capacity INTEGER NOT NULL,
  status table_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(restaurant_id, number)
);

-- Create menu_items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  is_veg BOOLEAN NOT NULL DEFAULT true,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID REFERENCES tables(id) ON DELETE CASCADE,
  status order_status NOT NULL DEFAULT 'pending',
  special_instructions TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies

-- Users table policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Staff and admin can view all profiles"
  ON users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('staff', 'admin')
  ));

-- Tables table policies
CREATE POLICY "Anyone can view tables"
  ON tables FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only staff and admin can modify tables"
  ON tables FOR ALL
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('staff', 'admin')
  ));

-- Menu items policies
CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only staff and admin can modify menu items"
  ON menu_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('staff', 'admin')
  ));

-- Orders policies
CREATE POLICY "Customers can view their table's orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM tables
    WHERE tables.id = table_id
  ));

CREATE POLICY "Staff and admin can view all orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('staff', 'admin', 'kitchen_staff')
  ));

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Staff and admin can modify orders"
  ON orders FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('staff', 'admin', 'kitchen_staff')
  ));

-- Order items policies
CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Feedback policies
CREATE POLICY "Anyone can create feedback"
  ON feedback FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Anyone can view feedback"
  ON feedback FOR SELECT
  TO PUBLIC
  USING (true);

-- Create function to calculate revenue
CREATE OR REPLACE FUNCTION calculate_revenue()
RETURNS TABLE (
  total_revenue DECIMAL,
  order_count BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(total_amount), 0) as total_revenue,
    COUNT(*) as order_count
  FROM orders
  WHERE status = 'completed'
  AND created_at >= NOW() - INTERVAL '24 hours';
END;
$$;
