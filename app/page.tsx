import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Preview from "./components/preview"; // 🔥 move up
import Problem from "./components/problem";
import Solution from "./components/solution";
import HowItWorks from "./components/how-it-works";
import Trust from "./components/trust";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Preview /> {/* 🔥 immediately after hero */}
      <Problem />
      <Solution />
      <HowItWorks />
      <Trust />
      <CTA />
      <Footer />
    </>
  );
}