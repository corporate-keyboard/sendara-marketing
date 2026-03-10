# CLAUDE.md — Sendara Marketing Site

## Project Overview
Marketing / landing page for Sendara — a WhatsApp & Telegram campaign engine for UAE real estate agencies. Goal: capture leads (demo requests + waitlist signups) before product launch. Single-page scrolling design with sticky nav.

## Brand Identity
- **Name**: Sendara (lowercase in wordmark: "sendara")
- **Parent**: by Omnex
- **Tagline**: "Campaign engine for UAE real estate"
- **Logo**: Concentric dot mark (outer: #0D7377, inner: #0FB5BA) + "sendara" in Plus Jakarta Sans 300, letter-spacing 3px
- **Tone**: Professional, confident, direct. Speaks to marketing managers who've been burned by WhatsApp blocks. No hype, no fluff.

## Tech Stack (Do NOT deviate)
- **Framework**: Next.js 14+ (App Router, TypeScript, `src/` directory, SSG)
- **Styling**: Tailwind CSS (extend with Sendara palette)
- **Animations**: Framer Motion (scroll-triggered, subtle)
- **Fonts**: Plus Jakarta Sans (headings, logo) + Inter (body) via next/font/google
- **Forms**: React Hook Form + Zod validation
- **Lead Storage**: Supabase (PostgreSQL)
- **Email**: Resend (confirmation to lead + notification to admin)
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel (auto-deploy from main)
- **Icons**: lucide-react

## Colour Palette (Tailwind Config)
```js
colors: {
  sendara: {
    navy: '#0D1B2A',      // Hero bg, footer, dark sections
    'deep-blue': '#1B4965', // Secondary text, gradients
    teal: '#0D7377',       // PRIMARY brand. CTAs, accents, links
    bright: '#0FB5BA',     // Hover states, highlights, animated elements
    'teal-light': '#E0F7FA', // Card backgrounds, badges
    'off-white': '#F8F9FA',  // Alternating section backgrounds
  },
  success: '#2D6A4F',     // Checkmarks, positive indicators
  danger: '#D62828',      // Block/problem indicators
  warning: '#E76F51',
}
```

## Typography
```js
// next/font/google in layout.tsx
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700', '800'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

// Tailwind extend
fontFamily: {
  heading: ['var(--font-heading)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
```

**Usage rules:**
- H1: font-heading font-bold text-5xl md:text-6xl lg:text-7xl
- H2: font-heading font-bold text-3xl md:text-4xl
- H3: font-heading font-semibold text-xl md:text-2xl
- Body: font-body text-base md:text-lg
- Caption/Label: font-body text-xs uppercase tracking-[3px] font-medium
- Logo wordmark: font-heading font-light tracking-[3px]

## Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: fonts, meta, analytics
│   ├── page.tsx             # Main landing page (imports all sections)
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/
│       └── leads/route.ts   # Server action: validate, store, email
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── Comparison.tsx
│   │   ├── Stats.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── LeadCapture.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── Logo.tsx          # SVG logo component with variants
│   │   └── DotMark.tsx       # SVG dot mark component
│   └── mockups/
│       ├── DashboardMockup.tsx    # Abstract dashboard visual for hero
│       ├── WarmupTimeline.tsx     # Warm-up phases visual
│       ├── QualityCard.tsx        # Quality rating card mockup
│       ├── BeforeAfter.tsx        # Template before/after visual
│       └── ContactList.tsx        # Contact warmth tier visual
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── resend.ts            # Resend email client
│   ├── schemas.ts           # Zod schemas for forms
│   └── constants.ts         # Feature lists, FAQ data, pricing data
└── types/
    └── index.ts
```

## Page Sections (in scroll order)
1. **Navbar** — Transparent → white on scroll. Anchor links. Mobile hamburger.
2. **Hero** — Navy bg. "Stop Getting Blocked on WhatsApp." Two-col with animated mockup.
3. **Pain Points** — White bg. 3 stat cards with animated counters. Agitate the problem.
4. **How It Works** — Off-white bg. 3-step timeline: Connect → Create → Scale.
5. **Features** — White bg. 6 features, alternating left-right with abstract mockups.
6. **Comparison** — Off-white bg. Table: "Generic Tools" vs "Sendara". Checkmarks/X.
7. **Stats Band** — Navy bg. 4 animated stats + testimonial quote.
8. **Pricing** — White bg. 3 cards (Starter/Growth/Enterprise). Growth highlighted.
9. **FAQ** — Off-white bg. 8-question accordion. Max-width 720px centered.
10. **Lead Capture** — Navy bg. Two cards: Demo form (5 fields) + Waitlist form (2 fields).
11. **Footer** — Navy bg. 4-column grid. Logo, links, legal, socials.

## Design Rules
- Dark hero, light body, dark stats band, dark CTA/footer = visual rhythm
- Section padding: py-20 md:py-24 lg:py-32
- Content max-width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Alternating backgrounds: white → off-white → white → off-white (except navy sections)
- Framer Motion: fade-up on scroll (y: 30 → 0, opacity: 0 → 1, duration: 0.6)
- NO stock photos. Use SVG/CSS abstract visuals and product mockups only.
- Mobile-first. 65%+ of UAE RE professionals browse on mobile.

## Hero Copy (Use Verbatim)
- Eyebrow: "FOR UAE REAL ESTATE AGENCIES"
- H1: "Stop Getting Blocked on WhatsApp."
- Sub: "Sendara is the campaign engine that fills your pipeline and keeps your number alive. Automated warm-up, smart throttling, and AI-optimized templates — built for real estate."
- CTA Primary: "Book a Demo"
- CTA Secondary: "Join Early Access"

## Pain Point Stats
- "73%" — of agencies have been flagged/restricted
- "7 days" — for Low quality to permanently drop tier
- "AED 0" — what banned campaigns earn

## How It Works Steps
1. "Connect & Import" — Connect WA number, import contacts, auto-segment by warmth
2. "Create & Launch" — AI templates, pick audience, auto warm-up + throttling
3. "Scale Safely" — Real-time quality monitoring, auto-pause before damage

## Features (6 total)
1. Warm-Up Automation Engine
2. Quality Shield (auto-throttle)
3. AI Template Optimizer
4. Smart Segmentation (P1–P4 warmth tiers)
5. Telegram Campaigns
6. Works With Your CRM (not a replacement)

## Pricing
- Starter: AED 499/mo — 1 WA number, 2K contacts, 3 campaigns/mo
- Growth: AED 799/mo — MOST POPULAR — unlimited campaigns, AI optimizer, Telegram, CRM webhooks, 10K contacts
- Enterprise: Custom — multi-number, white-label, dedicated AM

## FAQ (8 questions — see PRD for full answers)
1. Do I need to switch my CRM?
2. Will Sendara guarantee no blocks?
3. How long does warm-up take?
4. What if quality rating drops?
5. Arabic support?
6. Contract length?
7. How different from Wati/Respond.io?
8. Telegram only?

## Lead Capture Forms

### Demo Form
Fields: name (required), email (required), agency_name (required), phone (required, +971 prefix), agents_count (required, dropdown)
Submit → /api/leads → Supabase insert (type: 'demo') → Resend confirmation + admin notification

### Waitlist Form
Fields: email (required), agency_name (optional)
Submit → /api/leads → Supabase insert (type: 'waitlist') → Resend confirmation + admin notification

### On Submit Success
Replace form with animated checkmark + "You're in! We'll be in touch shortly."
Track conversion event in analytics.

## Supabase Schema
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'demo' | 'waitlist'
  name TEXT,
  email TEXT NOT NULL,
  agency_name TEXT,
  phone TEXT,
  agents_count TEXT,
  source TEXT DEFAULT 'website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Email Templates (Resend)

### Lead Confirmation
Subject: "Welcome to Sendara — We'll be in touch!"
Body: Sendara logo, thank you message, what to expect next.
- Demo: "We'll reach out within 24 hours to schedule your 15-minute demo."
- Waitlist: "You're on the list. We'll notify you as soon as early access opens."

### Admin Notification
To: amar@omnex email
Subject: "New [Demo/Waitlist] Lead: [Agency Name]"
Body: All form data, lead type, timestamp, UTM params.

## SEO
- Title: "Sendara — WhatsApp Campaign Engine for UAE Real Estate | Stop Getting Blocked"
- Description: "Sendara protects your WhatsApp number while scaling campaigns. Automated warm-up, AI templates, and real-time quality monitoring for UAE real estate agencies."
- OG Image: 1200x630, navy bg, logo + tagline + abstract dashboard
- Structured Data: Organization + FAQ schema (JSON-LD)
- Target keywords: "whatsapp campaign real estate dubai", "whatsapp blocked real estate uae"

## Environment Variables (.env.example)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=
NEXT_PUBLIC_APP_URL=
```

## Build Phases

### Phase 1: Foundation & Hero (~3 hours)
- M1-T01: Project scaffolding, Tailwind config, fonts
- M1-T02: Navbar (transparent → white, mobile hamburger)
- M1-T03: Hero section (navy bg, animated mockup, CTAs)

### Phase 2: Content Sections (~4 hours)
- M2-T01: Pain Points (animated counters, 3-col cards)
- M2-T02: How It Works (3-step timeline with animation)
- M2-T03: Features (6 features, alternating layout with mockups)
- M2-T04: Comparison table (checkmarks/X, mobile cards)

### Phase 3: Conversion & Trust (~3 hours)
- M3-T01: Stats band (navy, animated counters, testimonial)
- M3-T02: Pricing cards (3 tiers, Growth highlighted)
- M3-T03: FAQ accordion (8 Q&As, smooth animation)
- M3-T04: Lead capture forms (Supabase + Resend pipeline)

### Phase 4: Footer, SEO & Polish (~2 hours)
- M4-T01: Footer (4-column, navy)
- M4-T02: SEO meta tags, OG image, structured data, sitemap
- M4-T03: Privacy + Terms pages
- M4-T04: Lighthouse audit, animation polish, cross-browser

## Key Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "react-hook-form": "^7.0.0",
  "@hookform/resolvers": "latest",
  "zod": "latest",
  "@supabase/supabase-js": "latest",
  "resend": "latest",
  "lucide-react": "latest",
  "next-sitemap": "latest"
}
```

---

## WhatsApp API Knowledge Base

Two reference files are included in this project root:

### WHATSAPP_API_KNOWLEDGE.md
The master knowledge base covering ALL Meta WhatsApp Business API rules. Claude Code MUST reference this file when building any feature related to:
- Warm-up engine logic and phase transitions
- Quality rating monitoring and auto-throttle
- Template analyzer / message scorer
- Campaign sequencing and batch scheduling
- Contact warmth scoring algorithm
- Dashboard metrics and health indicators
- Error handling and retry logic
- Pricing calculations
- Opt-out detection

### whatsapp_rules.json
Structured rules data that the product code imports directly. Contains:
- Tier definitions and upgrade criteria
- Template scoring rubric (spam signals, quality bonuses, grades)
- Warm-up phase configurations (daily limits, batch sizes, allowed tiers)
- Contact warmth tier definitions
- Auto-throttle rules
- Error code handlers
- Opt-out keywords (English + Arabic)
- UAE pricing rates with Sendara markup
- Policy changelog

**Usage in code:**
```typescript
import rules from '@/lib/whatsapp-rules.json';

// Access tier info
const tier2Limit = rules.tiers.tier_2.unique_users_24h; // 10000

// Check spam words
const isSpamWord = (word: string) =>
  rules.template_rejection_rules.spam_trigger_words.includes(word.toUpperCase());

// Get warmup phase config
const phase = rules.warmup_phases[`phase_${agency.warmup_phase}`];
const dailyMax = phase.daily_max;

// Check error handling
const errorAction = rules.error_codes["131049"].action; // "retry_next_day"
```

**IMPORTANT:** When Meta changes their policies, update BOTH files and bump the version. The product should display the `last_updated` date from the JSON in the dashboard so agencies know the rules are current.
