-- Drop existing tables if they exist
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS "UserRole" CASCADE;
DROP TYPE IF EXISTS "ApiKeyType" CASCADE;
DROP TYPE IF EXISTS "ProductType" CASCADE;
DROP TYPE IF EXISTS "ProductCategory" CASCADE;
DROP TYPE IF EXISTS "SubscriptionType" CASCADE;
DROP TYPE IF EXISTS "SubStatus" CASCADE;
DROP TYPE IF EXISTS "OrgState" CASCADE;

-- Create enums
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');
CREATE TYPE "ApiKeyType" AS ENUM ('OPENAI', 'SUPABASE', 'OTHER');
CREATE TYPE "ProductType" AS ENUM ('VALUEFLOWS', 'TEAM_OF_EXPERTS');
CREATE TYPE "ProductCategory" AS ENUM ('SALES', 'ONBOARDING', 'COLLECTIONS', 'OPERATIONS', 'NEGOTIATION', 'EXPERT_SALES');
CREATE TYPE "SubscriptionType" AS ENUM ('NONE', 'FREE', 'BASIC', 'PRO', 'ENTERPRISE');
CREATE TYPE "SubStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED');
CREATE TYPE "OrgState" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED');

-- Create organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  state "OrgState" NOT NULL DEFAULT 'PENDING',
  subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role "UserRole" NOT NULL DEFAULT 'USER',
  organization_id UUID NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create api_keys table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type "ApiKeyType" NOT NULL,
  openai_key TEXT,
  supabase_url TEXT,
  supabase_key TEXT,
  supabase_secret TEXT,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT api_key_type_check CHECK (
    (type = 'OPENAI' AND openai_key IS NOT NULL AND supabase_url IS NULL AND supabase_key IS NULL AND supabase_secret IS NULL) OR
    (type = 'SUPABASE' AND openai_key IS NULL AND supabase_url IS NOT NULL AND supabase_key IS NOT NULL)
  )
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type "ProductType" NOT NULL,
  category "ProductCategory" NOT NULL,
  price FLOAT NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type "SubscriptionType" NOT NULL DEFAULT 'NONE',
  status "SubStatus" NOT NULL DEFAULT 'ACTIVE',
  organization_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access in development"
ON organizations FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access in development"
ON users FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access in development"
ON api_keys FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access in development"
ON products FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access in development"
ON subscriptions FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at
    BEFORE UPDATE ON api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON organizations TO anon;
GRANT ALL ON users TO anon;
GRANT ALL ON products TO anon;
GRANT ALL ON api_keys TO anon;
GRANT ALL ON subscriptions TO anon;

GRANT USAGE ON SCHEMA public TO anon; 