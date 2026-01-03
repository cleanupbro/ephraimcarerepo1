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

// GET - Fetch all progress notes
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const noteType = searchParams.get("note_type");
    const participantId = searchParams.get("participant_id");
    const workerId = searchParams.get("worker_id");
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");
    const search = searchParams.get("search");

    let query = supabase
      .from("progress_notes")
      .select("*", { count: "exact" })
      .order("note_date", { ascending: false })
      .order("created_at", { ascending: false });

    // Filter by note type
    if (noteType && noteType !== "all") {
      query = query.eq("note_type", noteType);
    }

    // Filter by participant
    if (participantId) {
      query = query.eq("participant_id", participantId);
    }

    // Filter by worker
    if (workerId) {
      query = query.eq("worker_name", workerId);
    }

    // Filter by date range
    if (fromDate) {
      query = query.gte("note_date", fromDate);
    }
    if (toDate) {
      query = query.lte("note_date", toDate);
    }

    // Search in content
    if (search) {
      query = query.or(
        `content.ilike.%${search}%,participant_name.ilike.%${search}%,goals_addressed.ilike.%${search}%`
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
    console.error("Error fetching progress notes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress notes" },
      { status: 500 }
    );
  }
}

// POST - Create new progress note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const noteData = {
      participant_id: body.participantId || body.participant_id || null,
      participant_name: body.participantName || body.participant_name || null,
      worker_name: body.workerName || body.worker_name || null,
      note_date: body.noteDate || body.note_date || new Date().toISOString().split("T")[0],
      note_type: body.noteType || body.note_type || "general",
      content: body.content || null,
      goals_addressed: body.goalsAddressed || body.goals_addressed || null,
      attachments: body.attachments || null,
    };

    const { data: newNote, error } = await supabase
      .from("progress_notes")
      .insert(noteData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Progress note created",
      data: newNote,
    });
  } catch (error) {
    console.error("Error creating progress note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create progress note" },
      { status: 500 }
    );
  }
}

// PATCH - Update progress note
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      participantId: "participant_id",
      participantName: "participant_name",
      workerName: "worker_name",
      noteDate: "note_date",
      noteType: "note_type",
      goalsAddressed: "goals_addressed",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("progress_notes")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Progress note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating progress note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update progress note" },
      { status: 500 }
    );
  }
}

// DELETE - Remove progress note
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Progress note ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("progress_notes")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Progress note deleted",
    });
  } catch (error) {
    console.error("Error deleting progress note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete progress note" },
      { status: 500 }
    );
  }
}
