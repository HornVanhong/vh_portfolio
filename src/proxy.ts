import { NextResponse, type NextRequest } from "next/server";
import { LOCALES } from "@/types";

/**
 * 1. Issues a per-request CSP nonce.
 * 2. Serves English at the root and other languages under their prefix (all map to app/[lang]).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // English has one canonical address: without the prefix.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    // Collapse leading slashes so the target can never be read as another host.
    url.pathname = `/${pathname.slice(3).replace(/^\/+/, "")}`;
    return NextResponse.redirect(url, 308);
  }

  const nonce = btoa(crypto.randomUUID());
  const dev = process.env.NODE_ENV === "development";
  const https = request.nextUrl.protocol === "https:";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    // Animation libraries write style attributes, which nonces cannot cover.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    `connect-src 'self'${dev ? " ws:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(https ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", csp);
  // Read by the root layout for its inline boot script.
  headers.set("x-nonce", nonce);
  // Read by the root layout for <html lang>.
  headers.set("x-locale", LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) ?? "en");

  let response: NextResponse;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    response = NextResponse.next({ request: { headers } });
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(url, { request: { headers } });
  }
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/|cv/|images/|icons/|robots.txt|sitemap.xml|opengraph-image|icon.svg|favicon.ico).*)",
  ],
};
