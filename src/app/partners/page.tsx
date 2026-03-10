import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PartnersContent from "@/components/sections/PartnersContent";

export const metadata: Metadata = {
  title: "Partner Program — Sendara | Grow With Us, Pay Less",
  description: "Join Sendara's partner program. Share your results, shape our product, and get permanently discounted rates. Design Partner, Growth Partner, or Referral Partner.",
  openGraph: {
    title: "Partner Program — Sendara",
    description: "Share your results. Shape our product. Get permanently discounted rates.",
    type: "website",
    locale: "en_AE",
    siteName: "Sendara",
  },
};

export default function PartnersPage() {
  return (
    <main>
      <Navbar />
      <PartnersContent />
      <Footer />
    </main>
  );
}
