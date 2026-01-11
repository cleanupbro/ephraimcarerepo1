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

// GET - Fetch all staff members
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const role = searchParams.get("role");
    const search = searchParams.get("search");
    const expiringCerts = searchParams.get("expiring_certs"); // Returns staff with certs expiring within N days

    let query = supabase
      .from("staff_members")
      .select("*", { count: "exact" })
      .order("name", { ascending: true });

    // Filter by status
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by role
    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    // Search by name or email
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    let staffData = data || [];

    // Filter by expiring certifications if requested
    if (expiringCerts) {
      const daysAhead = parseInt(expiringCerts) || 30;
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysAhead);
      const futureDateStr = futureDate.toISOString().split("T")[0];
      const todayStr = new Date().toISOString().split("T")[0];

      staffData = staffData.filter((staff) => {
        const screeningExpiry = staff.screening_expiry;
        const firstAidExpiry = staff.first_aid_expiry;
        const wwccExpiry = staff.wwcc_expiry;

        return (
          (screeningExpiry && screeningExpiry >= todayStr && screeningExpiry <= futureDateStr) ||
          (firstAidExpiry && firstAidExpiry >= todayStr && firstAidExpiry <= futureDateStr) ||
          (wwccExpiry && wwccExpiry >= todayStr && wwccExpiry <= futureDateStr)
        );
      });
    }

    return NextResponse.json({
      success: true,
      data: staffData,
      total: expiringCerts ? staffData.length : (count || 0),
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch staff members" },
      { status: 500 }
    );
  }
}

// POST - Create new staff member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const staffData = {
      name: body.name || null,
      email: body.email || null,
      phone: body.phone || null,
      role: body.role || "support_worker",
      connecteam_id: body.connecteamId || body.connecteam_id || null,
      qualifications: body.qualifications || null,
      ndis_worker_screening: body.ndisWorkerScreening || body.ndis_worker_screening || null,
      screening_expiry: body.screeningExpiry || body.screening_expiry || null,
      first_aid_expiry: body.firstAidExpiry || body.first_aid_expiry || null,
      wwcc_number: body.wwccNumber || body.wwcc_number || null,
      wwcc_expiry: body.wwccExpiry || body.wwcc_expiry || null,
      status: body.status || "active",
    };

    const { data: newStaff, error } = await supabase
      .from("staff_members")
      .insert(staffData)
      .select()
      .single();

    if (error) throw error;

    // Send notification
    sendStaffNotification(newStaff, "added").catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Staff member created",
      data: newStaff,
    });
  } catch (error) {
    console.error("Error creating staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create staff member" },
      { status: 500 }
    );
  }
}

// PATCH - Update staff member
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabase();

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      connecteamId: "connecteam_id",
      ndisWorkerScreening: "ndis_worker_screening",
      screeningExpiry: "screening_expiry",
      firstAidExpiry: "first_aid_expiry",
      wwccNumber: "wwcc_number",
      wwccExpiry: "wwcc_expiry",
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const { data: updated, error } = await supabase
      .from("staff_members")
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Staff member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update staff member" },
      { status: 500 }
    );
  }
}

// DELETE - Remove staff member
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Staff member ID required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("staff_members")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Staff member deleted",
    });
  } catch (error) {
    console.error("Error deleting staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete staff member" },
      { status: 500 }
    );
  }
}

// Send notification for staff changes
async function sendStaffNotification(
  staff: {
    name: string | null;
    email: string | null;
    role: string | null;
  },
  action: string
) {
  const message = `👤 Staff ${action}!\n\nName: ${staff.name || "Unknown"}\nEmail: ${staff.email || "N/A"}\nRole: ${staff.role || "Support Worker"}\n\nCheck admin dashboard for details.`;

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
