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
  "/:locale/login",
  "/:locale/chat/:productId/test",
  "/:locale/chat/:productId",
  "/api/webhook",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/login",
  "/",
  "/en",
  "/es"
];

// Define routes that should be ignored by the middleware
const ignoredRoutes = [
  "/_next",
  "/favicon.ico",
  "/api/webhook",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/login",
  "/static"
];

// Combine Clerk auth middleware with internationalization
export default authMiddleware({
  beforeAuth: (req) => {
    // Run the internationalization middleware before auth
    return intlMiddleware(req);
  },
  publicRoutes,
  ignoredRoutes,
  debug: true, // Enable debug mode temporarily
  afterAuth(auth, req) {
    const { userId } = auth;
    const { pathname } = req.nextUrl;

    // Handle public routes
    if (publicRoutes.some(route => {
      const pattern = new RegExp(route.replace(/:\w+/g, '[^/]+'));
      return pattern.test(pathname);
    })) {
      return NextResponse.next();
    }

    // Handle admin routes
    if (pathname.includes("/admin")) {
      const isLocalAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
      const userRole = req.cookies.get("userRole")?.value;
      
      if (isLocalAuthenticated && (userRole === "admin" || userRole === "superadmin")) {
        return NextResponse.next();
      }
      
      const locale = pathname.split("/")[1] || "en";
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // Handle superadmin routes
    if (pathname.includes("/superadmin")) {
      const isLocalAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
      const userRole = req.cookies.get("userRole")?.value;
      
      if (isLocalAuthenticated && userRole === "superadmin") {
        return NextResponse.next();
      }
      
      const locale = pathname.split("/")[1] || "en";
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    return NextResponse.next();
  }
});

// Configure middleware matcher
export const config = {
  matcher: [
    "/((?!_next|.*\\..*$).*)",
    "/",
    "/:locale/admin/:path*",
    "/:locale/superadmin/:path*",
    "/:locale/login",
    "/:locale/sign-in",
    "/:locale"
  ]
}; 