import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirect platform URLs (login, signup, dashboard, etc.) to app.sendara.one.
 * The marketing site should only serve marketing pages.
 */

const PLATFORM_HOST = "https://app.sendara.one";

const PLATFORM_PATHS = [
  "/login",
  "/signin",
  "/signup",
  "/register",
  "/dashboard",
  "/onboarding",
  "/admin",
  "/settings",
  "/billing",
  "/campaigns",
  "/contacts",
  "/templates",
  "/listings",
  "/inbox",
  "/analytics",
  "/reports",
  "/usage",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const shouldRedirect = PLATFORM_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (shouldRedirect) {
    return NextResponse.redirect(`${PLATFORM_HOST}${pathname}${search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes (marketing site's own APIs like /api/leads)
     * - _next static files
     * - favicon.ico, robots.txt, sitemap.xml
     * - files with extensions (images, fonts)
     */
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
