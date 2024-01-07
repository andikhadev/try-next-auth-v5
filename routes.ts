/**
 * The routes that are can be accessed without authentication
 */
export const publicRoutes = ['/']

/**
 * The routes that from authentication
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * The prefix for all auth API routes
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
