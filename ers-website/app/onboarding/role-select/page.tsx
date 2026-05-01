"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoleSelect() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const setRole = async (role: "client" | "runner") => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Redirect immediately after selection
    if (role === "client") router.push("/client");
    if (role === "runner") router.push("/runner");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>How do you want to use ERS?</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <button
          disabled={loading}
          onClick={() => setRole("client")}
          style={{ padding: 20, width: 200 }}
        >
          I need errands done
        </button>

        <button
          disabled={loading}
          onClick={() => setRole("runner")}
          style={{ padding: 20, width: 200 }}
        >
          I want to earn money
        </button>
      </div>
    </div>
  );
}