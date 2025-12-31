import { NextRequest, NextResponse } from "next/server";
import { getReferrals, addReferral, updateReferral, type Referral } from "@/lib/db";

// GET - Fetch all referrals
export async function GET() {
  try {
    const data = await getReferrals();
    return NextResponse.json({
      success: true,
      data,
      total: data.length,
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

    // Map form fields to referral fields
    const referralData: Partial<Referral> = {
      participantName: body.participantFirstName
        ? `${body.participantFirstName} ${body.participantLastName || ""}`.trim()
        : body.participantName || "Unknown",
      participantPhone: body.participantPhone || "",
      participantEmail: body.participantEmail || "",
      ndisNumber: body.ndisNumber || "",
      suburb: body.suburb || "",
      services: body.selectedServices || body.services || [],
      referrerName: body.referrerName || "",
      referrerRole: body.referrerRole || "",
      referrerOrg: body.referrerOrganisation || body.referrerOrg || "",
      referrerPhone: body.referrerPhone || "",
      referrerEmail: body.referrerEmail || "",
      goals: body.goals || "",
    };

    const newReferral = await addReferral(referralData);

    // Send notifications to both developer and client
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

    const updated = await updateReferral(id, updates);
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

// Send notifications to developer AND client
async function sendNotifications(referral: Referral) {
  const message = `🆕 New Referral!\n\nName: ${referral.participantName}\nPhone: ${referral.participantPhone}\nSuburb: ${referral.suburb}\nServices: ${referral.services.slice(0, 2).join(", ")}\n\nCheck admin dashboard for details.`;

  // Notify developer (SMS)
  await sendSMS(process.env.DEVELOPER_PHONE || "", message);

  // Notify client (WhatsApp)
  await sendWhatsApp(process.env.ADMIN_NOTIFY_PHONE || "", message);
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
