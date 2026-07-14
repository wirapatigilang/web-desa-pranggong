import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Cek keberadaan cookie sesi saja (cepat, tanpa hit DB) — cukup untuk gate render,
// validitas sesi sesungguhnya tetap dicek server-side di setiap page/action admin.
export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
