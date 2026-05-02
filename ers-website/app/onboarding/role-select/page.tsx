"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RoleSelect() {
  const router = useRouter();

  const selectRole = async (role: "client" | "runner") => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    // redirect after role selection
    if (role === "client") {
      router.push("/client/dashboard");
    } else {
      router.push("/runner/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] text-white">
      <div className="p-8 bg-[#111827] rounded-xl w-[350px]">
        <h2 className="text-xl mb-4">Choose your role</h2>

        <button
          onClick={() => selectRole("client")}
          className="w-full mb-3 p-3 bg-green-500 rounded"
        >
          I need errands done
        </button>

        <button
          onClick={() => selectRole("runner")}
          className="w-full p-3 bg-green-700 rounded"
        >
          I want to earn (Runner)
        </button>
      </div>
    </div>
  );
}