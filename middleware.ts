import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  console.log(
    "Session",
    sessionCookie,
    " path name if true",
    "/".includes(pathname)
  );
  if (sessionCookie && "/".includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (sessionCookie && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup", "/"],
};
