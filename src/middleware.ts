import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Log authentication attempts (development only)
  if (process.env.NODE_ENV === "development") {
    console.log("[Auth Middleware]", {
      path: pathname,
      hasToken: !!token,
      timestamp: new Date().toISOString(),
    });
  }

  // If user opens root "/"
  if (pathname === "/") {
    if (token && token !== "") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Protect dashboard route
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Prevent logged-in users from going back to login
  if ((pathname === "/auth/login" || pathname === "/auth/forgot-password") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Add security headers
  const response = NextResponse.next();

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  // CORS headers (adjust origin as needed)
  response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/auth/forgot-password"],
};