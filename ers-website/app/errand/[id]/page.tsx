"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function ErrandPage() {
  const { id } = useParams();
  const [e, setE] = useState<any>(null);

  // -------------------------
  // FETCH ERRAND
  // -------------------------
  const fetchErrand = async () => {
    const { data } = await supabase
      .from("errands")
      .select("*")
      .eq("id", id)
      .single();

    setE(data);
  };

  useEffect(() => {
    fetchErrand();
  }, []);

  // -------------------------
  // RUNNER ACTION
  // -------------------------
  const markAsCompleted = async () => {
    const { error } = await supabase
      .from("errands")
      .update({
        status: "completed_pending_confirmation",
      })
      .eq("id", id);

    if (error) return alert(error.message);

    alert("Waiting for client confirmation");
    fetchErrand();
  };

  // -------------------------
  // CLIENT CONFIRM + ESCROW RELEASE
  // -------------------------
  const confirmCompletion = async () => {
    const { error } = await supabase
      .from("errands")
      .update({
        client_confirmed: true,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return alert(error.message);

    const { error: releaseError } = await supabase.rpc("release_escrow", {
      p_errand_id: id,
    });

    if (releaseError) return alert(releaseError.message);

    alert("Payment released to runner");
    fetchErrand();
  };

  // -------------------------
  // DISPUTE ACTION (SEPARATE FLOW)
  // -------------------------
  const raiseDispute = async () => {
    const { error } = await supabase.from("disputes").insert({
      errand_id: id,
      raised_by: e.client_id,
      reason: "Issue with errand completion",
      status: "open",
    });

    if (error) return alert(error.message);

    await supabase
      .from("errands")
      .update({ status: "disputed" })
      .eq("id", id);

    alert("Dispute raised. Escrow frozen.");
    fetchErrand();
  };

  if (!e) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl">{e.title}</h2>
      <p className="text-gray-400">₦{e.budget}</p>

      {/* RUNNER */}
      <button
        onClick={markAsCompleted}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Mark as Completed
      </button>

      {/* CLIENT */}
      <button
        onClick={confirmCompletion}
        className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Confirm & Release Payment
      </button>

      {/* DISPUTE (GLOBAL SAFETY SWITCH) */}
      <button
        onClick={raiseDispute}
        className="mt-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Raise Dispute
      </button>
    </div>
  );
}