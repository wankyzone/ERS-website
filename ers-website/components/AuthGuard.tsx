"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "client" | "runner";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile?.role) {
        router.push("/onboarding/role-select");
        return;
      }

      if (profile.role !== role) {
        // wrong role → redirect properly
        if (profile.role === "client") router.push("/client");
        if (profile.role === "runner") router.push("/runner");
        return;
      }

      setLoading(false);
    };

    check();
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return <>{children}</>;
}