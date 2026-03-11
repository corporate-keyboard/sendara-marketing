"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Feature data ── */
const liveFeatures = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v22M3 14h22" stroke="#0D7377" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="11" stroke="#0D7377" strokeWidth="2" />
      </svg>
    ),
    title: "Warm-Up Automation Engine",
    desc: "8-phase warm-up that scales your WhatsApp number from 250 to 10,000+ messages per day. Sends warmest contacts first, auto-adjusts daily limits.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C8.477 3 4 7.477 4 13s4.477 10 10 10 10-4.477 10-10" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 8v5l3.5 3.5" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="6" r="4" fill="#2D6A4F" />
        <path d="M20.5 6l1 1 2-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Quality Shield",
    desc: "Monitors your quality rating every 30 minutes. Auto-throttles on Medium, pauses all campaigns on Low. Recovers automatically when quality improves.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke="#0D7377" strokeWidth="2" />
        <path d="M8 14h4M8 18h8" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21" cy="10" r="3" fill="#0FB5BA" />
        <path d="M19.8 10l.8.8 1.6-1.6" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Template Optimizer",
    desc: "Paste your template, get a compliance score (0-100) and AI-optimized rewrite. Detects spam triggers, missing personalization, and opt-out gaps.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="8" cy="10" r="4" stroke="#0D7377" strokeWidth="2" />
        <circle cx="20" cy="10" r="4" stroke="#0D7377" strokeWidth="2" />
        <circle cx="14" cy="20" r="4" stroke="#0D7377" strokeWidth="2" />
        <path d="M10.5 12.5l2 4M17.5 12.5l-2 4" stroke="#0FB5BA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Contact Segmentation",
    desc: "Auto-scores contacts into P1-P4 warmth tiers. Sends safest first. Cold contacts (P4) are blocked from WhatsApp and routed to Meta ad campaigns instead.",
  },
];

interface RoadmapFeature {
  status: "building" | "planned" | "exploring";
  statusLabel: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: string[];
  fine: string;
}

const comingSoon: RoadmapFeature[] = [
  {
    status: "building",
    statusLabel: "In Development",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="#0D7377" strokeWidth="2" />
        <path d="M10 16h12M16 10v12" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="8" width="6" height="4" rx="1" fill="#E0F7FA" stroke="#0D7377" strokeWidth="1" />
      </svg>
    ),
    title: "Trakheesi Permit Validator",
    desc: "Every WhatsApp campaign and listing message will be auto-checked for a valid Trakheesi permit number and QR code before sending. Missing or expired permits block the send and alert the agent.",
    details: [
      "Auto-detect Trakheesi permit number in message templates",
      "Validate permit against DLD database (active/expired)",
      "Block campaign sends if permit is missing or expired",
      "Dashboard showing permit status for all active listings",
      "Alerts 7 days before permit expiry",
    ],
    fine: "AED 50,000 first offence. AED 100,000 repeat + license suspension.",
  },
  {
    status: "building",
    statusLabel: "In Development",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.5 5 5.5.8-4 3.9.9 5.5L16 16.7l-4.9 2.5.9-5.5-4-3.9 5.5-.8z" stroke="#0D7377" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 24h16" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 28h12" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Form A/B Compliance Gate",
    desc: "Before any sales listing campaign is created, Sendara will require confirmation that a valid Form A (seller-agent agreement) exists. No Form A, no campaign.",
    details: [
      "Mandatory Form A confirmation on campaign creation for sales listings",
      "Upload Form A document for audit trail",
      "Expiry tracking \u2014 alerts when Form A needs renewal",
      "Form B confirmation for buyer-agent relationships",
      "Compliance log exportable for RERA audits",
    ],
    fine: "Ad removal + fines. Repeat violations risk license suspension.",
  },
  {
    status: "planned",
    statusLabel: "Q3 2026",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="#0D7377" strokeWidth="2" />
        <circle cx="16" cy="12" r="4" stroke="#0D7377" strokeWidth="1.5" />
        <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 4v3M20 4v3" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "RERA Broker License Tracker",
    desc: "Track every agent\u2019s RERA broker card expiry, CPD training status, and registration validity. Auto-alerts before deadlines.",
    details: [
      "Per-agent license expiry tracking with countdown",
      "CPD training completion monitoring",
      "Auto-email alerts: 30 days, 14 days, 7 days before expiry",
      "Agency-wide compliance dashboard \u2014 green/yellow/red status",
      "Exportable compliance report for RERA inspections",
    ],
    fine: "Operating with expired licenses: AED 10,000+ fines per agent.",
  },
  {
    status: "planned",
    statusLabel: "Q3 2026",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6l-10 6v8c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12v-8l-10-6z" stroke="#0D7377" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 16l3 3 5-6" stroke="#0FB5BA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Data Privacy Compliance (UAE PDPL)",
    desc: "Manage opt-in consent, data retention, and deletion requests for every contact. Full audit trail for UAE Personal Data Protection Law compliance.",
    details: [
      "Per-contact consent tracking with timestamp and source",
      "Automated data retention policies (auto-archive after X days)",
      "Data Subject Access Requests (DSAR) handler",
      "Right-to-delete workflow \u2014 removes contact across all systems",
      "Consent audit log exportable for regulators",
    ],
    fine: "UAE PDPL penalties: up to AED 5 million for violations.",
  },
  {
    status: "planned",
    statusLabel: "Q4 2026",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 8h20v18H6z" stroke="#0D7377" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 13h20" stroke="#0D7377" strokeWidth="2" />
        <path d="M11 4v4M21 4v4" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 18h3M11 22h6" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="22" r="5" fill="#E0F7FA" stroke="#0D7377" strokeWidth="1.5" />
        <path d="M20.5 22l1 1 2-2" stroke="#0D7377" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Portal Listing Sync",
    desc: "Sync campaign data with Bayut, Property Finder, and Dubizzle compliance requirements. Auto-verify Trakheesi permits match portal listings.",
    details: [
      "Cross-reference campaigns with portal listing permits",
      "Flag mismatches between campaign properties and portal ads",
      "Auto-check listing status on major portals",
      "Unified compliance view: WhatsApp + portals + social",
      "Bulk permit renewal reminders for all listed properties",
    ],
    fine: "Non-compliant portal listings: immediate removal + DLD fines.",
  },
  {
    status: "exploring",
    statusLabel: "2027",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#0D7377" strokeWidth="2" />
        <path d="M16 10v6l4 4" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 5l-3-2M24 5l3-2" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "AML/KYC Screening",
    desc: "Automated customer due diligence for real estate transactions. Screen contacts against sanctions lists and PEP databases.",
    details: [
      "Automated screening against UAE Central Bank sanctions list",
      "PEP (Politically Exposed Persons) database checks",
      "Enhanced Due Diligence triggers for high-value transactions",
      "Suspicious Transaction Report (STR) workflow",
      "Compliance officer dashboard and audit trail",
    ],
    fine: "UAE AML violations: criminal penalties + unlimited fines.",
  },
];

const statusStyles: Record<string, { dot: string; bg: string; text: string }> = {
  building: { dot: "bg-sendara-teal", bg: "bg-sendara-teal-light", text: "text-sendara-teal" },
  planned: { dot: "bg-sendara-deep-blue", bg: "bg-blue-50", text: "text-sendara-deep-blue" },
  exploring: { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-500" },
};

/* ── Page ── */
export default function CompliancePage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-sendara-navy pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #0FB5BA 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <SectionLabel>Compliance Suite</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[52px] text-white leading-tight mt-6 mb-5">
              WhatsApp compliance<br />is just the <span className="text-sendara-bright">beginning.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-body text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-9">
              Sendara started with protecting your WhatsApp number. We&apos;re expanding to cover every compliance layer UAE real estate agencies face &mdash; from Trakheesi permits to RERA licensing to data privacy.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={() => scrollTo("roadmap")}>See the Roadmap</Button>
              <Button variant="secondary" onClick={() => scrollTo("notify")}>Get Notified on Launch</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LIVE NOW ═══ */}
      <section id="live" className="bg-sendara-off-white py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-14">
              <SectionLabel>Live Now</SectionLabel>
              <h2 className="font-heading font-bold text-3xl sm:text-[38px] text-sendara-navy mt-4 mb-4">
                What&apos;s already protecting your number.
              </h2>
              <p className="font-body text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                These features are live today for all Sendara clients.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {liveFeatures.map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-sendara-bright/40 hover:shadow-lg hover:shadow-sendara-bright/5 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-12 h-12 rounded-xl bg-sendara-teal-light flex items-center justify-center shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-green-50 rounded-full px-2.5 py-0.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="font-body text-[10px] font-semibold text-success uppercase tracking-wider">Live</span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-sendara-navy">{f.title}</h3>
                    </div>
                  </div>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section id="roadmap" className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-14">
              <SectionLabel>Roadmap</SectionLabel>
              <h2 className="font-heading font-bold text-3xl sm:text-[38px] text-sendara-navy mt-4 mb-4">
                What&apos;s coming next.
              </h2>
              <p className="font-body text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                Every compliance layer UAE real estate agencies face &mdash; automated, monitored, and built into your campaign workflow.
              </p>
            </div>
          </FadeUp>

          <div className="max-w-3xl mx-auto space-y-4">
            {comingSoon.map((feat, i) => {
              const s = statusStyles[feat.status];
              const isOpen = expanded === i;
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-sendara-teal/30 hover:shadow-md transition-all duration-300 overflow-hidden">
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full text-left p-6 flex items-start gap-5 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl bg-sendara-off-white flex items-center justify-center shrink-0 border border-gray-100">
                        {feat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                          <div className={`inline-flex items-center gap-1.5 ${s.bg} rounded-full px-2.5 py-0.5`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            <span className={`font-body text-[10px] font-semibold ${s.text} uppercase tracking-wider`}>
                              {feat.statusLabel}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-heading font-bold text-xl text-sendara-navy mb-1.5">{feat.title}</h3>
                        <p className="font-body text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                      </div>
                      <ChevronDown
                        className={`shrink-0 mt-1 text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        size={20}
                      />
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? 400 : 0 }}
                    >
                      <div className="px-6 pb-6 pl-[6.25rem]">
                        <div className="space-y-2 mb-4">
                          {feat.details.map((d, j) => (
                            <div key={j} className="flex gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-sendara-teal-light flex items-center justify-center shrink-0 mt-0.5">
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                  <path d="M5 8.2l2 2 4-4" stroke="#0D7377" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="font-body text-sm text-sendara-navy/80 leading-snug">{d}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-red-50 border-l-[3px] border-danger rounded-lg px-4 py-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M7 1l6 11H1L7 1z" fill="#D62828" />
                              <path d="M7 5v3M7 9.5v.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <span className="font-body text-[11px] font-semibold text-danger uppercase tracking-wider">Non-Compliance Risk</span>
                          </div>
                          <p className="font-body text-xs text-gray-500 leading-snug">{feat.fine}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY BAND ═══ */}
      <section className="bg-sendara-navy py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mx-auto mb-5 opacity-20">
              <path d="M0 20C0 12 4 4 16 0L18 4C10 8 8 14 8 18H16V32H0V20ZM24 20C24 12 28 4 40 0L42 4C34 8 32 14 32 18H40V32H24V20Z" fill="#0FB5BA" />
            </svg>
            <p className="font-body text-lg sm:text-xl text-white/50 italic leading-relaxed max-w-2xl mx-auto mb-6">
              Compliance isn&apos;t a feature you add later. It&apos;s the reason your business stays open. Every fine, every blocked number, every pulled listing is a compliance failure that was preventable. That&apos;s what Sendara is building toward &mdash; a single platform where UAE agencies never have to worry about compliance again.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <span className="font-heading text-sm text-white/25 font-light tracking-widest">sendara</span>
              <span className="text-white/10 mx-1">|</span>
              <span className="text-white/15 text-xs">by Omnex</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ NOTIFY ═══ */}
      <section id="notify" className="bg-sendara-off-white py-24">
        <div className="max-w-lg mx-auto px-4 text-center">
          <FadeUp>
            <SectionLabel>Stay Updated</SectionLabel>
            <h2 className="font-heading font-bold text-3xl sm:text-[38px] text-sendara-navy mt-4 mb-4">
              Get notified when new features launch.
            </h2>
            <p className="font-body text-base text-gray-500 leading-relaxed mb-9">
              Drop your email and we&apos;ll let you know when each compliance feature goes live. No spam &mdash; just launch updates.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
                className="flex gap-2.5 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="you@agency.ae"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 border border-gray-200 rounded-lg font-body text-sm text-sendara-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sendara-teal/20 focus:border-sendara-teal transition-all"
                />
                <Button type="submit" size="md">Notify Me</Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2.5 animate-[popIn_0.5s_ease_forwards]">
                <div className="w-9 h-9 rounded-full bg-sendara-teal-light flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-body text-base text-sendara-teal font-semibold">
                  You&apos;re on the list. We&apos;ll keep you posted.
                </span>
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
