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

// GET - Fetch all participants
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = supabase
      .from("participants")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Search by name or NDIS number
    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,ndis_number.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch participants" },
      { status: 500 }
    );
  }
}

// POST - Create new participant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const participantData = {
      first_name: body.firstName || body.first_name || "Unknown",
      last_name: body.lastName || body.last_name || "",
      phone: body.phone || null,
      email: body.email || null,
      ndis_number: body.ndisNumber || body.ndis_number || null,
      dob: body.dob || null,
      address: body.address || null,
      suburb: body.suburb || null,
      plan_start_date: body.planStartDate || body.plan_start_date || null,
      plan_end_date: body.planEndDate || body.plan_end_date || null,
      plan_budget: body.planBudget || body.plan_budget || null,
      services: body.services || [],
      emergency_contact_name: body.emergencyContactName || body.emergency_contact_name || null,
      emergency_contact_phone: body.emergencyContactPhone || body.emergency_contact_phone || null,
      status: body.status || "active",
      notes: body.notes || null,
      referral_id: body.referralId || body.referral_id || null,
    };

    const { data: newParticipant, error } = await supabase
      .from("participants")
      .insert(participantData)
      .select()
      .single();

    if (error) throw error;

    // Send notification for new participant
    sendNotification(newParticipant).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Participant created",
      data: newParticipant,
    });
  } catch (error) {
    console.error("Error creating participant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create participant" },
      { status: 500 }
    );
  }
}

// PATCH - Update participant
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      firstName: "first_name",
      lastName: "last_name",
      ndisNumber: "ndis_number",
      planStartDate: "plan_start_date",
      planEndDate: "plan_end_date",
      planBudget: "plan_budget",
      emergencyContactName: "emergency_contact_name",
      emergencyContactPhone: "emergency_contact_phone",
      referralId: "referral_id",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("participants")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Participant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating participant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update participant" },
      { status: 500 }
    );
  }
}

// DELETE - Remove participant
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Participant ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("participants")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Participant deleted",
    });
  } catch (error) {
    console.error("Error deleting participant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete participant" },
      { status: 500 }
    );
  }
}

// Send notification for new participant
async function sendNotification(participant: {
  first_name: string;
  last_name: string;
  phone: string | null;
}) {
  const name = `${participant.first_name} ${participant.last_name}`.trim();
  const message = `✅ New Participant Added!\n\nName: ${name}\nPhone: ${participant.phone || "N/A"}\n\nCheck admin dashboard for details.`;

  // Send Telegram
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (TOKEN && CHAT_ID) {
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
}
