"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RoleSelectPage() {
  const router = useRouter();

  const selectRole = async (role: "client" | "runner") => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return alert("Not logged in");
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", data.user.id);

    if (error) {
      alert(error.message);
      return;
    }

    if (role === "client") {
      router.push("/client/dashboard");
    } else {
      router.push("/runner/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl mb-6">Select Your Role</h1>

      <button
        onClick={() => selectRole("client")}
        className="mb-3 bg-green-600 px-4 py-2 rounded"
      >
        I'm a Client
      </button>

      <button
        onClick={() => selectRole("runner")}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        I'm a Runner
      </button>
    </div>
  );
}