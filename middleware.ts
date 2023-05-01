import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      !req.nextauth ||
      !req.nextauth.token ||
      (req.nextUrl.pathname === "/admin" &&
        req.nextauth.token?.role !== "ADMIN")
    ) {
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      return NextResponse.redirect(`${protocol}://${req.nextUrl.host}`);
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/favorites", "/admin"],
};
