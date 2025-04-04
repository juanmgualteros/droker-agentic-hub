-- Enable RLS on Organization table if not already enabled
ALTER TABLE public."Organization" ENABLE ROW LEVEL SECURITY;

-- Create policy for service_role to allow all operations (SELECT, INSERT, UPDATE, DELETE)
-- Using DO block to check if policy exists first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'Organization' 
    AND policyname = 'service_role_all_operations_organization'
  ) THEN
    CREATE POLICY "service_role_all_operations_organization" 
    ON public."Organization" 
    FOR ALL 
    TO service_role 
    USING (auth.role() = 'service_role');
  END IF;
END
$$;

-- Grant usage on public schema to service role (if needed)
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
