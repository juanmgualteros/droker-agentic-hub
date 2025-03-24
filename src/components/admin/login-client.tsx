"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale || 'en';

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      const userRole = localStorage.getItem("userRole");
      // Get the intended destination from the URL or default to admin/superadmin with locale
      const destination = searchParams.get("destination") || 
        (userRole === "superadmin" ? `/${locale}/superadmin` : `/${locale}/admin`);
      router.push(destination);
    }
  }, [router, searchParams, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for super admin credentials
    if (email === "juan@droker.co" && password === "password") {
      // Store the authentication state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "superadmin");
      
      // Set secure cookies with proper configuration for production
      document.cookie = "isAuthenticated=true; path=/; max-age=86400; SameSite=Lax";
      document.cookie = "userRole=superadmin; path=/; max-age=86400; SameSite=Lax";
      
      // Get the intended destination from the URL or default to superadmin with locale
      const destination = searchParams.get("destination") || `/${locale}/superadmin`;
      router.push(destination);
    }
    // Check for admin credentials
    else if (email === "tatiana@calderon.com" && password === "password") {
      // Store the authentication state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      
      // Set secure cookies with proper configuration for production
      document.cookie = "isAuthenticated=true; path=/; max-age=86400; SameSite=Lax";
      document.cookie = "userRole=admin; path=/; max-age=86400; SameSite=Lax";
      
      // Get the intended destination from the URL or default to admin with locale
      const destination = searchParams.get("destination") || `/${locale}/admin`;
      router.push(destination);
    } else {
      setError("Invalid credentials");
    }
  };

  const copyToClipboard = async (text: string, setCopied: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Portal Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your organization's admin portal
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Demo credentials
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="text-sm text-center">
              <p className="text-gray-700">Super Admin:</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-500">juan@droker.co</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('juan@droker.co', setCopiedEmail)}
                >
                  {copiedEmail ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
                <span className="text-gray-500">/</span>
                <p className="text-gray-500">password</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('password', setCopiedPassword)}
                >
                  {copiedPassword ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
            <div className="text-sm text-center">
              <p className="text-gray-700">Admin:</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-500">tatiana@calderon.com</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('tatiana@calderon.com', setCopiedEmail)}
                >
                  {copiedEmail ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
                <span className="text-gray-500">/</span>
                <p className="text-gray-500">password</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('password', setCopiedPassword)}
                >
                  {copiedPassword ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 