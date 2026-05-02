import { supabase } from "../supabase";

export async function resolveUserRoute() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "/auth/login";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile?.role) {
    return "/onboarding/role-select";
  }

  if (profile.role === "client") return "/client/dashboard";
  if (profile.role === "runner") return "/runner/dashboard";

  return "/";
}