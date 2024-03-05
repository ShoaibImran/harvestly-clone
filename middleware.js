import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/farmer") &&
      req.nextauth.token?.role !== "farmer"
    )
      return NextResponse.rewrite(
        new URL("/auth/signin?message=You Are Not Authorized!", req.url)
      );
    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token?.role !== "user"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/farmer/:path*", "/user/:path*", "/product/:path*"],
};
