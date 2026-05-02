"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RunnerDashboard() {
  const [errands, setErrands] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("errands")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "errands" },
        () => fetchErrands()
      )
      .subscribe();

    return () => {
        supabase.removeChannel(channel);
    }; 
  }, []);

  const fetchErrands = async () => {
    const { data } = await supabase
      .from("errands")
      .select("*")
      .eq("status", "open");

    if (data) setErrands(data);
  };

  const acceptErrand = async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("errands")
      .update({
        runner_id: user.id,
        status: "accepted",
      })
      .eq("id", id);

    if (!error) fetchErrands();
  };

  return (
    <div className="p-6 text-white">
      <h2>Available Errands</h2>

      {errands.map((e) => (
        <div key={e.id} className="border p-3 mb-2">
          <p>{e.title}</p>
          <p>₦{e.budget}</p>

          <button
            onClick={() => acceptErrand(e.id)}
            className="bg-green-500 p-2 mt-2"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}