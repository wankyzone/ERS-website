"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateErrand() {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");

  const handleCreate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("errands").insert({
      title,
      budget: Number(budget),
      client_id: user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Errand created!");
  };

  return (
    <div className="p-6 text-white">
      <h2>Create Errand</h2>

      <input
        placeholder="Title"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Budget"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setBudget(e.target.value)}
      />

      <button onClick={handleCreate} className="bg-green-500 p-2">
        Create
      </button>
    </div>
  );
}