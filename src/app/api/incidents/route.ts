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

// GET - Fetch all incident reports
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");
    const participantId = searchParams.get("participant_id");
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");

    let query = supabase
      .from("incident_reports")
      .select("*", { count: "exact" })
      .order("incident_date", { ascending: false })
      .order("incident_time", { ascending: false });

    // Filter by status
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by severity
    if (severity && severity !== "all") {
      query = query.eq("severity", severity);
    }

    // Filter by participant
    if (participantId) {
      query = query.eq("participant_id", participantId);
    }

    // Filter by date range
    if (fromDate) {
      query = query.gte("incident_date", fromDate);
    }
    if (toDate) {
      query = query.lte("incident_date", toDate);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

// POST - Create new incident report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const incidentData = {
      participant_id: body.participantId || body.participant_id || null,
      participant_name: body.participantName || body.participant_name || null,
      reporter_name: body.reporterName || body.reporter_name || null,
      reporter_role: body.reporterRole || body.reporter_role || null,
      incident_date: body.incidentDate || body.incident_date || new Date().toISOString().split("T")[0],
      incident_time: body.incidentTime || body.incident_time || null,
      incident_type: body.incidentType || body.incident_type || null,
      severity: body.severity || "low",
      location: body.location || null,
      description: body.description || null,
      immediate_actions: body.immediateActions || body.immediate_actions || null,
      witnesses: body.witnesses || null,
      follow_up_required: body.followUpRequired ?? body.follow_up_required ?? false,
      follow_up_actions: body.followUpActions || body.follow_up_actions || null,
      reported_to_ndis: body.reportedToNdis ?? body.reported_to_ndis ?? false,
      ndis_report_date: body.ndisReportDate || body.ndis_report_date || null,
      status: body.status || "open",
      resolution_notes: body.resolutionNotes || body.resolution_notes || null,
      attachments: body.attachments || null,
    };

    const { data: newIncident, error } = await supabase
      .from("incident_reports")
      .insert(incidentData)
      .select()
      .single();

    if (error) throw error;

    // Send notification for HIGH/CRITICAL severity
    if (incidentData.severity === "high" || incidentData.severity === "critical") {
      sendIncidentNotification(newIncident).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: "Incident report created",
      data: newIncident,
    });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create incident report" },
      { status: 500 }
    );
  }
}

// PATCH - Update incident report
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      participantId: "participant_id",
      participantName: "participant_name",
      reporterName: "reporter_name",
      reporterRole: "reporter_role",
      incidentDate: "incident_date",
      incidentTime: "incident_time",
      incidentType: "incident_type",
      immediateActions: "immediate_actions",
      followUpRequired: "follow_up_required",
      followUpActions: "follow_up_actions",
      reportedToNdis: "reported_to_ndis",
      ndisReportDate: "ndis_report_date",
      resolutionNotes: "resolution_notes",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("incident_reports")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Incident report not found" },
        { status: 404 }
      );
    }

    // Send notification if severity escalated to HIGH/CRITICAL
    if (updates.severity === "high" || updates.severity === "critical") {
      sendIncidentNotification(updated, "escalated").catch(console.error);
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update incident report" },
      { status: 500 }
    );
  }
}

// DELETE - Remove incident report
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Incident ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("incident_reports")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Incident report deleted",
    });
  } catch (error) {
    console.error("Error deleting incident:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete incident report" },
      { status: 500 }
    );
  }
}

// Send Telegram notification for HIGH/CRITICAL incidents
async function sendIncidentNotification(
  incident: {
    participant_name: string | null;
    incident_date: string;
    incident_time: string | null;
    incident_type: string | null;
    severity: string;
    description: string | null;
    reporter_name: string | null;
  },
  action: string = "reported"
) {
  const severityEmoji = incident.severity === "critical" ? "🚨" : "⚠️";
  const message = `${severityEmoji} INCIDENT ${action.toUpperCase()}!\n\nSeverity: ${incident.severity.toUpperCase()}\nParticipant: ${incident.participant_name || "Unknown"}\nDate: ${incident.incident_date} ${incident.incident_time || ""}\nType: ${incident.incident_type || "Not specified"}\n\nDescription: ${incident.description?.substring(0, 200) || "No description"}\n\nReported by: ${incident.reporter_name || "Unknown"}\n\n⚡ Immediate attention required!`;

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
