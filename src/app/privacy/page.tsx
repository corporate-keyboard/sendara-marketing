import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-4xl text-sendara-navy mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none font-body text-sendara-navy/70 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">1. Information We Collect</h2>
            <p>We collect information you provide when filling out our demo request or waitlist forms, including your name, email address, phone number, agency name, and team size.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">2. How We Use Your Information</h2>
            <p>We use your information to respond to demo requests, communicate about our products and services, and improve our marketing efforts.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">3. Data Storage</h2>
            <p>Your data is stored securely using industry-standard encryption. We use Supabase for data storage, which is hosted on secure cloud infrastructure.</p>
            <h2 className="font-heading font-semibold text-2xl text-sendara-navy mt-8">4. Contact</h2>
            <p>For privacy-related inquiries, contact us at privacy@sendara.io</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
