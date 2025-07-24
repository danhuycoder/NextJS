import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;

  // Nếu đang ở /admin/login thì KHÔNG redirect
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Nếu không có token và truy cập /admin/* -> redirect về /admin/login
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

// Chỉ áp dụng cho /admin/*
export const config = {
  matcher: ["/admin/:path*"],
};
