import { supabase } from "../supabase";

export async function resolveUserRoute() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return "/auth/login";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  // 🔴 If no role → force onboarding
  if (!profile || !profile.role) {
    return "/onboarding/role-select";
  }

  switch (profile.role) {
    case "client":
      return "/client";
    case "runner":
      return "/runner";
    case "admin":
      return "https://admin.ers.wankysoftware.com";
    default:
      return "/onboarding/role-select";
  }
}