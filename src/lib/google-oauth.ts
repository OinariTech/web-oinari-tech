import "server-only";
import { OAuth2Client } from "google-auth-library";
import { SITE_URL } from "@/lib/site";

export const OAUTH_STATE_COOKIE = "admin_oauth_state";
export const GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";

function getRedirectUri() {
  return `${SITE_URL}${GOOGLE_CALLBACK_PATH}`;
}

export function getOAuthClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET is not set",
    );
  }
  return new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: getRedirectUri(),
  });
}

export function buildAuthUrl(state: string) {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email"],
    state,
  });
}

/**
 * Exchanges an OAuth code for tokens and returns the verified email from
 * the ID token, or null if the code/token is invalid.
 */
export async function getEmailFromCode(code: string): Promise<string | null> {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  if (!tokens.id_token) return null;

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload?.email || !payload.email_verified) return null;
  return payload.email;
}
