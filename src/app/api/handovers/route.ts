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

// GET - Fetch all shift handovers
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const participantId = searchParams.get("participant_id");
    const workerId = searchParams.get("worker_id");
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");

    let query = supabase
      .from("shift_handovers")
      .select("*", { count: "exact" })
      .order("shift_date", { ascending: false })
      .order("shift_end", { ascending: false });

    // Filter by status
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by participant
    if (participantId) {
      query = query.eq("participant_id", participantId);
    }

    // Filter by worker (outgoing or incoming)
    if (workerId) {
      query = query.or(`outgoing_worker.eq.${workerId},incoming_worker.eq.${workerId}`);
    }

    // Filter by date range
    if (fromDate) {
      query = query.gte("shift_date", fromDate);
    }
    if (toDate) {
      query = query.lte("shift_date", toDate);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error fetching handovers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch handovers" },
      { status: 500 }
    );
  }
}

// POST - Create new shift handover
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const handoverData = {
      participant_id: body.participantId || body.participant_id || null,
      participant_name: body.participantName || body.participant_name || null,
      outgoing_worker: body.outgoingWorker || body.outgoing_worker || null,
      incoming_worker: body.incomingWorker || body.incoming_worker || null,
      shift_date: body.shiftDate || body.shift_date || new Date().toISOString().split("T")[0],
      shift_start: body.shiftStart || body.shift_start || null,
      shift_end: body.shiftEnd || body.shift_end || null,
      activities_completed: body.activitiesCompleted || body.activities_completed || null,
      medications_given: body.medicationsGiven || body.medications_given || null,
      meals_provided: body.mealsProvided || body.meals_provided || null,
      mood_observations: body.moodObservations || body.mood_observations || null,
      behavior_notes: body.behaviorNotes || body.behavior_notes || null,
      health_concerns: body.healthConcerns || body.health_concerns || null,
      family_communication: body.familyCommunication || body.family_communication || null,
      tasks_pending: body.tasksPending || body.tasks_pending || null,
      special_instructions: body.specialInstructions || body.special_instructions || null,
      status: body.status || "pending",
    };

    const { data: newHandover, error } = await supabase
      .from("shift_handovers")
      .insert(handoverData)
      .select()
      .single();

    if (error) throw error;

    // Send notification
    sendHandoverNotification(newHandover).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Shift handover created",
      data: newHandover,
    });
  } catch (error) {
    console.error("Error creating handover:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create handover" },
      { status: 500 }
    );
  }
}

// PATCH - Update shift handover
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      participantId: "participant_id",
      participantName: "participant_name",
      outgoingWorker: "outgoing_worker",
      incomingWorker: "incoming_worker",
      shiftDate: "shift_date",
      shiftStart: "shift_start",
      shiftEnd: "shift_end",
      activitiesCompleted: "activities_completed",
      medicationsGiven: "medications_given",
      mealsProvided: "meals_provided",
      moodObservations: "mood_observations",
      behaviorNotes: "behavior_notes",
      healthConcerns: "health_concerns",
      familyCommunication: "family_communication",
      tasksPending: "tasks_pending",
      specialInstructions: "special_instructions",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("shift_handovers")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Handover not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating handover:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update handover" },
      { status: 500 }
    );
  }
}

// DELETE - Remove shift handover
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Handover ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("shift_handovers")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Handover deleted",
    });
  } catch (error) {
    console.error("Error deleting handover:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete handover" },
      { status: 500 }
    );
  }
}

// Send notification for new handover
async function sendHandoverNotification(handover: {
  participant_name: string | null;
  outgoing_worker: string | null;
  incoming_worker: string | null;
  shift_date: string;
  shift_end: string | null;
  tasks_pending: string | null;
  health_concerns: string | null;
}) {
  // Only notify if there are health concerns or pending tasks
  if (!handover.health_concerns && !handover.tasks_pending) {
    return;
  }

  const urgentFlag = handover.health_concerns ? "🏥" : "📋";
  const message = `${urgentFlag} Shift Handover Alert\n\nParticipant: ${handover.participant_name || "Unknown"}\nFrom: ${handover.outgoing_worker || "N/A"}\nTo: ${handover.incoming_worker || "N/A"}\nDate: ${handover.shift_date}\n\n${handover.health_concerns ? `Health Concerns: ${handover.health_concerns.substring(0, 150)}\n\n` : ""}${handover.tasks_pending ? `Pending Tasks: ${handover.tasks_pending.substring(0, 150)}` : ""}`;

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
