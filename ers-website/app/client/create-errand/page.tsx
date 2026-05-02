"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateErrandPage() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number>(0);

  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "pending" | "funded" | "failed"
  >("idle");

  const [paymentRef, setPaymentRef] = useState<string | null>(null);

  // 🔐 Load user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // 💳 Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 🔥 REAL-TIME PAYMENT WATCHER
  useEffect(() => {
    if (!paymentRef) return;

    const channel = supabase
      .channel("payment-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "payments",
          filter: `paystack_ref=eq.${paymentRef}`,
        },
        (payload) => {
          const newStatus = payload.new.status;

          if (newStatus === "funded") {
            setPaymentStatus("funded");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [paymentRef]);

  const handlePay = () => {
    if (!user) return alert("Not logged in");
    if (!title || !budget) return alert("Fill all fields");

    setPaymentStatus("processing");

    const ref = "ERS_" + Date.now();
    setPaymentRef(ref);

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: budget * 100,
      currency: "NGN",
      ref,

      callback: async function () {
        setPaymentStatus("pending");

        await onSuccess(ref);
      },

      onClose: function () {
        setPaymentStatus("failed");
      },
    });

    handler.openIframe();
  };

  const onSuccess = async (reference: string) => {
    // 🔥 1. Create errand
    const { data: errand, error } = await supabase
      .from("errands")
      .insert({
        title,
        description,
        budget,
        client_id: user.id,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      setPaymentStatus("failed");
      return;
    }

    // 🔥 2. Create payment (pending)
    await supabase.from("payments").insert({
      errand_id: errand.id,
      client_id: user.id,
      amount: budget,
      status: "pending",
      paystack_ref: reference,
    });
  };

  // 🎨 UI STATES
  const renderStatus = () => {
    switch (paymentStatus) {
      case "processing":
        return <p className="text-yellow-400">Processing payment...</p>;

      case "pending":
        return (
          <p className="text-blue-400">
            Waiting for payment confirmation...
          </p>
        );

      case "funded":
        return (
          <p className="text-green-500">
            Payment successful ✅ Errand created
          </p>
        );

      case "failed":
        return (
          <p className="text-red-500">
            Payment failed or cancelled ❌
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Create Errand</h2>

      <input
        placeholder="Title"
        className="w-full mb-2 p-2 bg-gray-800 rounded"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        className="w-full mb-2 p-2 bg-gray-800 rounded"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Budget"
        type="number"
        className="w-full mb-2 p-2 bg-gray-800 rounded"
        onChange={(e) => setBudget(Number(e.target.value))}
      />

      <button
        onClick={handlePay}
        className="bg-green-500 px-4 py-2 rounded w-full"
      >
        Create & Pay
      </button>

      <div className="mt-4">{renderStatus()}</div>
    </div>
  );
}