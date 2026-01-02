import { NextRequest, NextResponse } from "next/server";

// POST - Send notification (SMS, WhatsApp, or Telegram)
export async function POST(request: NextRequest) {
  try {
    const { type, to, message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Missing message" },
        { status: 400 }
      );
    }

    const results: string[] = [];

    if (type === "sms" && to) {
      await sendSMS(to, message);
      results.push("sms");
    } else if (type === "whatsapp" && to) {
      await sendWhatsApp(to, message);
      results.push("whatsapp");
    } else if (type === "telegram") {
      await sendTelegram(chatId, message);
      results.push("telegram");
    } else if (type === "all") {
      // Send to all configured channels
      const promises = [];
      if (to) {
        promises.push(sendSMS(to, message).then(() => results.push("sms")));
        promises.push(sendWhatsApp(to, message).then(() => results.push("whatsapp")));
      }
      promises.push(sendTelegram(chatId, message).then(() => results.push("telegram")));
      await Promise.allSettled(promises);
    } else {
      // Default: send to WhatsApp and Telegram (for testing)
      if (to) await sendWhatsApp(to, message);
      await sendTelegram(chatId, message);
      results.push("whatsapp", "telegram");
    }

    return NextResponse.json({ success: true, message: "Notification sent", channels: results });
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
    const errorData = await response.text();
    console.error("WhatsApp error:", errorData);
    throw new Error(`WhatsApp failed: ${response.status}`);
  }

  console.log("WhatsApp sent to", to);
}

// Send Telegram via Bot API
async function sendTelegram(chatId: string | undefined, message: string) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const targetChatId = chatId || DEFAULT_CHAT_ID;

  if (!BOT_TOKEN || !targetChatId) {
    console.log("Telegram not configured (missing BOT_TOKEN or CHAT_ID)");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Telegram error:", errorData);
    throw new Error(`Telegram failed: ${response.status}`);
  }

  console.log("Telegram sent to chat", targetChatId);
}
