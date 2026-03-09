import { NextResponse } from "next/server";
import { demoFormSchema, waitlistFormSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type === "demo") {
      const parsed = demoFormSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
      }
    } else if (type === "waitlist") {
      const parsed = waitlistFormSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Invalid lead type" }, { status: 400 });
    }

    const url = new URL(request.url);
    const leadRecord = {
      type,
      ...data,
      source: "website",
      utm_source: url.searchParams.get("utm_source"),
      utm_medium: url.searchParams.get("utm_medium"),
      utm_campaign: url.searchParams.get("utm_campaign"),
      status: "new",
    };

    // Store in Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { getServiceClient } = await import("@/lib/supabase");
      const supabase = getServiceClient();
      const { error: dbError } = await supabase.from("leads").insert(leadRecord);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
      }
    } else {
      console.log("Lead received (Supabase not configured):", leadRecord);
    }

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendLeadConfirmation, sendAdminNotification } = await import("@/lib/resend");
        await sendLeadConfirmation(data.email, type, data.name);
        await sendAdminNotification(leadRecord);
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
