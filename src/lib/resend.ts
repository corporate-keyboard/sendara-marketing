import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendLeadConfirmation(email: string, type: 'demo' | 'waitlist', name?: string) {
  const subject = "Welcome to Sendara — We'll be in touch!";
  const bodyText = type === 'demo'
    ? `Hi ${name || 'there'},\n\nThank you for requesting a demo of Sendara. We'll reach out within 24 hours to schedule your 15-minute demo.\n\nIn the meantime, here's what to expect:\n- A personalized walkthrough of the platform\n- Campaign strategy recommendations for your agency\n- Answers to all your questions\n\nBest,\nThe Sendara Team`
    : `Hi there,\n\nYou're on the Sendara early access list. We'll notify you as soon as we're ready to onboard new agencies.\n\nBest,\nThe Sendara Team`;

  await getResend().emails.send({
    from: "Sendara <noreply@sendara.io>",
    to: email,
    subject,
    text: bodyText,
  });
}

export async function sendAdminNotification(leadData: Record<string, unknown>) {
  const adminEmail = process.env.ADMIN_EMAIL || "amar@omnex.one";
  const type = leadData.type as string;
  const agencyName = (leadData.agency_name as string) || "Unknown";

  await getResend().emails.send({
    from: "Sendara Leads <noreply@sendara.io>",
    to: adminEmail,
    subject: `New ${type === 'demo' ? 'Demo' : 'Waitlist'} Lead: ${agencyName}`,
    text: `New lead received:\n\n${JSON.stringify(leadData, null, 2)}\n\nTimestamp: ${new Date().toISOString()}`,
  });
}
