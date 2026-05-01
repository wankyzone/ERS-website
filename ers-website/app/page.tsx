"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resolveUserRoute } from "@/lib/auth/resolver";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const route = await resolveUserRoute();
      router.push(route);
    };

    handleRedirect();
  }, []);

  return <p>Loading...</p>;
}