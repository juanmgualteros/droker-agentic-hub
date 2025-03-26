import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config/i18n';

// Get hostname from environment variable
const hostname = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within /api, except for
    // - … if they start with `/api/auth` or `/api/webhook`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/api/((?!auth|webhook|.*\\..*).*)' 
  ]
}; 