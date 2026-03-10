# WhatsApp Business API — Master Knowledge Base
## Sendara Internal Reference | Last Updated: March 2026

> This document is the single source of truth for all WhatsApp Business API rules, limits, quality signals, template guidelines, pricing, and compliance requirements. It powers Sendara's warm-up engine, quality shield, message analyzer, and campaign sequencer. Claude Code and the product's AI layer should reference this document for all WhatsApp-related logic.

---

## 1. MESSAGING LIMITS & TIER SYSTEM

### 1.1 Tier Structure (Current as of 2026)

| Tier | Unique Users / 24hr Rolling | Throughput (MPS) | How to Reach |
|------|----------------------------|-----------------|--------------|
| **Tier 0** | 250 | ~80 | Default for unverified business portfolios |
| **Tier 1** | 1,000 | ~80 | Complete Business Verification OR send 1,000 delivered templates to unique users in 30 days with high quality |
| **Tier 2** | 10,000 | ~80 | Automatic: 50%+ of Tier 1 limit used in last 7 days + High quality rating |
| **Tier 3** | 100,000 | ~80 | Automatic: 50%+ of Tier 2 limit used in last 7 days + High quality rating |
| **Tier 4 (Unlimited)** | Unlimited | Up to 1,000 | Automatic: 50%+ of Tier 3 limit used in last 7 days + High quality rating |

### 1.2 Critical Rules

- **Portfolio-Level Limits (since October 7, 2025):** Messaging limits are calculated at the BUSINESS PORTFOLIO level, not per phone number. All numbers within the same Meta Business Portfolio share a single messaging capacity.
- **Inheritance:** When a new number is added to a portfolio that already has a high tier, the new number instantly inherits that tier's limit. No separate warm-up needed IF the portfolio is already established.
- **The Flip Side:** Poor performance on ANY number in the portfolio can drag down the limit for ALL numbers. One bad campaign on number 3 can jeopardize Tier 3 on number 1.
- **6-Hour Upgrade Checks:** Meta evaluates tier upgrade eligibility every 6 hours (previously was 24-48 hours). This means a tier upgrade can happen within hours of meeting criteria.
- **Upgrade Criteria (Tier 2+):**
  1. High message quality rating across all phone numbers and templates
  2. At least 50% of current portfolio limit used within the last 7 days
- **Scaling to 2,000 (from Tier 0/1):** Can be achieved via ANY of these paths:
  1. Complete Business Verification in Meta Business Manager
  2. Partner-Led Business Verification (PLBV) via a BSP like 360dialog
  3. Send 2,000 delivered messages (outside service window) to unique users within 30-day rolling period using high-quality templates
- **What Counts Toward Limits:** Only business-initiated template messages to unique users count. Customer-initiated service conversations within the 24-hour window do NOT count.
- **Rolling 24-Hour Window:** The limit is a rolling 24-hour period, not a calendar day reset.

### 1.3 Throughput (Messages Per Second)

- Standard accounts (Tier 0–3): ~80 MPS
- Unlimited tier (Tier 4) with stable quality: automatically upgraded to up to 1,000 MPS
- Practical impact: At 80 MPS, a 50,000-recipient campaign takes ~10.4 minutes. At 1,000 MPS, it takes ~50 seconds.
- If you hit throughput limits, the API returns HTTP 429 (rate limited). Build a queue to throttle.
- Concurrent rate limiting also exists: if the system is under heavy load, API returns HTTP 503.

### 1.4 Sendara Implementation Notes

```
WARM-UP ENGINE LOGIC:
- Phase 0 (Days 1-2): Setup only. 0 sends. Connect API, verify business.
- Phase 1 (Week 1): 10-50/day. Known contacts ONLY (P1). Goal: establish quality signals.
- Phase 2 (Week 2): 50-150/day. Expand to P2 (semi-warm). Monitor quality daily.
- Phase 3 (Week 3): 150-500/day. Push toward 50% of Tier 1 limit over 7 days.
- Phase 4 (Week 4): 500-1,000/day. Trigger Tier 1→2 upgrade check.
- Phase 5 (Week 5-6): 1,000-5,000/day. Scale within Tier 2. Maintain 50%+ usage.
- Phase 6 (Week 7-8): 5,000-10,000/day. Trigger Tier 2→3 upgrade.
- Phase 7 (Week 9+): 10,000+ /day. Full campaign mode.

DAILY LIMIT CALCULATION:
  daily_limit = min(
    warmup_phase_max,           // Phase-defined max
    current_tier_limit * 0.8,   // Never exceed 80% of tier to leave headroom
    quality_adjusted_limit      // Reduced if quality is Medium
  )

BATCH SCHEDULING:
- Never send all messages in one burst
- Spread across 4-8 hour window
- Send to P1 contacts first, P2 second, P3 last
- Minimum 15-minute gap between batches
- Batch sizes: Phase 1-2 = 10-25 per batch, Phase 3-4 = 50-100, Phase 5+ = 200-500
```

---

## 2. QUALITY RATING SYSTEM

### 2.1 Phone Number Quality Rating

Meta assigns a quality rating to each phone number based on how recipients have received messages over the **past 7 days**, weighted by recency.

| Rating | Color | Meaning | Impact |
|--------|-------|---------|--------|
| **High** | Green | Recipients find messages helpful and relevant | Can upgrade tiers. All systems normal. |
| **Medium** | Yellow | Messages sometimes ignored or blocked | Cannot upgrade tiers. Warning state. Sendara should auto-reduce volume 50%. |
| **Low** | Red | Significant negative feedback from recipients | Tier downgrade imminent. Sendara should pause all campaigns immediately. |

### 2.2 Phone Number Status

| Status | Trigger | Effect | Recovery |
|--------|---------|--------|----------|
| **Connected** | Normal operation | Can send messages, can upgrade tiers | N/A |
| **Flagged** | Quality rating reaches Low | Cannot upgrade tiers. 7-day grace period starts. | If quality improves to High/Medium within 7 days → returns to Connected, tier unchanged. If still Low after 7 days → returns to Connected but tier drops one level. |
| **Restricted** | Reached messaging limit | Cannot send more messages until limit resets | Wait for 24-hour rolling window to pass |

### 2.3 Quality Signals (What Meta Measures)

Meta does NOT publish exact weights, but these are the known signals:

1. **Block Rate** — #1 most important signal. Users blocking your number after receiving a message. DANGER ZONE: >2% block rate.
2. **Report Rate** — Users reporting your messages as spam. Even worse than blocks.
3. **Read Rate** — What percentage of sent messages are read. Good: 65-80%+. Bad: <40%.
4. **Reply Rate** — Users responding to your messages. Higher = better quality signal.
5. **Reasons for Blocking** — When users block, WhatsApp asks why. "Didn't sign up" and "Too many messages" are strong negative signals.
6. **Template Quality** — Individual template performance. If a template gets too many blocks/reports, it gets paused/disabled independently.
7. **Opt-in Compliance** — Whether users actually opted in to receive messages.

### 2.4 Template Quality Rating

Each approved template has its own quality rating:

| Status | Meaning | Can Send? |
|--------|---------|-----------|
| **Active — Quality Pending** | New template, no feedback yet | Yes |
| **Active — High Quality** | Little/no negative feedback | Yes |
| **Active — Medium Quality** | Some negative feedback, may be paused soon | Yes (but monitor closely) |
| **Active — Low Quality** | Significant negative feedback, danger of pausing | Yes (but should stop using) |
| **Paused** | Auto-paused by Meta due to sustained negative feedback | **No** — cannot send until updated |
| **Disabled** | Permanently disabled | **No** — must create new template |

**Critical:** A template's quality rating declining can also negatively affect the phone number's overall quality rating.

### 2.5 Sendara Quality Shield Logic

```
QUALITY MONITORING (poll every 30 minutes):
  GET quality_rating from WhatsApp Business Manager API
  Store in quality_logs table (agency_id, quality_rating, tier, daily_usage, block_rate_pct, recorded_at)

AUTO-THROTTLE RULES:
  IF quality_rating changes from HIGH → MEDIUM:
    - Set daily_limit = current_phase_default * 0.5 (50% reduction)
    - Alert admin via Telegram + email
    - Log: "Quality dropped to MEDIUM. Volume reduced 50%."
    - DO NOT pause campaigns, just throttle

  IF quality_rating changes to LOW:
    - Set daily_limit = 0
    - Pause ALL active campaigns immediately
    - Alert admin: URGENT — quality LOW, all campaigns paused
    - Log: "Quality dropped to LOW. All campaigns paused."

  IF quality_rating changes from LOW → MEDIUM or HIGH:
    - Restore daily_limit to phase default
    - Resume campaigns at 50% volume for 48 hours, then full
    - Alert admin: "Quality recovered. Resuming at 50%."

  IF block_rate > 2% in any single batch:
    - Pause THAT campaign immediately
    - Alert admin with batch details
    - Flag the template used for review

  IF block_rate > 1.5% cumulative for the day:
    - Reduce remaining batches by 50%
    - Alert admin

TIER MONITORING:
  Check current tier from API response
  Compare with stored tier in agencies table
  If tier upgraded: Alert admin, update warmup_phase, recalculate daily_limit
  If tier downgraded: URGENT alert, pause campaigns, halve daily_limit
```

---

## 3. MESSAGE TEMPLATE RULES

### 3.1 Template Categories

| Category | Purpose | Charged? | Examples |
|----------|---------|----------|---------|
| **Marketing** | Promotional content, offers, product launches, campaigns | Always charged (even in 24hr window) | New listing alerts, discount offers, event invitations, newsletters |
| **Utility** | Transactional, account-related, customer-requested | Free within 24hr service window. Charged outside. | Order confirmations, appointment reminders, payment receipts, status updates |
| **Authentication** | OTPs, verification codes, security | Always charged | Login codes, 2FA, account verification |

**Critical Change (July 2025):** Meta refined utility definition — to qualify as utility, a template MUST be:
- Non-promotional (no persuasive or promotional intent)
- Either (1) specific to or requested by the user, OR (2) essential/critical to the user
- Meta can auto-reclassify utility → marketing if it detects promotional intent

**For Real Estate (Sendara):** Most listing campaigns are MARKETING templates. Do NOT try to categorize them as utility — Meta will reclassify and it hurts your quality score.

### 3.2 Template Approval Rules

**Templates are REQUIRED for:** All business-initiated messages outside the 24-hour customer service window.

**Approval Process:**
- Submit via WhatsApp Manager or BSP API (360dialog)
- Meta reviews (usually automated, instant for verified businesses, up to 24 hours otherwise)
- Statuses: Submitted → Approved / Rejected
- Once approved, templates CANNOT be edited. Must create new template with changes.
- Duplicate templates (same body text, different name) are auto-rejected (except authentication)

### 3.3 Template Rejection Reasons (27 Common Causes)

**Category 1: Policy Violations**
1. Selling prohibited items (weapons, drugs, counterfeit goods)
2. Threatening or abusive content
3. Content that violates WhatsApp Business Policy or Commerce Policy
4. No opt-in mechanism referenced or implied
5. Content facilitating illegal activity

**Category 2: Formatting Errors**
6. Variables at the beginning or end of message ({{1}} can't start or end the template)
7. Consecutive variables ({{1}} {{2}} back to back not allowed)
8. Non-sequential variables (skipping a number, e.g., {{1}}, {{2}}, {{4}})
9. Mismatched or missing curly braces
10. Variables containing special characters (#, $, %)
11. Lines containing ONLY variables with no surrounding text
12. Missing sample values for variables

**Category 3: Intent Mismatch**
13. Category doesn't match content (labeling marketing as utility)
14. Language selected doesn't match template content
15. Vague content that could be repurposed for spam
16. Too many blanks/variables making intent unclear
17. Template that is effectively just placeholders

**Category 4: Button Errors**
18. URL buttons with shorteners (bit.ly, t.ly, etc.) — NOT allowed
19. URL buttons with wa.me links — NOT allowed
20. Phone number buttons with invalid formats
21. Quick reply buttons with misleading text

**Category 5: Content Quality Issues**
22. Misspellings or grammatical errors
23. Excessive use of emojis
24. ALL CAPS text (perceived as shouting/spam)
25. Excessive exclamation marks
26. Missing media sample for media header templates
27. Content too similar to an existing template

### 3.4 Template Best Practices for Real Estate

```
SENDARA AI TEMPLATE OPTIMIZER — SCORING RUBRIC:

SPAM SIGNALS (each deducts points):
  - More than 2 emojis in template body           → -15 points
  - Any ALL CAPS words (except proper nouns)       → -10 points per instance
  - More than 1 exclamation mark                   → -5 points per extra
  - Words: "HOT DEAL", "URGENT", "ACT NOW",
    "LIMITED TIME", "DON'T MISS"                   → -20 points each
  - No personalization variable ({{1}} for name)   → -15 points
  - No opt-out mechanism (quick reply or text)     → -25 points
  - URL shorteners in buttons                      → REJECT (auto-fail)
  - Template starts or ends with a variable        → REJECT (auto-fail)

QUALITY SIGNALS (each adds points):
  - Starts with "Hi {{1}}" or personal greeting    → +10 points
  - Contains specific property details             → +10 points
  - Includes a clear question or CTA               → +10 points
  - Has quick reply buttons (Yes/No or similar)    → +15 points
  - Includes opt-out quick reply                   → +15 points
  - Under 160 characters (concise)                 → +5 points
  - 160-320 characters (detailed but not long)     → +10 points
  - Natural, conversational tone                   → +10 points
  - Arabic language support (for UAE market)        → +5 points

SCORING:
  100 points = Perfect template
  80-99 = Good (recommend sending)
  60-79 = Acceptable (suggest improvements)
  40-59 = Risky (strong improvements needed)
  0-39 = Dangerous (do not send, rewrite required)
  REJECT = Auto-fail (will be rejected by Meta)

BAD TEMPLATE EXAMPLE (Real Estate):
  "🔥 Hot Deal | Emaar South – Golf Lane Villa | Golf Course View 🔥
   🏡 Single Row Villa
   💰 GREAT PRICE
   ✅ Rare Opportunity!
   📞 DM Now"

  Score: 5/100
  Issues: 5 emojis (-45), ALL CAPS "GREAT PRICE" (-10),
          "Hot Deal" (-20), no personalization (-15),
          no opt-out (-25), no question/CTA (+0)

GOOD TEMPLATE EXAMPLE:
  "Hi {{1}}, a 5-bed villa in Emaar South just came up —
   single row with direct golf course views. 4,899 sq.ft BUA.
   The seller is motivated.
   Would you like me to send the floor plan and pricing?
   [Quick Reply: Yes, send details]
   [Quick Reply: Not interested]"

  Score: 90/100
  Strengths: Personal greeting (+10), specific details (+10),
             clear question (+10), quick replies (+15),
             opt-out reply (+15), natural tone (+10),
             good length (+10)
```

---

## 4. PRICING MODEL (Effective July 1, 2025)

### 4.1 Per-Message Pricing

Meta switched from conversation-based pricing to **per-message pricing** on July 1, 2025.

**How it works:**
- Each business-initiated template message delivered incurs a separate charge
- Cost depends on: message category + recipient's country + monthly volume (for utility/auth)
- Service messages (customer-initiated, within 24-hour window) = FREE
- Utility templates sent within an open 24-hour customer service window = FREE
- Marketing templates are ALWAYS charged, even within the 24-hour window
- Authentication templates are ALWAYS charged, even within the 24-hour window

### 4.2 Rate Ranges by Category

| Category | Approximate Range (USD) | Notes |
|----------|------------------------|-------|
| Marketing | $0.025 – $0.1365 per message | Varies by country. Most expensive category. |
| Utility | $0.004 – $0.0456 per message | Free within 24hr CSW. Volume tiers available. |
| Authentication | $0.004 – $0.0456 per message | Volume tiers available. |
| Service | FREE | Customer-initiated only. |

### 4.3 Key Pricing Rules

- **Free Entry Point Conversations:** When a user contacts you through a Click-to-WhatsApp (CTWA) ad, Facebook Page CTA, or Instagram profile CTA, you get **72 hours** of completely free messaging across ALL categories (marketing, utility, auth, service).
- **Volume Tiers (Utility & Auth):** Meta offers automatic volume-based discounts. The more you send, the lower your per-message rate. Up to ~20% discount at highest tiers.
- **Utility Definition Tightened:** Since July 2025, templates must be clearly non-promotional to qualify as utility. Meta may auto-reclassify if it detects promotional intent.

### 4.4 UAE-Specific Rates

For the UAE market (Sendara's primary), approximate per-message rates:
- Marketing: ~$0.0893 per message (AED 0.328)
- Utility: ~$0.0316 per message (AED 0.116)
- Authentication: ~$0.0169 per message (AED 0.062)

**Sendara Pricing Impact:**
- At 12% markup on Meta fees: Sendara charges Meta rate × 1.12
- Marketing message through Sendara: ~AED 0.367 per message
- For a 5,000 message marketing campaign: Meta cost ≈ AED 1,640 + Sendara markup ≈ AED 197 = Total ≈ AED 1,837
- Compare: Wati charges 20% markup = AED 1,968 total. Sendara saves ~AED 131 per campaign.

---

## 5. OPT-IN & COMPLIANCE REQUIREMENTS

### 5.1 Opt-In Rules

- Meta REQUIRES businesses to obtain opt-in from customers before initiating a WhatsApp conversation
- Opt-in can be obtained both on and off WhatsApp (website forms, in-store, email, SMS, etc.)
- General messaging opt-in is accepted IF it complies with local laws (you no longer need WhatsApp-specific consent as of 2025)
- Pre-checked boxes do NOT count as valid opt-in
- Past SMS consent does NOT automatically transfer to WhatsApp
- Opt-in must clearly state: the business name, that messages will be sent via WhatsApp, and the types of messages (e.g., "marketing messages about property listings")

### 5.2 Opt-Out Rules

- Businesses MUST respect opt-out requests
- Must provide easy opt-out mechanism (quick reply button recommended)
- Opt-out keywords to detect: "STOP", "UNSUBSCRIBE", "CANCEL", "QUIT", "END", "OPT OUT"
- Arabic opt-out keywords: "إلغاء", "توقف", "إيقاف", "لا أريد"
- When user opts out: immediately stop all messages, mark contact as opted_out in database, never message again unless re-opted-in
- Re-opt-in requires explicit, new consent

### 5.3 WhatsApp Business Policy Highlights

- No spam or bulk unsolicited messaging
- No threatening, abusive, or harassing content
- No content that violates intellectual property rights
- No facilitation of illegal transactions
- Must comply with Meta Commerce Policy if selling goods/services
- Government and political use requires access through a Solution Provider
- No general-purpose AI chatbots (since January 2026) — only business-specific automation (support bots, booking bots, order bots) with clear, predictable outcomes

### 5.4 UAE-Specific Compliance

- UAE Personal Data Protection Law (PDPL) applies
- Must clearly disclose data collection and usage purposes
- Must provide mechanism for data access, correction, and deletion requests
- Cross-border data transfer restrictions may apply
- Dubai International Financial Centre (DIFC) has additional data protection regulations
- RERA (Real Estate Regulatory Authority) compliance for real estate marketing content

---

## 6. FREQUENCY CAPPING

### 6.1 The Invisible Limit

Meta implements **frequency capping** that limits how many marketing messages a single user can receive per day — across ALL businesses, not just yours.

- Users can receive approximately **2 marketing messages per day** across all brands
- If a user has already received their cap from other businesses, YOUR message will fail
- Error code: **131049** — indicates the user has reached their marketing message limit
- This is NOT your fault and does NOT affect your quality rating
- Retry the message the next day

### 6.2 Sendara Implementation

```
FREQUENCY CAP HANDLING:
  IF send_response.error_code == 131049:
    - Do NOT count as a failed delivery
    - Do NOT count against quality
    - Mark message as "frequency_capped"
    - Auto-queue for retry next day (different batch)
    - Track frequency_cap_rate per campaign
    - If frequency_cap_rate > 20%, alert admin:
      "High frequency capping detected. Your audience may be
       receiving too many WhatsApp messages from other businesses.
       Consider scheduling campaigns for off-peak hours (early morning)
       or spreading across multiple days."
```

---

## 7. API TECHNICAL REFERENCE

### 7.1 Key API Endpoints (Cloud API)

```
BASE URL: https://graph.facebook.com/v21.0

SEND TEMPLATE MESSAGE:
POST /{phone_number_id}/messages
{
  "messaging_product": "whatsapp",
  "to": "{recipient_phone}",
  "type": "template",
  "template": {
    "name": "{template_name}",
    "language": { "code": "{lang_code}" },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "{variable_value}" }
        ]
      }
    ]
  }
}

WEBHOOK EVENTS:
- message_template_status_update: Template approved/rejected/paused/disabled
- messages: Incoming messages, delivery receipts, read receipts
- account_alerts: Quality rating changes, tier changes, policy violations

DELIVERY STATUS WEBHOOK PAYLOAD:
{
  "statuses": [{
    "id": "{message_id}",
    "status": "sent" | "delivered" | "read" | "failed",
    "timestamp": "{unix_timestamp}",
    "errors": [{ "code": {error_code}, "title": "{error_title}" }]
  }]
}
```

### 7.2 Important Error Codes

| Code | Meaning | Sendara Action |
|------|---------|---------------|
| 131026 | Message undeliverable (user not on WhatsApp) | Mark contact invalid. Do not retry. |
| 131047 | Re-engagement message needed (>24hr since last interaction) | Must use template message. |
| 131049 | Frequency capping limit reached | Retry next day. Not a quality issue. |
| 131051 | Unsupported message type | Check template format. |
| 131053 | Media upload error | Retry with re-uploaded media. |
| 131056 | Pair rate limit exceeded (too many messages to same user) | Slow down. Space messages. |
| 368 | Temporarily blocked for policy violation | URGENT. Pause everything. Review content. |
| 131031 | Account locked | CRITICAL. Contact Meta support immediately. |
| 130429 | Rate limit hit (too many API calls/sec) | Implement exponential backoff. |
| 132000 | Template param count mismatch | Fix template parameters. |
| 132012 | Template not found | Sync templates. May have been disabled. |
| 132015 | Template paused | Stop using this template. Review quality. |

### 7.3 Webhook Quality Alert Payload

```json
{
  "field": "message_template_quality_update",
  "value": {
    "previous_quality_score": "GREEN",
    "new_quality_score": "YELLOW",
    "message_template_id": "12345",
    "message_template_name": "listing_alert_v2"
  }
}

{
  "field": "phone_number_quality_update",
  "value": {
    "display_phone_number": "+971501234567",
    "event": "FLAGGED",
    "current_limit": "TIER_1K"
  }
}
```

---

## 8. CONTACT WARMTH SCORING (SENDARA-SPECIFIC)

### 8.1 Warmth Tiers

| Tier | Label | Criteria | Expected Block Rate | Send Priority |
|------|-------|----------|-------------------|---------------|
| **P1** | Safest | Existing clients, active leads, interaction within 30 days | <1% | First (always) |
| **P2** | Warm | Past inquiries 30-90 days ago, open house attendees, website leads | 1-3% | Second |
| **P3** | Cool | Old inquiries 90+ days, event attendee lists, referrals without direct contact | 3-5% | Third (only in Phase 4+) |
| **P4** | Cold | Purchased/scraped lists, no prior touchpoint | 5-15%+ | NEVER via WhatsApp. Route to CTWA ads. |

### 8.2 Auto-Scoring Algorithm

```
warmth_score = calculate_warmth(contact):
  score = 0

  // Recency of last interaction
  days_since = days_since(contact.last_interaction_at)
  if days_since <= 7:    score += 40
  elif days_since <= 30:  score += 30
  elif days_since <= 90:  score += 15
  elif days_since <= 180: score += 5
  else:                   score += 0

  // Source quality
  if source in ['existing_client', 'active_deal']:     score += 30
  elif source in ['inbound_inquiry', 'website_lead']:   score += 20
  elif source in ['open_house', 'event', 'referral']:   score += 15
  elif source in ['portal_lead', 'social_media']:       score += 10
  elif source in ['csv_import_known']:                  score += 5
  elif source in ['purchased_list', 'scraped']:         score += 0

  // Engagement history
  if contact.total_replied > 0:   score += 20
  elif contact.total_read > 0:    score += 10
  elif contact.total_delivered > 0: score += 5

  // Negative signals
  if contact.total_blocked > 0:   score -= 50
  if contact.opted_out:           score = -999  // Never send

  // Tier assignment
  if score >= 60:   return 'P1'
  elif score >= 35: return 'P2'
  elif score >= 10: return 'P3'
  else:             return 'P4'
```

---

## 9. CAMPAIGN SEQUENCING ENGINE

### 9.1 Send Order Logic

```
FOR EACH campaign batch:
  1. Sort recipients by warmth_tier ASC (P1 first, then P2, then P3)
  2. Within each tier, sort by last_interaction_at DESC (most recent first)
  3. Within each tier, sort by total_replied DESC (most engaged first)

  This ensures:
  - Warmest contacts receive messages first
  - If quality issues arise, we can pause before reaching cooler contacts
  - Early quality signals from warm contacts inform whether to continue
```

### 9.2 Batch Scheduling

```
campaign_schedule = generate_schedule(campaign):
  total = campaign.total_recipients
  phase = agency.warmup_phase
  daily_limit = agency.warmup_daily_limit

  // Calculate days needed
  days_needed = ceil(total / daily_limit)

  // Calculate batches per day
  batches_per_day = determine_batches(phase):
    if phase <= 2: return 4    // Every 2 hours across 8-hour window
    if phase <= 4: return 6    // Every 1.5 hours
    if phase >= 5: return 8    // Every hour

  batch_size = ceil(daily_limit / batches_per_day)

  // Generate schedule
  for day in range(days_needed):
    for batch in range(batches_per_day):
      send_time = campaign_start + day*24hrs + batch*interval
      recipients = next_batch(batch_size, warmth_ordered)
      queue_batch(send_time, recipients)

INTER-BATCH QUALITY CHECK:
  After each batch completes:
    batch_block_rate = batch.blocked / batch.delivered
    if batch_block_rate > 0.02:  // >2% block rate
      PAUSE campaign
      alert("Batch #{batch.number} block rate {batch_block_rate}%. Campaign paused.")
      return

    cumulative_block_rate = campaign.total_blocked / campaign.total_delivered
    if cumulative_block_rate > 0.015:  // >1.5% cumulative
      reduce_remaining_batches(50%)
      alert("Cumulative block rate rising. Remaining batches halved.")
```

---

## 10. DASHBOARD METRICS (REAL-TIME)

### 10.1 Agency Health Dashboard

```
DISPLAY METRICS:
  - Current Tier: [Tier 0/1/2/3/4] with visual gauge
  - Quality Rating: [HIGH/MEDIUM/LOW] with color indicator
  - Warm-Up Phase: [Phase 1-7] with progress bar
  - Daily Usage: [X / daily_limit] with percentage bar
  - Hourly Send Rate: Line chart, last 24 hours, per-hour breakdown
  - 7-Day Block Rate: Sparkline chart with 2% danger line
  - 7-Day Read Rate: Sparkline with 65% minimum line
  - 7-Day Reply Rate: Sparkline
  - Tier Upgrade Progress: Progress bar showing % of limit used over last 7 days (needs 50%+)
  - Next Upgrade Check: Countdown timer (checks every 6 hours)
  - Templates by Quality: List with [HIGH/MEDIUM/LOW/PAUSED] badges
  - Active Campaigns: Count with status indicators

ALERTS PANEL:
  - Quality changes (with timestamp and before/after)
  - Tier changes
  - Template status changes (paused, disabled)
  - Block rate warnings
  - Frequency capping rate warnings
```

### 10.2 Per-Hour Analytics

```
HOURLY BREAKDOWN TABLE:
  Hour | Sent | Delivered | Read | Replied | Blocked | Block % | Read %
  09:00 | 250  | 245      | 198  | 42      | 2       | 0.8%    | 80.8%
  10:00 | 250  | 248      | 201  | 38      | 3       | 1.2%    | 81.0%
  ...

  Highlight rows where block_rate > 1.5% in yellow
  Highlight rows where block_rate > 2% in red
  Show total / average at bottom
```

---

## 11. POLICY CHANGE TRACKING

### 11.1 Known Upcoming/Recent Changes

| Date | Change | Impact | Source |
|------|--------|--------|--------|
| **Oct 7, 2025** | Portfolio-level limits replace per-number limits | All numbers in a portfolio share one tier. New numbers inherit existing tier. | Meta official |
| **Jul 1, 2025** | Per-message pricing replaces conversation-based pricing | Each template message charged individually. Utility free in 24hr window. | Meta official |
| **Jul 1, 2025** | Utility definition tightened | Must be non-promotional AND specific to user. Meta auto-reclassifies. | Meta official |
| **Jul 1, 2025** | Volume tiers for utility & auth | Automatic discounts at higher volumes. Up to ~20% off. | Meta official |
| **Apr 2025** | US marketing templates paused | No marketing templates to +1 numbers. Not applicable to UAE but important for global expansion. | Meta official |
| **Jan 2026** | General-purpose AI bots banned | Only business-specific automation allowed. No ChatGPT/Copilot-style open-ended bots. | Meta official |
| **Nov 2024** | All service conversations free | No charge for customer-initiated conversations. | Meta official |

### 11.2 Sendara Policy Update System

```
IMPLEMENTATION:
  1. Store all rules in a versioned knowledge base (this document + JSON rules file)
  2. Display "Last Policy Update: [date]" in the Sendara dashboard
  3. When Sendara team updates the rules:
     - Bump version number
     - Add changelog entry
     - Push notification to all agencies: "WhatsApp policy update — [summary]"
     - Update AI analyzer scoring rubric if needed
     - Update warm-up engine parameters if needed
  4. AI Template Analyzer always shows: "Analysis based on Meta guidelines v[X], last updated [date]"
  5. Blog/knowledge base section in the marketing site for latest policy updates (SEO value)

FUTURE: Consider automated monitoring of Meta's changelog pages
  - https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing/
  - https://business.whatsapp.com/policy
  - Scrape weekly, diff against stored version, alert if changed
```

---

## 12. MESSAGE ANALYZER — AI PROMPT ENGINEERING

### 12.1 System Prompt for Template Analyzer

```
You are Sendara's WhatsApp Template Analyzer. Your job is to evaluate
message templates against Meta's WhatsApp Business API guidelines and
score them for quality, compliance, and deliverability.

CONTEXT: The user is a UAE real estate agency sending property listing
campaigns via WhatsApp Business API.

ANALYZE THE TEMPLATE FOR:

1. COMPLIANCE (Pass/Fail)
   - Does it violate any WhatsApp Business Policy rules?
   - Does it contain prohibited content?
   - Are variables formatted correctly (sequential, not at start/end)?
   - Is the category appropriate (marketing vs utility)?

2. SPAM RISK (Score 0-100, higher = safer)
   - Count emojis (>2 = deduction)
   - Check for ALL CAPS words
   - Check for spam trigger words
   - Check for personalization
   - Check for opt-out mechanism
   - Check message length

3. ENGAGEMENT PREDICTION
   - Estimated read rate based on template style
   - Estimated reply rate
   - Estimated block risk

4. SUGGESTIONS
   - Specific improvements to increase quality score
   - Rewritten version of the template optimized for WhatsApp
   - Category recommendation (marketing/utility/authentication)

RESPOND IN JSON:
{
  "compliance": { "pass": true/false, "issues": [] },
  "spam_score": 0-100,
  "engagement": {
    "estimated_read_rate": "65-80%",
    "estimated_block_risk": "low/medium/high",
    "estimated_reply_rate": "5-15%"
  },
  "issues": [
    { "severity": "critical/warning/suggestion", "message": "..." }
  ],
  "optimized_template": "...",
  "category_recommendation": "marketing/utility",
  "overall_grade": "A/B/C/D/F"
}
```

---

## APPENDIX A: GLOSSARY

| Term | Definition |
|------|-----------|
| **WABA** | WhatsApp Business Account — the account container that holds phone numbers and templates |
| **Business Portfolio** | Meta Business Manager portfolio — all WABAs and numbers share messaging limits at this level |
| **BSP** | Business Solution Provider — authorized partner for WhatsApp API access (e.g., 360dialog, Wati) |
| **CSW** | Customer Service Window — 24-hour window after customer's last message where service messages and utility templates are free |
| **CTWA** | Click-to-WhatsApp (ads) — Meta ads that open a WhatsApp chat. Gives 72-hour free messaging window. |
| **MPS** | Messages Per Second — throughput rate for API calls |
| **PMP** | Per-Message Pricing — current billing model since July 2025 |
| **CBP** | Conversation-Based Pricing — old billing model, deprecated July 2025 |
| **Template** | Pre-approved message format required for business-initiated messages outside CSW |
| **Quality Rating** | Meta's assessment of your messaging quality (High/Medium/Low) based on 7-day recipient feedback |
| **Frequency Capping** | Meta's limit on marketing messages per user per day (~2), across all businesses |

---

## APPENDIX B: VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | March 2026 | Initial knowledge base. Covers tiers, quality, templates, pricing, compliance, analyzer. |

---

*This document is maintained by Omnex for the Sendara product. It should be updated whenever Meta publishes policy changes. All Sendara product logic (warm-up engine, quality shield, template analyzer, campaign sequencer) derives from the rules documented here.*
