import { NextResponse } from "next/server";
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

// GET - Dashboard statistics
export async function GET() {
  try {
    const supabase = getSupabase();

    // Fetch referral stats
    const { data: referrals, count: totalReferrals } = await supabase
      .from("referrals")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Fetch contact stats
    const { data: contacts, count: totalContacts } = await supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    const referralData = referrals || [];
    const contactData = contacts || [];

    // Calculate this month's referrals
    const now = new Date();
    const thisMonthReferrals = referralData.filter((r) => {
      const created = new Date(r.created_at);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    });

    const stats = {
      totalReferrals: totalReferrals || 0,
      newReferrals: referralData.filter((r) => r.status === "new").length,
      approvedReferrals: referralData.filter((r) => r.status === "approved").length,
      totalContacts: totalContacts || 0,
      unreadContacts: contactData.filter((c) => c.status === "unread").length,
      thisMonthReferrals: thisMonthReferrals.length,
    };

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentReferrals: referralData.slice(0, 5),
        recentContacts: contactData.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
