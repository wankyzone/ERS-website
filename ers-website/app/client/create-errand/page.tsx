"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateErrand() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = () => {
    if (!user) return alert("User not loaded");
    if (!title || !description || !budget)
      return alert("Fill all fields");

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: budget * 100,
      currency: "NGN",
      ref: "ERS_" + Date.now(),

      metadata: {
        title,
        description,
        budget,
        user_id: user.id,
      },

      callback: function () {
        alert("Payment successful. Processing...");
      },

      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="p-6 space-y-4">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="border p-2 w-full"
      />

      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create & Pay
      </button>
    </div>
  );
}