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

// GET - Fetch all appointments
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const participantId = searchParams.get("participant_id");
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");

    let query = supabase
      .from("appointments")
      .select("*", { count: "exact" })
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    // Filter by status
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by participant
    if (participantId) {
      query = query.eq("participant_id", participantId);
    }

    // Filter by date range
    if (fromDate) {
      query = query.gte("date", fromDate);
    }
    if (toDate) {
      query = query.lte("date", toDate);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// POST - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const appointmentData = {
      participant_id: body.participantId || body.participant_id || null,
      participant_name: body.participantName || body.participant_name || null,
      date: body.date,
      start_time: body.startTime || body.start_time,
      end_time: body.endTime || body.end_time || null,
      service: body.service || null,
      worker: body.worker || "Meshach",
      location: body.location || null,
      status: body.status || "scheduled",
      reminded: false,
      notes: body.notes || null,
    };

    const { data: newAppointment, error } = await supabase
      .from("appointments")
      .insert(appointmentData)
      .select()
      .single();

    if (error) throw error;

    // Send notification
    sendNotification(newAppointment, "created").catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Appointment created",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

// PATCH - Update appointment
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      participantId: "participant_id",
      participantName: "participant_name",
      startTime: "start_time",
      endTime: "end_time",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("appointments")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Send notification for status changes
    if (updates.status === "completed" || updates.status === "cancelled") {
      sendNotification(updated, updates.status).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE - Remove appointment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Appointment ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}

// Send notification for appointment changes
async function sendNotification(
  appointment: {
    participant_name: string | null;
    date: string;
    start_time: string;
    service: string | null;
  },
  action: string
) {
  const actionEmoji = action === "created" ? "📅" : action === "completed" ? "✅" : "❌";
  const message = `${actionEmoji} Appointment ${action}!\n\nParticipant: ${appointment.participant_name || "TBD"}\nDate: ${appointment.date}\nTime: ${appointment.start_time}\nService: ${appointment.service || "General"}`;

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
