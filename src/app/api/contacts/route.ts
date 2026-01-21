import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client for API routes
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase configuration missing");
  }

  return createClient(url, key);
}

// GET - Fetch all contacts
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error, count } = await supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) throw error;

    const unread = data?.filter((c) => c.status === "unread").length || 0;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      unread,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST - Create new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    // Build name from various possible fields
    let name = body.name;
    if (!name && (body.firstName || body.lastName)) {
      name = `${body.firstName || ""} ${body.lastName || ""}`.trim();
    }

    const contactData = {
      name: name || "Unknown",
      email: body.email || null,
      phone: body.phone || null,
      message: body.message || body.inquiry || null,
      status: "unread",
    };

    const { data: newContact, error } = await supabase
      .from("contacts")
      .insert(contactData)
      .select()
      .single();

    if (error) throw error;

    // Send notification
    sendNotification(newContact).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Contact received",
      id: newContact.id,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

// PATCH - Update contact status
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    const { data: updated, error } = await supabase
      .from("contacts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// Send notification for new contact
async function sendNotification(contact: {
  name: string;
  email: string | null;
  message: string | null;
}) {
  const message = `📩 New Contact!\n\nFrom: ${contact.name}\nEmail: ${contact.email || "N/A"}\n\nMessage: ${(contact.message || "").slice(0, 100)}${(contact.message?.length || 0) > 100 ? "..." : ""}`;

  // Send WhatsApp
  await sendWhatsApp(process.env.ADMIN_NOTIFY_PHONE || "", message);

  // Send SMS
  await sendSMS(process.env.ADMIN_NOTIFY_PHONE || "", message);

  // Send Telegram
  await sendTelegram(message);
}

// Send SMS via Twilio
async function sendSMS(to: string, message: string) {
  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_PHONE_NUMBER;

  if (!SID || !TOKEN || !FROM || !to) return;

  try {
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: FROM, Body: message }),
    });
  } catch (error) {
    console.error("SMS error:", error);
  }
}

// Send WhatsApp via Meta API
async function sendWhatsApp(to: string, message: string) {
  const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
  const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!PHONE_ID || !TOKEN || !to) return;

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
  } catch (error) {
    console.error("WhatsApp error:", error);
  }
}

// Send Telegram notification
async function sendTelegram(message: string) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) return;

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });
  } catch (error) {
    console.error("Telegram error:", error);
  }
}
