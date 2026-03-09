import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Comparison from "@/components/sections/Comparison";
import Stats from "@/components/sections/Stats";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import LeadCapture from "@/components/sections/LeadCapture";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Features />
      <Comparison />
      <Stats />
      <Pricing />
      <FAQ />
      <LeadCapture />
      <Footer />
    </main>
  );
}
