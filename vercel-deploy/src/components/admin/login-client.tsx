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
  const [isLoading, setIsLoading] = useState(false);

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
    
    try {
      // Clear any previous errors
      setError("");
      setIsLoading(true);
      
      // Check for super admin credentials
      if (email === "juan@droker.co" && password === "password") {
        // Store the authentication state with proper error handling
        try {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "superadmin");
          
          // Set secure cookies with proper configuration
          document.cookie = `isAuthenticated=true; path=/; max-age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
          document.cookie = `userRole=superadmin; path=/; max-age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
          
          const destination = searchParams.get("destination") || `/${locale}/superadmin`;
          router.push(destination);
        } catch (storageError) {
          console.error("Storage error:", storageError);
          setError("Authentication failed. Please try again.");
        }
      }
      // Check for admin credentials
      else if (email === "tatiana@calderon.com" && password === "password") {
        try {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "admin");
          
          document.cookie = `isAuthenticated=true; path=/; max-age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
          document.cookie = `userRole=admin; path=/; max-age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
          
          const destination = searchParams.get("destination") || `/${locale}/admin`;
          router.push(destination);
        } catch (storageError) {
          console.error("Storage error:", storageError);
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, setCopied: (value: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-light text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-foreground-secondary">
            Enter your credentials below
          </p>
        </div>

        {error && (
          <div className="text-destructive text-sm text-center">{error}</div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input rounded-t-lg rounded-b-none"
                placeholder="Email address"
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input rounded-b-lg rounded-t-none"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="button-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-foreground-secondary">
                Demo Credentials
              </span>
            </div>
          </div>

          <div className="text-sm text-center">
            <p className="text-foreground">Super Admin:</p>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-foreground-secondary">juan@droker.co</p>
              <Check className="h-3 w-3 text-success" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-foreground-secondary">password</p>
              <Check className="h-3 w-3 text-success" />
            </div>
          </div>

          <div className="text-sm text-center">
            <p className="text-foreground">Admin:</p>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-foreground-secondary">tatiana@calderon.com</p>
              <Check className="h-3 w-3 text-success" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-foreground-secondary">password</p>
              <Check className="h-3 w-3 text-success" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 