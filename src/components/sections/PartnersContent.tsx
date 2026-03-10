"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

/* ── Data ── */
const tiers = [
  {
    name: "Design Partner",
    badge: "LAUNCH OFFER",
    badgeColor: "bg-sendara-bright",
    price: "AED 499",
    original: "AED 799",
    period: "/mo for 6 months",
    desc: "For agencies joining before product launch. Shape the product with us.",
    benefits: [
      "50% off onboarding fee (AED 2,500 saved)",
      "50% off platform fee for 6 months",
      "Direct product team access",
      "Priority feature requests",
      "Dedicated support channel",
      "12% WhatsApp markup (lowest tier)",
    ],
    youGive: [
      "Monthly product feedback session (30 min)",
      "Permission for anonymized case study",
      "1 testimonial quote if results are positive",
    ],
    cta: "Apply as Design Partner",
    highlighted: true,
    spots: "3 spots remaining",
  },
  {
    name: "Growth Partner",
    badge: "ONGOING",
    badgeColor: "bg-sendara-teal",
    price: "AED 699",
    original: "AED 799",
    period: "/mo — permanent",
    desc: "For agencies willing to share their success story in exchange for ongoing savings.",
    benefits: [
      "25% off platform fee — permanently",
      "Onboarding reduced to AED 1,000",
      "Featured on Sendara website & socials",
      "Co-branded case study with your logo",
      "Quarterly strategy call",
      "12% WhatsApp markup (lowest tier)",
    ],
    youGive: [
      "Quarterly results snapshot (we help compile)",
      "Logo usage rights for Sendara marketing",
      "60-90 second video testimonial (we produce)",
      "Available for 1 reference call per quarter",
    ],
    cta: "Apply as Growth Partner",
    highlighted: false,
  },
  {
    name: "Referral Partner",
    badge: "EARN",
    badgeColor: "bg-sendara-deep",
    price: "15%",
    original: "",
    period: "rev share — recurring",
    desc: "Recommend Sendara. Earn recurring commission on every client you bring.",
    benefits: [
      "15% of referred client's platform fee — recurring",
      "Direct access to product team",
      "Unique referral tracking link",
      "Monthly commission reports",
      "No platform fee required to join",
      "Co-marketing opportunities",
    ],
    youGive: [
      "Active referrals to qualified agencies",
      "Introduction to decision-maker",
      "Your network and reputation",
    ],
    cta: "Join Referral Program",
    highlighted: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Share your experience",
    body: "A case study, a testimonial, a logo on our site, or a referral to another agency. Whatever you're comfortable with.",
  },
  {
    num: "02",
    title: "We cut your costs",
    body: "25-50% off platform fees, waived onboarding, lowest WhatsApp markup. Real savings, not symbolic discounts.",
  },
  {
    num: "03",
    title: "We both grow",
    body: "Your story brings us new clients. Your feedback makes the product better. Your savings make it sustainable.",
  },
];

const faqs = [
  { q: "Can I combine Design Partner and Referral Partner?", a: "Yes. Design Partners can also refer agencies and earn 15% rev share on each referred client. The programs stack." },
  { q: "What if our results aren't great? Do we still owe a case study?", a: "No. Content collaboration is only triggered by positive outcomes. If the platform isn't delivering, we'd rather fix the product than pressure you for a testimonial." },
  { q: "How long does the Design Partner discount last?", a: "6 months at 50% off (AED 399/mo). After that, you move to standard pricing or can transition to Growth Partner for 25% off permanently." },
  { q: "What does 'anonymized case study' mean?", a: "We share the results (e.g., 'Dubai agency reduced block rate from 12% to 1.3% in 6 weeks') without naming your company unless you explicitly approve a branded version." },
  { q: "Is the referral commission really recurring?", a: "Yes. For as long as the referred client remains a paying Sendara customer, you earn 15% of their monthly platform fee. No cap, no expiry." },
  { q: "Do I need to be a Sendara client to be a Referral Partner?", a: "No. Referral Partners don't need to use the platform themselves. That said, it's much easier to recommend something you've used." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/* ── Form state type ── */
interface PartnerForm {
  name: string;
  email: string;
  agency: string;
  tier: string;
  message: string;
}

const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:border-sendara-teal focus:ring-1 focus:ring-sendara-teal";

export default function PartnersContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<PartnerForm>({ name: "", email: "", agency: "", tier: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectTierAndScroll = (tierName: string) => {
    setForm(f => ({ ...f, tier: tierName }));
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-sendara-navy min-h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#0FB5BA 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32 text-center">
          <motion.div {...fadeUp}>
            <span className="font-body text-xs uppercase tracking-[3px] font-medium text-sendara-bright">
              PARTNER PROGRAM
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mt-6 mb-5"
          >
            Grow With Us.<br />
            <span className="text-sendara-bright">Pay Less.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Share your results. Shape our product. Get permanently discounted rates. We&apos;re building Sendara with the agencies who use it — and we reward every one of them.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#tiers"><Button size="lg">See Partner Tiers</Button></a>
            <a href="#apply"><Button variant="secondary" size="lg">Apply Now</Button></a>
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="bg-sendara-off-white py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4 mb-4">
              Your success is our best marketing.
            </h2>
            <p className="font-body text-base md:text-lg text-sendara-navy/60 max-w-xl mx-auto">
              We don&apos;t want your money for ads. We want your story. When Sendara works for you, sharing that result is worth more than any campaign we could run ourselves.
            </p>
          </motion.div>

          <div className="relative grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-7 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-sendara-teal to-sendara-bright opacity-25" />
            {steps.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-14 h-14 rounded-full bg-sendara-teal text-white flex items-center justify-center mx-auto mb-5 relative z-10 font-heading text-lg font-bold">
                  {s.num}
                </div>
                <h3 className="font-heading font-semibold text-xl text-sendara-navy mb-2">{s.title}</h3>
                <p className="font-body text-sm text-sendara-navy/60 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNER TIERS ═══ */}
      <section id="tiers" className="bg-white py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel>Partner Tiers</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4 mb-4">
              Choose your level of involvement.
            </h2>
            <p className="font-body text-base md:text-lg text-sendara-navy/60 max-w-xl mx-auto">
              More collaboration = more savings. Pick the tier that fits your comfort level. Upgrade or change anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-[1080px] mx-auto items-stretch">
            {tiers.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative flex flex-col rounded-2xl p-7 border transition-all duration-300 hover:border-sendara-teal hover:shadow-lg ${
                  t.highlighted
                    ? "border-2 border-sendara-teal shadow-lg md:scale-[1.03]"
                    : "border-gray-200"
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-px right-6">
                  <div className={`${t.badgeColor} text-white font-body text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-b-lg`}>
                    {t.badge}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-sendara-navy mb-1 mt-2">{t.name}</h3>
                <p className="font-body text-sm text-sendara-navy/60 leading-relaxed mb-5">{t.desc}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold text-sendara-navy">{t.price}</span>
                    {t.original && <span className="text-sm text-gray-400 line-through">{t.original}</span>}
                  </div>
                  <span className="font-body text-xs text-sendara-navy/60">{t.period}</span>
                </div>

                {/* What You Get */}
                <div className="mb-5">
                  <p className="font-body text-[11px] font-semibold tracking-widest text-sendara-teal uppercase mb-3">What You Get</p>
                  {t.benefits.map((b, j) => (
                    <div key={j} className="flex gap-2.5 mb-2.5">
                      <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-sendara-teal-light flex items-center justify-center mt-0.5">
                        <Check className="text-sendara-teal" size={12} />
                      </div>
                      <span className="font-body text-sm text-sendara-navy leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                {/* What You Provide */}
                <div className="bg-sendara-off-white rounded-xl p-4 mb-5 flex-grow">
                  <p className="font-body text-[11px] font-semibold tracking-widest text-sendara-navy/40 uppercase mb-2.5">What You Provide</p>
                  {t.youGive.map((y, j) => (
                    <div key={j} className="flex gap-2 mb-2">
                      <span className="text-gray-400 text-sm flex-shrink-0">&rarr;</span>
                      <span className="font-body text-[13px] text-sendara-navy/60 leading-snug">{y}</span>
                    </div>
                  ))}
                </div>

                {t.spots && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                    <span className="font-body text-xs font-semibold text-warning">{t.spots}</span>
                  </div>
                )}

                <Button
                  variant={t.highlighted ? "primary" : "outline"}
                  className="w-full"
                  onClick={() => selectTierAndScroll(t.name)}
                >
                  {t.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE BAND ═══ */}
      <section className="bg-sendara-navy py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mx-auto mb-5 opacity-20">
              <path d="M0 20C0 12 4 4 16 0L18 4C10 8 8 14 8 18H16V32H0V20ZM24 20C24 12 28 4 40 0L42 4C34 8 32 14 32 18H40V32H24V20Z" fill="#0FB5BA" />
            </svg>
            <p className="font-body text-lg md:text-xl text-white/60 italic leading-relaxed mb-6 max-w-2xl mx-auto">
              We don&apos;t believe in locking clients into 12-month contracts and hiding our pricing. If Sendara isn&apos;t delivering value, you should leave. Partners stay because the product works — and they pay less for proving it.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-sendara-teal flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-sendara-bright" />
              </div>
              <span className="font-heading text-sm font-light tracking-[3px] text-white/30">sendara</span>
              <span className="text-white/15 mx-1">|</span>
              <span className="text-white/20 text-xs">by Omnex</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="bg-sendara-off-white py-20 md:py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4">
              Common questions about partnerships.
            </h2>
          </motion.div>

          <div>
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border-b border-gray-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-center font-body text-base font-medium text-sendara-navy hover:text-sendara-teal transition-colors"
                >
                  <span className="pr-5">{f.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-sendara-teal flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? 200 : 0, paddingBottom: openFaq === i ? 20 : 0 }}
                >
                  <p className="font-body text-sm text-sendara-navy/60 leading-relaxed pr-10">{f.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ APPLICATION FORM ═══ */}
      <section id="apply" className="bg-sendara-navy py-20 md:py-24 lg:py-32">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="font-body text-xs uppercase tracking-[3px] font-medium text-sendara-bright">Apply</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-4 mb-4">
              Ready to partner?
            </h2>
            <p className="font-body text-base text-white/60">
              Tell us about your agency and which tier interests you. We&apos;ll follow up within 24 hours.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            {!submitted ? (
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-body text-xs font-medium text-sendara-navy mb-1.5">Your Name *</label>
                    <input
                      className={inputClasses}
                      type="text"
                      placeholder="Ahmed Al Maktoum"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-medium text-sendara-navy mb-1.5">Email *</label>
                    <input
                      className={inputClasses}
                      type="email"
                      placeholder="ahmed@agency.ae"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-medium text-sendara-navy mb-1.5">Agency Name *</label>
                    <input
                      className={inputClasses}
                      type="text"
                      placeholder="Your Real Estate Agency"
                      required
                      value={form.agency}
                      onChange={e => setForm(p => ({ ...p, agency: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-medium text-sendara-navy mb-1.5">Interested Tier *</label>
                    <select
                      className={`${inputClasses} text-sendara-navy/60`}
                      required
                      value={form.tier}
                      onChange={e => setForm(p => ({ ...p, tier: e.target.value }))}
                    >
                      <option value="" disabled>Select a tier...</option>
                      <option value="Design Partner">Design Partner — 50% off, 6 months</option>
                      <option value="Growth Partner">Growth Partner — 25% off, permanent</option>
                      <option value="Referral Partner">Referral Partner — 15% rev share</option>
                      <option value="Not sure">Not sure yet — tell me more</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-xs font-medium text-sendara-navy mb-1.5">
                      Anything else? <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      className={`${inputClasses} resize-y min-h-[100px]`}
                      placeholder="How many agents? What WhatsApp tools have you tried?"
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    />
                  </div>
                  {error && <p className="text-danger text-sm">{error}</p>}
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <p className="font-body text-center text-xs text-gray-400 mt-2">
                    We respond within 24 hours. No spam. No obligations.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-sendara-teal-light flex items-center justify-center mx-auto mb-5"
                >
                  <Check className="text-sendara-teal" size={32} />
                </motion.div>
                <h3 className="font-heading font-bold text-2xl text-sendara-navy mb-2">Application received!</h3>
                <p className="font-body text-base text-sendara-navy/60 leading-relaxed">
                  Thanks {form.name}. We&apos;ll review your application and get back to you within 24 hours.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
