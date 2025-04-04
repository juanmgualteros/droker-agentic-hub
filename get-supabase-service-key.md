# How to Get Your Supabase Service Role Key

To fix the permission issues and work with real data, you need to add a Supabase service role key to your `.env` file. Follow these steps:

## 1. Log in to Supabase Dashboard

Go to [https://app.supabase.com/](https://app.supabase.com/) and log in to your account.

## 2. Select Your Project

Click on the project you're using for the Droker Agentic Hub application (the one with the URL: `https://qvasgxzdjmldhbinbrgw.supabase.co`).

## 3. Get the Service Role Key

1. In the left sidebar, click on **Project Settings**.
2. Click on **API** in the settings menu.
3. Under **Project API keys**, you'll see a key labeled `service_role` or `service_role key`.
4. Click the **Copy** button next to this key.

## 4. Add the Key to Your .env File

Add the following line to your `.env` file:

```
SUPABASE_SERVICE_ROLE_KEY=your_copied_service_role_key
```

Replace `your_copied_service_role_key` with the key you copied from the Supabase dashboard.

## 5. Restart Your Development Server

After adding the service role key to your `.env` file, restart your development server:

```bash
npm run dev
```

## Important Security Note

The service role key has full access to your database, bypassing any Row Level Security (RLS) policies. Only use it for server-side operations and never expose it to the client.

## Troubleshooting

If you still encounter permission issues after adding the service role key, check:

1. That the tables exist in your Supabase database
2. That the column names match what your code is expecting
3. That your database URL in the `.env` file is correct
