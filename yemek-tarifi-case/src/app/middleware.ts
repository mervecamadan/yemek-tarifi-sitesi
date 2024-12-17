import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken") || req.headers.get("authorization");

    const { pathname } = req.nextUrl;


    if (!token && pathname !== "/login") {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";
        return NextResponse.redirect(loginUrl);
    }


    if (token && pathname === "/login") {
        const homeUrl = req.nextUrl.clone();
        homeUrl.pathname = "/";
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}
