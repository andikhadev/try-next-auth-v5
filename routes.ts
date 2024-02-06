/**
 * The routes that are can be accessed without authentication
 */
export const publicRoutes = ['/', '/auth/new-verification']

/**
 * The routes that from authentication
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]

/**
 * The prefix for all auth API routes
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
