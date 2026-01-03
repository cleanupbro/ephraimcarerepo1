import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client for API routes (uses service role for full access)
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase configuration missing");
  }

  return createClient(url, key);
}

// GET - Fetch all referrals
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error, count } = await supabase
      .from("referrals")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

// POST - Create new referral
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    // Map form fields to database columns
    const referralData = {
      first_name: body.participantFirstName || body.firstName || "Unknown",
      last_name: body.participantLastName || body.lastName || "",
      phone: body.participantPhone || body.phone || null,
      email: body.participantEmail || body.email || null,
      ndis_number: body.ndisNumber || null,
      dob: body.dob || null,
      suburb: body.suburb || null,
      services: body.selectedServices || body.services || [],
      funding_type: body.fundingType || null,
      goals: body.goals || null,
      referrer_name: body.referrerName || null,
      referrer_role: body.referrerRole || null,
      referrer_org: body.referrerOrganisation || body.referrerOrg || null,
      referrer_phone: body.referrerPhone || null,
      referrer_email: body.referrerEmail || null,
      status: "new",
    };

    const { data: newReferral, error } = await supabase
      .from("referrals")
      .insert(referralData)
      .select()
      .single();

    if (error) throw error;

    // Send notifications
    sendNotifications(newReferral).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Referral received",
      id: newReferral.id,
    });
  } catch (error) {
    console.error("Error creating referral:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create referral" },
      { status: 500 }
    );
  }
}

// PATCH - Update referral
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    const { data: updated, error } = await supabase
      .from("referrals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Referral not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update referral" },
      { status: 500 }
    );
  }
}

// Send notifications to admin
async function sendNotifications(referral: {
  first_name: string;
  last_name: string;
  phone: string | null;
  suburb: string | null;
  services: string[];
}) {
  const name = `${referral.first_name} ${referral.last_name}`.trim();
  const message = `🆕 New Referral!\n\nName: ${name}\nPhone: ${referral.phone || "N/A"}\nSuburb: ${referral.suburb || "N/A"}\nServices: ${referral.services?.slice(0, 2).join(", ") || "N/A"}\n\nCheck admin dashboard for details.`;

  // Send SMS to admin
  await sendSMS(process.env.ADMIN_NOTIFY_PHONE || "", message);

  // Send WhatsApp to admin
  await sendWhatsApp(process.env.ADMIN_NOTIFY_PHONE || "", message);

  // Send Telegram notification
  await sendTelegram(message);
}

// Send SMS via Twilio
async function sendSMS(to: string, message: string) {
  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_PHONE_NUMBER;

  if (!SID || !TOKEN || !FROM || !to) {
    console.log("SMS not configured");
    return;
  }

  try {
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: FROM, Body: message }),
    });
    console.log("SMS sent to", to);
  } catch (error) {
    console.error("SMS error:", error);
  }
}

// Send WhatsApp via Meta API
async function sendWhatsApp(to: string, message: string) {
  const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
  const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!PHONE_ID || !TOKEN || !to) {
    console.log("WhatsApp not configured");
    return;
  }

  try {
    await fetch(`https://graph.facebook.com/v17.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/\+/g, ""),
        type: "text",
        text: { body: message },
      }),
    });
    console.log("WhatsApp sent to", to);
  } catch (error) {
    console.error("WhatsApp error:", error);
  }
}

// Send Telegram notification
async function sendTelegram(message: string) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    console.log("Telegram not configured");
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
    console.log("Telegram sent");
  } catch (error) {
    console.error("Telegram error:", error);
  }
}
