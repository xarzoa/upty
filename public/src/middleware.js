/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/([^/.]*)"
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host");

  const secure = hostname === process.env.DETA_SPACE_APP_HOSTNAME
  const dashboard = url.pathname === '/dashboard'
  if (dashboard && !secure) {
    return NextResponse.redirect(new URL('/', url));
  }
}