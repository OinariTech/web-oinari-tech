import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PATH, ADMIN_ROUTE, adminUrl } from "@/lib/admin-path";
import { ADMIN_EMAIL, decryptSession, SESSION_COOKIE } from "@/lib/admin-session";

// The admin pages live at ADMIN_ROUTE in `app/` but are served under the
// secret ADMIN_PATH segment. Requests to ADMIN_ROUTE itself render the 404
// page, so the internal path gives nothing away.
//
// The session check here is optimistic (cookie decrypt only, no Firestore or
// network access) -- every admin page and Server Action re-checks with
// verifyAdminSession().
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const usingSecretPath = ADMIN_PATH !== "admin";

  if (usingSecretPath && isUnder(pathname, ADMIN_ROUTE)) {
    return NextResponse.rewrite(new URL("/_admin-not-found", request.url));
  }

  const secretRoot = `/${ADMIN_PATH}`;
  if (!isUnder(pathname, secretRoot)) {
    return NextResponse.next();
  }

  const subpath = pathname.slice(secretRoot.length);
  const target = new URL(`${ADMIN_ROUTE}${subpath}`, request.url);
  target.search = request.nextUrl.search;

  if (subpath === "/login") {
    return NextResponse.rewrite(target);
  }

  const session = await decryptSession(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (!session || session.email !== ADMIN_EMAIL) {
    return NextResponse.redirect(new URL(adminUrl("/login"), request.url));
  }

  return NextResponse.rewrite(target);
}

function isUnder(pathname: string, root: string) {
  return pathname === root || pathname.startsWith(`${root}/`);
}

export const config = {
  // Matchers must be static, so the secret path can't be one -- run on
  // everything except assets and API routes, and filter above at runtime.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
