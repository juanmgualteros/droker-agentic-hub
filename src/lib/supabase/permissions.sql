-- Enable RLS on the organizations table
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations in development
CREATE POLICY "Allow all operations in development"
ON organizations
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Grant necessary permissions to the anon role
GRANT ALL ON organizations TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant necessary permissions to the authenticated role
GRANT ALL ON organizations TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant necessary permissions to the service_role
GRANT ALL ON organizations TO service_role;
GRANT USAGE ON SCHEMA public TO service_role; 