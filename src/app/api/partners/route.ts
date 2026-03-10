import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const partnerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  agency: z.string().min(2, "Agency name is required"),
  tier: z.string().min(1, "Please select a tier"),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = partnerFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { data } = parsed;

    const partnerRecord = {
      type: "partner",
      name: data.name,
      email: data.email,
      agency_name: data.agency,
      preferred_time: data.tier,
      source: "partners-page",
      status: "new",
    };

    // Store in Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { getServiceClient } = await import("@/lib/supabase");
      const supabase = getServiceClient();

      // Store in leads table (reuse existing infrastructure)
      const { error: dbError } = await supabase.from("partner_applications").insert({
        name: data.name,
        email: data.email,
        agency: data.agency,
        tier: data.tier,
        message: data.message || null,
        status: "new",
      });

      if (dbError) {
        // Fallback: store in leads table if partner_applications doesn't exist
        const { error: leadError } = await supabase.from("leads").insert(partnerRecord);
        if (leadError) {
          console.error("Supabase insert error:", leadError);
        }
      }
    } else {
      console.log("Partner application received (Supabase not configured):", data);
    }

    // Send admin notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendPartnerNotification } = await import("@/lib/resend");
        await sendPartnerNotification(data);
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
