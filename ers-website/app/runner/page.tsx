"use client";

import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/lib/supabase";

const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/auth/login";
};

export default function RunnerDashboard() {
  return (
    <AuthGuard role="runner">
      <div style={{ padding: 20, color: "white" }}>
        <h1>Runner Dashboard</h1>

        <p>Ready to earn 💰</p>

        <div style={{ marginTop: 20 }}>
          <h3>Available Errands</h3>
          <p>No errands available yet.</p>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Your Jobs</h3>
          <p>No active jobs.</p>
        </div>
      </div>
    </AuthGuard>
  );
}