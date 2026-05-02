"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState<any[]>([]);

  const fetchDisputes = async () => {
    const { data } = await supabase
      .from("disputes")
      .select("*, errands(*)")
      .eq("status", "open");

    setDisputes(data || []);
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  // 🔥 RESOLVE: PAY RUNNER
  const releaseToRunner = async (errandId: string) => {
    const { error } = await supabase.rpc("release_escrow", {
      p_errand_id: errandId,
    });

    if (error) return alert(error.message);

    await supabase
      .from("disputes")
      .update({ status: "resolved", resolution: "paid_runner" })
      .eq("errand_id", errandId);

    alert("Paid to runner");
    fetchDisputes();
  };

  // 🔥 REFUND CLIENT (you'll implement later via Paystack reverse/manual)
  const refundClient = async (errandId: string) => {
    await supabase
      .from("disputes")
      .update({ status: "resolved", resolution: "refunded_client" })
      .eq("errand_id", errandId);

    alert("Marked for refund (manual/Paystack logic needed)");
    fetchDisputes();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Dispute Management</h1>

      {disputes.map((d) => (
        <div key={d.id} className="bg-gray-900 p-4 rounded mb-3">
          <p>Errand: {d.errands?.title}</p>
          <p>Status: {d.status}</p>
          <p>Reason: {d.reason}</p>

          <button
            onClick={() => releaseToRunner(d.errand_id)}
            className="bg-green-600 px-3 py-1 rounded mr-2"
          >
            Pay Runner
          </button>

          <button
            onClick={() => refundClient(d.errand_id)}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Refund Client
          </button>
        </div>
      ))}
    </div>
  );
}