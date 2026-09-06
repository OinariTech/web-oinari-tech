import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAIL, createSessionCookie } from "@/lib/admin-session";
import { getEmailFromCode, OAUTH_STATE_COOKIE } from "@/lib/google-oauth";
import { SITE_URL } from "@/lib/site";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  const loginUrl = (error: string) =>
    new URL(`/admin/login?error=${error}`, SITE_URL);

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(loginUrl("invalid_state"));
  }

  let email: string | null;
  try {
    email = await getEmailFromCode(code);
  } catch (error) {
    console.error("Google OAuth token exchange failed", error);
    return NextResponse.redirect(loginUrl("auth_failed"));
  }

  if (!email || email !== ADMIN_EMAIL) {
    return NextResponse.redirect(loginUrl("unauthorized"));
  }

  await createSessionCookie(email);

  const response = NextResponse.redirect(new URL("/admin", SITE_URL));
  response.cookies.delete(OAUTH_STATE_COOKIE);
  return response;
}
