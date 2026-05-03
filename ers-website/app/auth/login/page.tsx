"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // 🔥 get role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile?.role) {
      router.push("/onboarding/role-select");
    } else if (profile.role === "client") {
      router.push("/client/dashboard");
    } else if (profile.role === "runner") {
      router.push("/runner/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 rounded text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-2 p-2 rounded text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}