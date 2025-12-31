import { NextResponse } from "next/server";
import { getStats, getReferrals, getContacts } from "@/lib/db";

// GET - Dashboard statistics
export async function GET() {
  try {
    const stats = await getStats();
    const recentReferrals = (await getReferrals()).slice(0, 5);
    const recentContacts = (await getContacts()).slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentReferrals,
        recentContacts,
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
