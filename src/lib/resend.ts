import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const BRAND = {
  navy: "#0D1B2A",
  deepBlue: "#1B4965",
  teal: "#0D7377",
  brightTeal: "#0FB5BA",
  tealLight: "#E0F7FA",
  offWhite: "#F8F9FA",
  white: "#FFFFFF",
  textDark: "#1a1a2e",
  textMuted: "#6b7280",
} as const;

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sendara</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.offWhite};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${BRAND.offWhite};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:32px 40px;background:linear-gradient(135deg,${BRAND.navy} 0%,${BRAND.deepBlue} 100%);border-radius:12px 12px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <!-- Logo Mark -->
                    <div style="width:48px;height:48px;background-color:${BRAND.teal};border-radius:12px;display:inline-block;text-align:center;line-height:48px;">
                      <div style="width:18px;height:18px;background-color:${BRAND.white};border-radius:50%;display:inline-block;margin-top:15px;"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px;">
                    <span style="font-size:24px;font-weight:300;letter-spacing:3px;color:${BRAND.white};text-transform:lowercase;">sendara</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:4px;">
                    <span style="font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.5);text-transform:uppercase;">Campaign Engine for Real Estate</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;background-color:${BRAND.white};">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background-color:${BRAND.offWhite};border-top:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <span style="font-size:13px;color:${BRAND.textMuted};">Sendara by Omnex</span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="font-size:12px;color:#9ca3af;">You received this email because you signed up at sendara.one</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function callbackConfirmationHtml(name: string, preferredTime: string): string {
  const timeLabels: Record<string, string> = {
    morning: "Morning (9 AM - 12 PM)",
    afternoon: "Afternoon (12 PM - 4 PM)",
    evening: "Evening (4 PM - 7 PM)",
    anytime: "Anytime",
  };
  const timeDisplay = timeLabels[preferredTime] || preferredTime;

  return emailLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND.navy};">
      We'll call you back.
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.textMuted};line-height:1.5;">
      Hi ${name}, thanks for requesting a call back from Sendara.
    </p>

    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.textDark};line-height:1.6;">
      A member of our team will reach out within <strong>24 hours</strong> during your preferred time.
    </p>

    <!-- Call Details -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:20px;background-color:${BRAND.tealLight};border-radius:8px;border-left:4px solid ${BRAND.teal};">
          <p style="margin:0 0 12px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${BRAND.teal};">Your Call Back Details</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};line-height:1.5;">
                <span style="color:${BRAND.brightTeal};font-weight:bold;margin-right:8px;">01</span> Preferred time: <strong>${timeDisplay}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};line-height:1.5;">
                <span style="color:${BRAND.brightTeal};font-weight:bold;margin-right:8px;">02</span> We'll discuss how Sendara fits your agency
              </td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};line-height:1.5;">
                <span style="color:${BRAND.brightTeal};font-weight:bold;margin-right:8px;">03</span> No commitment — just a quick conversation
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Stats Row -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td width="33%" align="center" style="padding:16px 8px;background-color:${BRAND.offWhite};border-radius:8px;">
          <div style="font-size:22px;font-weight:700;color:${BRAND.navy};">73%</div>
          <div style="font-size:11px;color:${BRAND.textMuted};margin-top:4px;">Agencies flagged</div>
        </td>
        <td width="8"></td>
        <td width="33%" align="center" style="padding:16px 8px;background-color:${BRAND.offWhite};border-radius:8px;">
          <div style="font-size:22px;font-weight:700;color:${BRAND.teal};">0</div>
          <div style="font-size:11px;color:${BRAND.textMuted};margin-top:4px;">Blocks with Sendara</div>
        </td>
        <td width="8"></td>
        <td width="33%" align="center" style="padding:16px 8px;background-color:${BRAND.offWhite};border-radius:8px;">
          <div style="font-size:22px;font-weight:700;color:${BRAND.navy};">5 min</div>
          <div style="font-size:11px;color:${BRAND.textMuted};margin-top:4px;">Quick call</div>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:15px;color:${BRAND.textDark};line-height:1.6;">
      Talk soon,<br>
      <strong style="color:${BRAND.navy};">The Sendara Team</strong>
    </p>
  `);
}

function waitlistConfirmationHtml(): string {
  return emailLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND.navy};">
      You're on the list.
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${BRAND.textMuted};line-height:1.5;">
      Thanks for joining the Sendara early access waitlist.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:20px;background-color:${BRAND.tealLight};border-radius:8px;border-left:4px solid ${BRAND.teal};">
          <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:${BRAND.teal};">What happens next?</p>
          <p style="margin:0;font-size:14px;color:${BRAND.textDark};line-height:1.6;">
            We're onboarding agencies in batches. You'll be the first to know when your spot opens up — with priority access and early-bird pricing.
          </p>
        </td>
      </tr>
    </table>

    <!-- Features Preview -->
    <p style="margin:0 0 16px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${BRAND.teal};">
      What you'll get
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="32" valign="top" style="color:${BRAND.brightTeal};font-size:18px;font-weight:bold;">~</td>
              <td>
                <div style="font-size:14px;font-weight:600;color:${BRAND.navy};">Automated Warm-Up</div>
                <div style="font-size:13px;color:${BRAND.textMuted};margin-top:2px;">50 msgs/day to 1,000+ safely</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="32" valign="top" style="color:${BRAND.brightTeal};font-size:18px;font-weight:bold;">~</td>
              <td>
                <div style="font-size:14px;font-weight:600;color:${BRAND.navy};">Quality Shield</div>
                <div style="font-size:13px;color:${BRAND.textMuted};margin-top:2px;">Real-time monitoring + auto-throttle</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="32" valign="top" style="color:${BRAND.brightTeal};font-size:18px;font-weight:bold;">~</td>
              <td>
                <div style="font-size:14px;font-weight:600;color:${BRAND.navy};">AI Templates</div>
                <div style="font-size:13px;color:${BRAND.textMuted};margin-top:2px;">Auto-optimized for deliverability</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:15px;color:${BRAND.textDark};line-height:1.6;">
      We'll be in touch,<br>
      <strong style="color:${BRAND.navy};">The Sendara Team</strong>
    </p>
  `);
}

function adminNotificationHtml(leadData: Record<string, unknown>): string {
  const type = leadData.type as string;
  const rows = Object.entries(leadData)
    .filter(([key]) => !['type'].includes(key))
    .map(([key, value]) => {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const val = value ?? '—';
      return `
        <tr>
          <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #f3f4f6;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;font-size:14px;color:${BRAND.textDark};border-bottom:1px solid #f3f4f6;">${val}</td>
        </tr>`;
    })
    .join('');

  return emailLayout(`
    <!-- Badge -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:6px 14px;background-color:${type === 'callback' ? BRAND.teal : BRAND.deepBlue};border-radius:20px;">
          <span style="font-size:12px;font-weight:600;color:${BRAND.white};text-transform:uppercase;letter-spacing:1px;">
            ${type === 'callback' ? 'Call Back Request' : 'Waitlist Signup'}
          </span>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.navy};">
      New Lead: ${(leadData.agency_name as string) || (leadData.name as string) || 'Unknown'}
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:${BRAND.textMuted};">
      ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Dubai' })} (Dubai)
    </p>

    <!-- Lead Details -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      ${rows}
    </table>

    <p style="margin:0;font-size:13px;color:${BRAND.textMuted};">
      Reply to this email or reach out to the lead directly.
    </p>
  `);
}

function plainText(leadData: Record<string, unknown>): string {
  return `New lead received:\n\n${JSON.stringify(leadData, null, 2)}\n\nTimestamp: ${new Date().toISOString()}`;
}

export async function sendLeadConfirmation(email: string, type: 'callback' | 'waitlist', name?: string, preferredTime?: string) {
  const subject = type === 'callback'
    ? "We'll call you back — Request received"
    : "You're on the Sendara waitlist";

  const html = type === 'callback'
    ? callbackConfirmationHtml(name || 'there', preferredTime || 'anytime')
    : waitlistConfirmationHtml();

  const text = type === 'callback'
    ? `Hi ${name || 'there'},\n\nThank you for requesting a call back from Sendara. A member of our team will reach out within 24 hours during your preferred time.\n\nWhat to expect:\n1. A quick conversation about your agency's needs\n2. How Sendara fits your workflow\n3. No commitment required\n\nTalk soon,\nThe Sendara Team`
    : `Hi there,\n\nYou're on the Sendara early access list. We'll notify you as soon as we're ready to onboard new agencies.\n\nWe'll be in touch,\nThe Sendara Team`;

  await getResend().emails.send({
    from: "Sendara <noreply@sendara.one>",
    to: email,
    subject,
    html,
    text,
  });
}

export async function sendAdminNotification(leadData: Record<string, unknown>) {
  const adminEmail = process.env.ADMIN_EMAIL || "amar@omnex.one";
  const type = leadData.type as string;
  const agencyName = (leadData.agency_name as string) || "Unknown";

  await getResend().emails.send({
    from: "Sendara Leads <noreply@sendara.one>",
    to: adminEmail,
    subject: `New ${type === 'callback' ? 'Call Back' : 'Waitlist'} Lead: ${agencyName}`,
    html: adminNotificationHtml(leadData),
    text: plainText(leadData),
  });
}
