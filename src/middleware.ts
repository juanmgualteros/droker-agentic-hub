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
  "/:locale/login",
  "/:locale/chat/:productId/test",
  "/:locale/chat/:productId",
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
  "/api/webhook/stripe",
  "/login",
  "/static"
];

// Add security headers to the response
function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  return response;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Run the internationalization middleware
  const response = await intlMiddleware(req);

  // Add security headers
  addSecurityHeaders(response);

  // Handle public routes
  if (publicRoutes.some(route => {
    const pattern = new RegExp(route.replace(/:\w+/g, '[^/]+'));
    return pattern.test(pathname);
  })) {
    return response;
  }

  // Handle admin routes
  if (pathname.includes("/admin")) {
    const isLocalAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
    const userRole = req.cookies.get("userRole")?.value;
    
    if (isLocalAuthenticated && (userRole === "admin" || userRole === "superadmin")) {
      return response;
    }
    
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Handle superadmin routes
  if (pathname.includes("/superadmin")) {
    const isLocalAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
    const userRole = req.cookies.get("userRole")?.value;
    
    if (isLocalAuthenticated && userRole === "superadmin") {
      return response;
    }
    
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return response;
}

// Configure middleware matcher
export const config = {
  matcher: [
    "/((?!_next|.*\\..*$).*)",
    "/",
    "/:locale/admin/:path*",
    "/:locale/superadmin/:path*",
    "/:locale/login",
    "/:locale"
  ]
}; 