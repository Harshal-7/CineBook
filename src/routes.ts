/**
 * An array of routes that are accessible to public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to settings.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register", "/error"];

/**
 * The prefix for api authentication routes.
 * Routes that starts with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The prefix for api authentication routes.
 * Routes that starts with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const privateRoutes: string = "/bookmark";

/**
 * The default redirect path after loggingin
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
