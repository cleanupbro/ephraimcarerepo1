import { NextRequest, NextResponse } from "next/server";
import { getContacts, addContact, updateContact } from "@/lib/db";

// GET - Fetch all contacts
export async function GET() {
  try {
    const data = await getContacts();
    return NextResponse.json({
      success: true,
      data,
      total: data.length,
      unread: data.filter((c) => c.status === "unread").length,
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

    const contactData = {
      name: body.name || body.firstName
        ? `${body.firstName || ""} ${body.lastName || ""}`.trim()
        : "Unknown",
      email: body.email || "",
      phone: body.phone || "",
      message: body.message || body.inquiry || "",
    };

    const newContact = await addContact(contactData);

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

    const updated = await updateContact(id, updates);
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
async function sendNotification(contact: { name: string; email: string; message: string }) {
  const PHONE_ID = process.env.WHATSAPP_PHONE_ID;
  const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
  const TO = process.env.ADMIN_NOTIFY_PHONE;

  if (!PHONE_ID || !TOKEN || !TO) return;

  const message = `📩 New Contact!\n\nFrom: ${contact.name}\nEmail: ${contact.email}\n\nMessage: ${contact.message.slice(0, 100)}...`;

  try {
    await fetch(`https://graph.facebook.com/v17.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: TO.replace(/\+/g, ""),
        type: "text",
        text: { body: message },
      }),
    });
  } catch (error) {
    console.error("Notification error:", error);
  }
}
