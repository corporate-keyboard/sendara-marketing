import type { PricingTier, FAQItem, Feature, Step } from "@/types";

export const FEATURES: Feature[] = [
  {
    title: "Warm-Up Automation Engine",
    description: "Start with 50 messages/day, scale to 1,000+ without triggering Meta's spam filters. Sendara mirrors human sending patterns with randomized intervals, reply handling, and gradual volume increases across 5 calibrated phases.",
    icon: "Flame",
  },
  {
    title: "Quality Shield",
    description: "Real-time monitoring of your WhatsApp quality rating. The moment your score dips, Sendara auto-throttles volume, pauses risky segments, and alerts your team — before Meta downgrades your number.",
    icon: "Shield",
  },
  {
    title: "AI Template Optimizer",
    description: "Paste your campaign brief. Sendara's AI generates message variants optimized for deliverability and engagement — with automatic personalization tokens, emoji calibration, and Arabic/English support.",
    icon: "Sparkles",
  },
  {
    title: "Smart Segmentation",
    description: "Every contact gets a warmth score (P1–P4) based on recency, reply history, and engagement. Sendara auto-routes warm contacts into high-volume campaigns and keeps cold leads in drip sequences.",
    icon: "Users",
  },
  {
    title: "Telegram Campaigns",
    description: "Run parallel campaigns on Telegram with the same contact lists, templates, and scheduling. No warm-up needed — Telegram has no quality rating system. Perfect overflow channel when WhatsApp capacity is limited.",
    icon: "Send",
  },
  {
    title: "Works With Your CRM",
    description: "Sendara is not a CRM. It plugs into yours. Sync contacts via CSV import or webhook, push campaign results back to your CRM, and keep your existing workflow intact. No lock-in, no migration headaches.",
    icon: "Link",
  },
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Connect & Import",
    description: "Connect your WhatsApp Business number, import contacts from your CRM, and Sendara auto-segments them by warmth tier.",
  },
  {
    number: "02",
    title: "Create & Launch",
    description: "Use AI to generate templates, pick your audience segment, and launch. Sendara handles warm-up scheduling and throttling automatically.",
  },
  {
    number: "03",
    title: "Scale Safely",
    description: "Real-time quality monitoring watches your number health. Auto-pause kicks in before any damage. Scale from 50 to 1,000+ messages/day safely.",
  },
];

export const PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "AED 499",
    period: "/mo",
    description: "For agencies getting started with WhatsApp campaigns",
    features: [
      "1 WhatsApp number",
      "2,000 contacts",
      "3 campaigns per month",
      "Warm-up automation",
      "Quality monitoring",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: "AED 799",
    period: "/mo",
    description: "For agencies scaling their outreach",
    features: [
      "1 WhatsApp number",
      "10,000 contacts",
      "Unlimited campaigns",
      "AI Template Optimizer",
      "Telegram campaigns",
      "CRM webhooks",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large brokerages & developers",
    features: [
      "Multiple WhatsApp numbers",
      "Unlimited contacts",
      "White-label option",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Do I need to switch my CRM?",
    answer: "No. Sendara is a campaign engine, not a CRM. It connects to your existing system via CSV import or webhooks. Your contacts, deals, and pipelines stay where they are.",
  },
  {
    question: "Will Sendara guarantee I won't get blocked?",
    answer: "No platform can override Meta's enforcement — but Sendara dramatically reduces the risk. We automate warm-up, monitor quality scores in real-time, and auto-pause campaigns before Meta takes action. Our customers consistently maintain Green quality ratings.",
  },
  {
    question: "How long does warm-up take?",
    answer: "A fresh number takes 14–21 days to reach full sending capacity through our 5-phase warm-up process. An established number with Green quality rating can start campaigns immediately with volume controls.",
  },
  {
    question: "What happens if my quality rating drops?",
    answer: "Sendara detects the drop instantly and auto-throttles your sending volume. It pauses risky segments, alerts your team, and switches to a recovery protocol to restore your rating before Meta restricts your number.",
  },
  {
    question: "Does it support Arabic?",
    answer: "Yes. Templates, AI generation, and the campaign interface all support Arabic and English. RTL layout is handled automatically in message previews.",
  },
  {
    question: "Is there a contract?",
    answer: "No long-term contracts. All plans are month-to-month. Enterprise plans can include annual agreements with discounted rates if preferred.",
  },
  {
    question: "How is this different from Wati or Respond.io?",
    answer: "Wati and Respond.io are conversation platforms — they focus on inbox management and chatbots. Sendara is a campaign engine focused on outbound at scale. We specialize in warm-up, quality protection, and safe volume scaling — features those platforms don't offer.",
  },
  {
    question: "Can I use it for Telegram only?",
    answer: "Yes. If you don't need WhatsApp campaigns, you can use Sendara purely as a Telegram campaign tool. Telegram has no warm-up requirements, so you can start sending immediately.",
  },
];

export const COMPARISON_ROWS = [
  { feature: "Warm-Up Automation", sendara: true, generic: false },
  { feature: "Quality Monitoring", sendara: true, generic: false },
  { feature: "Auto-Throttle", sendara: true, generic: false },
  { feature: "AI Templates", sendara: true, generic: true },
  { feature: "Warmth Scoring", sendara: true, generic: false },
  { feature: "Block Rate Monitoring", sendara: true, generic: false },
  { feature: "Real Estate Specific", sendara: true, generic: false },
  { feature: "Telegram Campaigns", sendara: true, generic: false },
  { feature: "CRM Lock-in", sendara: false, generic: true },
  { feature: "Long-term Contract", sendara: false, generic: true },
];

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
