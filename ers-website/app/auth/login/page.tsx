"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { resolveUserRoute } from "@/lib/auth/resolver";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    const route = await resolveUserRoute();
    router.push(route);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      {/* LOGIN CARD */}
      <div
        style={{
          padding: 24,
          background: "#111827",
          borderRadius: 12,
          width: 300,
        }}
      >
        <h2>ERS Login</h2>

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

        <button onClick={handleLogin} style={{ width: "100%" }}>
          Login
        </button>
      </div>

      {/* SIGNUP LINK */}
      <p style={{ marginTop: 12 }}>
        No account? <a href="/auth/signup">Create one</a>
      </p>
    </div>
  );
}