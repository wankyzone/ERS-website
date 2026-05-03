import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // -------------------------
  // AUTH
  // -------------------------
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🚫 Not logged in
  if (!user) {
    if (
      url.pathname.startsWith("/client") ||
      url.pathname.startsWith("/runner") ||
      url.pathname.startsWith("/admin")
    ) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return res;
  }

  // -------------------------
  // PROFILE
  // -------------------------
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // 🚧 No role → onboarding
  if (!profile?.role) {
    if (!url.pathname.startsWith("/onboarding")) {
      url.pathname = "/onboarding/role-select";
      return NextResponse.redirect(url);
    }
    return res;
  }

  // -------------------------
  // ROLE PROTECTION
  // -------------------------

  // CLIENT
  if (url.pathname.startsWith("/client") && profile.role !== "client") {
    url.pathname =
      profile.role === "runner"
        ? "/runner"
        : profile.role === "admin"
        ? "/admin"
        : "/";
    return NextResponse.redirect(url);
  }

  // RUNNER
  if (url.pathname.startsWith("/runner") && profile.role !== "runner") {
    url.pathname =
      profile.role === "client"
        ? "/client"
        : profile.role === "admin"
        ? "/admin"
        : "/";
    return NextResponse.redirect(url);
  }

  // 🔐 ADMIN (CRITICAL)
  if (url.pathname.startsWith("/admin") && profile.role !== "admin") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/client/:path*",
    "/runner/:path*",
    "/admin/:path*",
    "/onboarding/:path*",
  ],
};