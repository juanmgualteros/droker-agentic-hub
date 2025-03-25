-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON "organizations";
DROP POLICY IF EXISTS "Enable read access for all users" ON "api_keys";
DROP POLICY IF EXISTS "Enable read access for all users" ON "products";
DROP POLICY IF EXISTS "Enable read access for all users" ON "subscriptions";
DROP POLICY IF EXISTS "Enable read access for all users" ON "users";
DROP POLICY IF EXISTS "Enable read access for all users" ON "api_key_to_product";

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON "public"."users";
DROP POLICY IF EXISTS "Users can update their own data" ON "public"."users";
DROP POLICY IF EXISTS "Users can view their organization's data" ON "public"."organizations";
DROP POLICY IF EXISTS "Users can update their organization's data" ON "public"."organizations";
DROP POLICY IF EXISTS "Users can view their organization's products" ON "public"."products";
DROP POLICY IF EXISTS "Users can update their organization's products" ON "public"."products";

-- Create policies for superadmin access
CREATE POLICY "Enable full access for superadmin" ON "organizations"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

CREATE POLICY "Enable full access for superadmin" ON "api_keys"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

CREATE POLICY "Enable full access for superadmin" ON "products"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

CREATE POLICY "Enable full access for superadmin" ON "subscriptions"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

CREATE POLICY "Enable full access for superadmin" ON "users"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

CREATE POLICY "Enable full access for superadmin" ON "api_key_to_product"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.clerk_id = auth.uid() 
            AND users.role = 'SUPERADMIN'
        )
    );

-- Create new policies
CREATE POLICY "Users can view their own data" ON "public"."users"
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  id = auth.uid()
);

CREATE POLICY "Users can update their own data" ON "public"."users"
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  id = auth.uid()
);

CREATE POLICY "Users can view their organization's data" ON "public"."organizations"
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  id IN (
    SELECT organization_id
    FROM users
    WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can update their organization's data" ON "public"."organizations"
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  id IN (
    SELECT organization_id
    FROM users
    WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can view their organization's products" ON "public"."products"
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  organization_id IN (
    SELECT organization_id
    FROM users
    WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can update their organization's products" ON "public"."products"
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  organization_id IN (
    SELECT organization_id
    FROM users
    WHERE id = auth.uid()
  )
);

-- Create a superadmin user if it doesn't exist
INSERT INTO users (id, email, name, role, organization_id, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    'admin@droker.com',
    'Admin',
    'SUPERADMIN',
    (SELECT id FROM organizations LIMIT 1),
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE role = 'SUPERADMIN'
); 