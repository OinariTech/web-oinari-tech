import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { buildAuthUrl, OAUTH_STATE_COOKIE } from "@/lib/google-oauth";

export async function GET() {
  const state = randomBytes(32).toString("hex");
  const response = NextResponse.redirect(buildAuthUrl(state));

  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
