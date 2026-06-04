"use client";

import { useState } from "react";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Categories from "./components/categories";
import Problem from "./components/problem";
import Solution from "./components/solution";
import HowItWorks from "./components/how-it-works";
import Trust from "./components/trust";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Page() {
  const [task, setTask] = useState("");

  return (
    <main className="bg-[#0B0D12] text-white">

      <Navbar />

      <Hero task={task} setTask={setTask} />

      <Categories setTask={setTask} />

      <Problem />

      <Solution />

      <HowItWorks />

      <Trust />

      <CTA />

      <Footer />

    </main>
  );
}