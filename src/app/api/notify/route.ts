import { NextRequest, NextResponse } from "next/server";

// POST - Send notification (SMS or WhatsApp)
export async function POST(request: NextRequest) {
  try {
    const { type, to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { success: false, error: "Missing to or message" },
        { status: 400 }
      );
    }

    if (type === "sms") {
      await sendSMS(to, message);
    } else if (type === "whatsapp") {
      await sendWhatsApp(to, message);
    } else {
      // Send both
      await Promise.all([sendSMS(to, message), sendWhatsApp(to, message)]);
    }

    return NextResponse.json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

// Send SMS via Twilio
async function sendSMS(to: string, message: string) {
  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_PHONE_NUMBER;

  if (!SID || !TOKEN || !FROM) {
    console.log("Twilio not configured");
    return;
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: FROM, Body: message }),
    }
  );

  if (!response.ok) {
    throw new Error(`SMS failed: ${response.status}`);
  }

  console.log("SMS sent to", to);
}

// Send WhatsApp via Meta API
async function sendWhatsApp(to: string, message: string) {
  const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
  const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!PHONE_ID || !TOKEN) {
    console.log("WhatsApp not configured");
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/v17.0/${PHONE_ID}/messages`,
    {
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
    }
  );

  if (!response.ok) {
    throw new Error(`WhatsApp failed: ${response.status}`);
  }

  console.log("WhatsApp sent to", to);
}
