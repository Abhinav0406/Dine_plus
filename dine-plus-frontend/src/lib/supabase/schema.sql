-- Create tables for DINE+ application

-- Enable RLS
alter default privileges revoke execute on functions from public;

-- Users table for staff/admin
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text not null check (role in ('admin', 'staff', 'kitchen')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tables in restaurant
create table public.tables (
  id uuid default uuid_generate_v4() primary key,
  number text not null unique,
  status text not null check (status in ('available', 'occupied', 'reserved')) default 'available',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Menu categories
create table public.menu_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Menu items
create table public.menu_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal not null,
  image_url text,
  category_id uuid references public.menu_categories(id) on delete set null,
  is_veg boolean default false,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  table_id uuid references public.tables(id) not null,
  status text not null check (status in ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')) default 'pending',
  total_amount decimal not null,
  payment_status text not null check (payment_status in ('pending', 'completed', 'failed')) default 'pending',
  special_instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  menu_item_id uuid references public.menu_items(id) on delete restrict not null,
  quantity integer not null check (quantity > 0),
  item_price decimal not null,
  special_instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Feedback
create table public.feedback (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.tables enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.feedback enable row level security;

-- Create policies
create policy "Users can view their own data" on users for select using (auth.uid() = id);
create policy "Admin can view all users" on users for select using (auth.role() = 'admin');

create policy "Anyone can view menu items" on menu_items for select using (true);
create policy "Staff can manage menu items" on menu_items for all using (auth.role() in ('admin', 'staff'));

-- Table policies
create policy "Anyone can view tables" on tables for select using (true);
create policy "Staff can manage tables" on tables for all using (auth.role() in ('admin', 'staff'));

-- Menu categories policies
create policy "Anyone can view menu categories" on menu_categories for select using (true);
create policy "Staff can manage menu categories" on menu_categories for all using (auth.role() in ('admin', 'staff'));

-- Orders policies
create policy "Customers can view their table orders" on orders for select using (true);
create policy "Customers can create orders" on orders for insert with check (true);
create policy "Staff can manage orders" on orders for all using (auth.role() in ('admin', 'staff', 'kitchen'));

-- Order items policies
create policy "Anyone can view order items" on order_items for select using (true);
create policy "Customers can create order items" on order_items for insert with check (true);
create policy "Staff can manage order items" on order_items for all using (auth.role() in ('admin', 'staff', 'kitchen'));

-- Feedback policies
create policy "Anyone can submit feedback" on feedback for insert with check (true);
create policy "Anyone can view feedback" on feedback for select using (true);
create policy "Staff can manage feedback" on feedback for all using (auth.role() in ('admin', 'staff'));
