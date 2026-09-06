import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_EMAIL, decryptSession, SESSION_COOKIE } from "@/lib/admin-session";

// Optimistic check only (cookie decrypt, no Firestore/network access) --
// every admin Server Action and page re-checks via verifyAdminSession().
export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = await decryptSession(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (!session || session.email !== ADMIN_EMAIL) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
