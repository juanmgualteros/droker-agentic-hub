import config from '@/config';

interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean;
  domain?: string;
}

/**
 * Sets a cookie that will work properly across both client and server components
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  const cookieOptions = {
    ...config.cookieOptions,
    ...options
  };

  // Format the cookie string
  let cookie = `${name}=${encodeURIComponent(value)}`;
  
  if (cookieOptions.path) cookie += `; path=${cookieOptions.path}`;
  if (cookieOptions.maxAge) cookie += `; max-age=${cookieOptions.maxAge}`;
  if (cookieOptions.domain) cookie += `; domain=${cookieOptions.domain}`;
  if (cookieOptions.secure) cookie += '; secure';
  if (cookieOptions.sameSite) cookie += `; samesite=${cookieOptions.sameSite}`;
  if (cookieOptions.httpOnly) cookie += '; httponly';

  // Set the cookie
  if (typeof document !== 'undefined') {
    document.cookie = cookie;
  }

  return cookie;
}

/**
 * Removes a cookie by setting its expiration in the past
 */
export function removeCookie(name: string, options: CookieOptions = {}) {
  const cookieOptions = {
    ...config.cookieOptions,
    ...options,
    maxAge: -1 // Expire immediately
  };

  return setCookie(name, '', cookieOptions);
}

/**
 * Gets a cookie value from the client-side document.cookie
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return undefined;
}
