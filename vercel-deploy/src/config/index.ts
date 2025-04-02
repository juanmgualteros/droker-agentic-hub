const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax' as const,
    path: '/',
    maxAge: 86400
  }
};

export default config; 