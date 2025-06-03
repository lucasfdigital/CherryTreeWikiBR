/*
  # Wiki Schema Setup

  1. New Tables
    - `roles` - User roles (admin, editor, user)
    - `pages` - Wiki pages content
    - `categories` - Wiki categories
    - `page_history` - Page revision history

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Roles enum
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user');

-- User roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles
      WHERE roles.user_id = auth.uid()
      AND roles.role = 'admin'
    )
  );

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view pages"
  ON pages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and editors can manage pages"
  ON pages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles
      WHERE roles.user_id = auth.uid()
      AND roles.role IN ('admin', 'editor')
    )
  );

-- Page history table
CREATE TABLE IF NOT EXISTS page_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE page_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view history"
  ON page_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roles
      WHERE roles.user_id = auth.uid()
      AND roles.role = 'admin'
    )
  );

-- Insert initial admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'authenticated',
  'authenticated',
  'admin@cherrytree.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Assign admin role
INSERT INTO roles (user_id, role) VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin');

-- Insert test user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'authenticated',
  'authenticated',
  'test@cherrytree.com',
  crypt('test123', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Assign user role
INSERT INTO roles (user_id, role) VALUES 
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'user');