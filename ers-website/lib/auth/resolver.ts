import { supabase } from "@/lib/supabase";

export async function resolveUserRoute() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return "/auth/login";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile?.role) return "/onboarding/role-select";

  if (profile.role === "client") return "/client/dashboard";
  if (profile.role === "runner") return "/runner/dashboard";

  return "/";
}