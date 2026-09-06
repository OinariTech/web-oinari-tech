import "server-only";

/**
 * The public URL segment the admin pages are served under. Kept in an env
 * var (Secret Manager in production) rather than in the route path, because
 * this repo is public -- a directory name would be readable on GitHub and
 * the obscurity would be worthless.
 *
 * Falls back to "admin" so local development works with no extra setup. The
 * fallback only costs the obscurity layer: Google login + the ADMIN_EMAIL
 * allowlist still gate every admin page and Server Action.
 */
export const ADMIN_PATH = process.env.ADMIN_PATH?.trim() || "admin";

/** Internal route segment the admin pages actually live at in `app/`. */
export const ADMIN_ROUTE = "/admin";

export function adminUrl(subpath = "") {
  return `/${ADMIN_PATH}${subpath}`;
}
