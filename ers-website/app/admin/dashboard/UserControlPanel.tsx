"use client";

import { useState } from "react";

export default function UserControlPanel() {
  const [userId, setUserId] = useState("");
  const [risk, setRisk] = useState(0);

  const call = async (url: string, body: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Success");
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h2 className="font-bold">User Risk Control</h2>

      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 w-full"
      />

      <div className="flex gap-2">
        <button
          onClick={() => call("/api/admin/freeze", { user_id: userId })}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Freeze
        </button>

        <button
          onClick={() => call("/api/admin/unfreeze", { user_id: userId })}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Unfreeze
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Risk score"
          value={risk}
          onChange={(e) => setRisk(Number(e.target.value))}
          className="border p-2 w-full"
        />

        <button
          onClick={() =>
            call("/api/admin/risk", { user_id: userId, score: risk })
          }
          className="bg-black text-white px-3 py-1 rounded"
        >
          Update Risk
        </button>
      </div>
    </div>
  );
}