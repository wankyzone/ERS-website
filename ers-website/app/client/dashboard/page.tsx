"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ClientDashboard() {
  const [errands, setErrands] = useState<any[]>([]);

  useEffect(() => {
    fetchMyErrands();
  }, []);

  const fetchMyErrands = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("errands")
      .select("*")
      .eq("client_id", user.id);

    if (data) setErrands(data);
  };

  return (
    <div className="p-6 text-white">
      <h2>My Errands</h2>

      {errands.map((e) => (
        <div key={e.id} className="border p-3 mb-2">
          <p>{e.title}</p>
          <p>Status: {e.status}</p>
        </div>
      ))}
    </div>
  );
}