"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created. You can now log in.");
    router.push("/auth/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white"
    }}>
      <div style={{
        padding: 24,
        background: "#111827",
        borderRadius: 12,
        width: 300
      }}>
        <h2>Create Account</h2>

        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup} style={{ width: "100%" }}>
          Sign Up
        </button>
      </div>
    </div>
  );
}