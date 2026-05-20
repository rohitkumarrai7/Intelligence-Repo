-- ============================================
-- Intelligence Repo - Supabase Setup Script
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('PROMPT', 'WORKFLOW', 'VOICE_AGENT', 'BUNDLE')),
  category TEXT NOT NULL,
  niche TEXT,
  price INTEGER NOT NULL,
  compare_price INTEGER,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  featured BOOLEAN DEFAULT false,
  thumbnail TEXT,
  tags TEXT[] DEFAULT '{}',
  downloads INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- WORKFLOW DETAILS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS workflow_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE UNIQUE,
  n8n_json_url TEXT,
  diagram_image TEXT,
  apps_integrated TEXT[] DEFAULT '{}',
  setup_time TEXT,
  step_by_step_guide TEXT,
  video_tutorial_url TEXT,
  prerequisites TEXT,
  model_compatibility TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'INTERMEDIATE' CHECK (difficulty IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED'))
);

-- ============================================
-- VOICE AGENT DETAILS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS voice_agent_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE UNIQUE,
  demo_audio_urls TEXT[] DEFAULT '{}',
  retell_config_url TEXT,
  system_prompt_script TEXT,
  n8n_integration_url TEXT,
  setup_guide_pdf_url TEXT,
  handles TEXT[] DEFAULT '{}',
  case_study TEXT,
  before_after_stats JSONB DEFAULT '{}'
);

-- ============================================
-- BUNDLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE UNIQUE,
  included_product_ids UUID[] DEFAULT '{}',
  savings_amount INTEGER
);

-- ============================================
-- USERS TABLE (synced from Clerk)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'EDITOR', 'ADMIN')),
  polar_customer_id TEXT,
  subscription_tier TEXT,
  subscription_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES users(id),
  email TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'REFUNDED', 'CANCELLED')),
  polar_checkout_id TEXT,
  polar_subscription_id TEXT,
  coupon_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_type TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price_at_purchase INTEGER NOT NULL
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- NICHE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS niches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT
);

-- ============================================
-- COUPONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
  discount_value INTEGER NOT NULL,
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRED', 'DISABLED'))
);

-- ============================================
-- STORAGE - BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('workflows', 'workflows', true),
  ('images', 'images', true),
  ('audio', 'audio', true),
  ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE - POLICIES
-- ============================================

-- Public read access for all buckets
CREATE POLICY "Public Read workflows" ON storage.objects FOR SELECT USING (bucket_id = 'workflows');
CREATE POLICY "Public Read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Public Read audio" ON storage.objects FOR SELECT USING (bucket_id = 'audio');
CREATE POLICY "Public Read documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');

-- Public upload for authenticated users
CREATE POLICY "Auth Upload workflows" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'workflows');
CREATE POLICY "Auth Upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Auth Upload audio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'audio');
CREATE POLICY "Auth Upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents');

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_agent_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE niches ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Products: Public read
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (status = 'PUBLISHED');

-- Users: Users can read own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id);

-- Orders: Users can view own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid()::text = user_id);

-- Order Items: Through orders
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()::text)
);

-- Reviews: Public read
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

-- Workflow/Voice Agent details: Public read if product is published
CREATE POLICY "Workflow details viewable if product published" ON workflow_details FOR SELECT USING (
  EXISTS (SELECT 1 FROM products WHERE products.id = workflow_details.product_id AND products.status = 'PUBLISHED')
);

CREATE POLICY "Voice agent details viewable if product published" ON voice_agent_details FOR SELECT USING (
  EXISTS (SELECT 1 FROM products WHERE products.id = voice_agent_details.product_id AND products.status = 'PUBLISHED')
);

-- Categories and niches: Public read
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Niches are viewable by everyone" ON niches FOR SELECT USING (true);

-- Coupons: Public read for active coupons
CREATE POLICY "Active coupons are viewable by everyone" ON coupons FOR SELECT USING (status = 'ACTIVE');

-- ============================================
-- SEED DATA
-- ============================================

-- Insert categories
INSERT INTO categories (name, slug, type, icon, description, sort_order) VALUES
  ('Voice Agents', 'voice-agents', 'VOICE_AGENT', 'phone', 'AI voice agents for various industries', 1),
  ('Workflows', 'workflows', 'WORKFLOW', 'workflow', 'n8n automation workflows', 2),
  ('AI Prompts', 'ai-prompts', 'PROMPT', 'sparkles', 'AI prompt templates', 3),
  ('Bundles', 'bundles', 'BUNDLE', 'package', 'Product bundles', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert niches
INSERT INTO niches (name, slug, icon, description) VALUES
  ('Plumbing', 'plumbing', 'wrench', 'Plumbing services and contractors'),
  ('Dental', 'dental', 'heart', 'Dental clinics and practices'),
  ('Real Estate', 'real-estate', 'home', 'Real estate and property management'),
  ('Restaurant', 'restaurant', 'utensils', 'Restaurants and food services'),
  ('HVAC', 'hvac', 'thermometer', 'HVAC installation and repair'),
  ('Cleaning', 'cleaning', 'sparkles', 'Cleaning services'),
  ('Fitness', 'fitness', 'dumbbell', 'Fitness coaches and gyms'),
  ('Marketing', 'marketing', 'megaphone', 'Marketing agencies'),
  ('Business', 'business', 'briefcase', 'Business operations'),
  ('Support', 'support', 'headphones', 'Customer support'),
  ('HR', 'hr', 'users', 'Human resources'),
  ('General', 'general', 'globe', 'General purpose')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TRIGGER FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();