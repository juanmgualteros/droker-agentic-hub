-- Insert test organizations
INSERT INTO organizations (name, state) VALUES
('Test Organization 1', 'ACTIVE'::\"OrgState\"),
('Test Organization 2', 'ACTIVE'::\"OrgState\"),
('Test Organization 3', 'PENDING'::\"OrgState\");

-- Insert test users
INSERT INTO users (email, name, role, organization_id)
SELECT 
    'test@example.com',
    'Test User',
    'SUPERADMIN'::\"UserRole\",
    id
FROM organizations
WHERE name = 'Test Organization 1'
LIMIT 1;

-- Insert test API keys
INSERT INTO api_keys (name, type, organization_id, openai_key)
SELECT 
    'OpenAI API Key 1',
    'OPENAI'::\"ApiKeyType\",
    id,
    'sk-test-123456789'
FROM organizations
WHERE name = 'Test Organization 1'
LIMIT 1;

INSERT INTO api_keys (name, type, organization_id, supabase_url, supabase_key)
SELECT 
    'Supabase API Key 1',
    'SUPABASE'::\"ApiKeyType\",
    id,
    'https://test-project.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test-key'
FROM organizations
WHERE name = 'Test Organization 1'
LIMIT 1;

-- Insert test subscription
INSERT INTO subscriptions (type, status, organization_id)
SELECT 
    'PRO'::\"SubscriptionType\",
    'ACTIVE'::\"SubStatus\",
    id
FROM organizations
WHERE name = 'Test Organization 1'
LIMIT 1; 