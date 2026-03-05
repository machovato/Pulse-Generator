import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/editor", "/history"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

    if (!isProtected) return NextResponse.next();

    const adminSecret = process.env.ADMIN_SECRET;

    // If no secret is configured, allow access (dev mode)
    if (!adminSecret) return NextResponse.next();

    // Check session cookie
    const sessionCookie = request.cookies.get("pulse_session")?.value;
    if (sessionCookie === adminSecret) return NextResponse.next();

    // Check Authorization header (for API/programmatic access)
    const authHeader = request.headers.get("authorization");
    if (authHeader === `Bearer ${adminSecret}`) return NextResponse.next();

    // Redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/editor/:path*", "/history/:path*"],
};
