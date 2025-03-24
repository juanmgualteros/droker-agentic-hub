import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localePrefix: "always"
});

// Define public routes that don't require authentication
const publicRoutes = [
  "/:locale",
  "/:locale/sign-in",
  "/:locale/admin/login",
  "/:locale/chat/:productId/test",
  "/:locale/chat/:productId",
  "/api/webhook",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/login",
];

// Define routes that should be ignored by the middleware
const ignoredRoutes = [
  "/_next",
  "/favicon.ico",
  "/api/webhook",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/login",
];

// Combine Clerk auth middleware with internationalization
export default authMiddleware({
  beforeAuth: (req) => {
    // Run the internationalization middleware before auth
    return intlMiddleware(req);
  },
  publicRoutes,
  ignoredRoutes,
  debug: process.env.NODE_ENV === "development",
  afterAuth(auth, req) {
    const { userId, sessionId } = auth;
    const { pathname } = req.nextUrl;

    // Allow all requests in development mode
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }

    // Handle login page - completely bypass authentication
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Handle admin routes
    if (pathname.includes("/admin")) {
      // Check for local authentication and admin role
      const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
      const userRole = req.cookies.get("userRole")?.value;
      if (!isAuthenticated || userRole !== "admin") {
        // If not authenticated or not admin, redirect to login
        const locale = pathname.split("/")[1] || "en";
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
      // If authenticated and admin, allow access
      return NextResponse.next();
    }

    // Handle superadmin routes
    if (pathname.includes("/superadmin")) {
      // Check for local authentication and superadmin role
      const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
      const userRole = req.cookies.get("userRole")?.value;
      if (!isAuthenticated || userRole !== "superadmin") {
        // If not authenticated or not superadmin, redirect to login
        const locale = pathname.split("/")[1] || "en";
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
      // If authenticated and superadmin, allow access
      return NextResponse.next();
    }

    // Handle sign-in pages
    if (pathname.includes("/sign-in")) {
      if (userId) {
        // If user is authenticated, redirect to home page
        const locale = pathname.split("/")[1] || "en";
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
      }
      // If not authenticated, allow access
      return NextResponse.next();
    }

    // For all other routes, allow access
    return NextResponse.next();
  },
});

// Configure middleware to run on specified routes only, avoiding static and internal routes
export const config = {
  matcher: [
    // Match all paths except those that start with:
    // - _next (Next.js internals)
    // - static files with extensions (.jpg, .png, etc.)
    // Include specific paths we DO want to run middleware on
    "/((?!_next|.*\\..*$).*)",
    "/", 
    "/:locale/admin/(.*)$",
    "/:locale/superadmin/(.*)$",
    "/:locale/login$",
    "/:locale/sign-in$"
  ],
}; 