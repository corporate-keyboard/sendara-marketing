import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl text-sendara-navy mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none font-body text-sendara-navy/70 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">1. Acceptance of Terms</h2>
            <p>By accessing or using Sendara, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">2. Description of Service</h2>
            <p>Sendara provides a WhatsApp and Telegram campaign management platform designed for UAE real estate agencies. The service includes campaign creation, warm-up automation, quality monitoring, and analytics.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">3. User Responsibilities</h2>
            <p>You are responsible for ensuring your use of the platform complies with WhatsApp Business policies, local UAE regulations, and applicable data protection laws.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">4. Contact</h2>
            <p>For questions about these terms, contact us at legal@sendara.io</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
