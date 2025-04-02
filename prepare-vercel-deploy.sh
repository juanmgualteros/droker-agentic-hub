#!/bin/bash

echo "Preparing Vercel deployment package..."

# Create deployment directory structure
rm -rf vercel-deploy/*
mkdir -p vercel-deploy

# Copy essential files
cp -r src vercel-deploy/
cp -r public vercel-deploy/
cp -r prisma vercel-deploy/
cp package.json vercel-deploy/
cp package-lock.json vercel-deploy/
cp next.config.js vercel-deploy/
cp vercel.json vercel-deploy/
cp tsconfig.json vercel-deploy/
cp middleware.ts vercel-deploy/
cp tailwind.config.js vercel-deploy/
cp tailwind.config.ts vercel-deploy/
cp postcss.config.js vercel-deploy/

# Create a README with deployment instructions
cat > vercel-deploy/README.md << 'EOL'
# Droker Agentic Hub - Deployment Instructions

This package contains all the necessary files to deploy the Droker Agentic Hub application to Vercel.

## Deployment Steps

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import this directory from your local machine
4. Configure the following environment variables (as listed in the original README.md):
   - DATABASE_URL
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - JWT_SECRET
   - COOKIE_NAME
5. Click "Deploy"

## Post-Deployment

After deployment, you may need to:
1. Run database migrations
2. Set up custom domains if needed
3. Configure team access and permissions
EOL

echo "Deployment package created in the 'vercel-deploy' directory."
echo "Follow the instructions in vercel-deploy/README.md to deploy to Vercel."
