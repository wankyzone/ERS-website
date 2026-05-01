"use client";

import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/lib/supabase";

const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/auth/login";
};

export default function ClientDashboard() {
  return (
    <AuthGuard role="client">
      <div style={{ padding: 20, color: "white" }}>
        <h1>Client Dashboard</h1>

        <p>Welcome 👋</p>

        <div style={{ marginTop: 20 }}>
          <button>Create New Errand</button>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Your Errands</h3>
          <p>No errands yet.</p>
        </div>
      </div>

      <button onClick={logout}>Logout</button>
    </AuthGuard>
  );
}