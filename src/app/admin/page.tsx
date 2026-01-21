"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  RefreshCw,
  UserPlus,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Referral, Contact, Appointment } from "@/lib/supabase";

interface DashboardStats {
  totalReferrals: number;
  newReferrals: number;
  activeParticipants: number;
  pendingContacts: number;
  upcomingAppointments: number;
}

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-orange-100 text-orange-700",
  approved: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  unread: "bg-blue-100 text-blue-700",
  read: "bg-neutral-100 text-neutral-700",
  responded: "bg-green-100 text-green-700",
};

const statusIcons = {
  new: AlertCircle,
  contacted: Clock,
  in_progress: Clock,
  approved: CheckCircle,
  declined: XCircle,
  unread: AlertCircle,
  read: CheckCircle,
  responded: CheckCircle,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReferrals: 0,
    newReferrals: 0,
    activeParticipants: 0,
    pendingContacts: 0,
    upcomingAppointments: 0,
  });
  const [recentReferrals, setRecentReferrals] = useState<Referral[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // Fetch referrals
      const { data: referrals, count: referralCount } = await supabase
        .from("referrals")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(5);

      // Count new referrals
      const { count: newReferralCount } = await supabase
        .from("referrals")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      // Fetch contacts
      const { data: contacts, count: contactCount } = await supabase
        .from("contacts")
        .select("*", { count: "exact" })
        .eq("status", "unread")
        .order("created_at", { ascending: false })
        .limit(5);

      // Fetch participants count
      const { count: participantCount } = await supabase
        .from("participants")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Fetch upcoming appointments
      const today = new Date().toISOString().split("T")[0];
      const { data: appointments, count: appointmentCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact" })
        .gte("date", today)
        .eq("status", "scheduled")
        .order("date", { ascending: true })
        .order("start_time", { ascending: true })
        .limit(5);

      setStats({
        totalReferrals: referralCount || 0,
        newReferrals: newReferralCount || 0,
        activeParticipants: participantCount || 0,
        pendingContacts: contactCount || 0,
        upcomingAppointments: appointmentCount || 0,
      });

      setRecentReferrals((referrals as Referral[]) || []);
      setRecentContacts((contacts as Contact[]) || []);
      setUpcomingAppointments((appointments as Appointment[]) || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formatDate = (date: string, time?: string) => {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateStr = "";
    if (d.toDateString() === today.toDateString()) {
      dateStr = "Today";
    } else if (d.toDateString() === tomorrow.toDateString()) {
      dateStr = "Tomorrow";
    } else {
      dateStr = d.toLocaleDateString("en-AU", { month: "short", day: "numeric" });
    }

    if (time) {
      const [hours, minutes] = time.split(":");
      const timeDate = new Date();
      timeDate.setHours(parseInt(hours), parseInt(minutes));
      dateStr += `, ${timeDate.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}`;
    }

    return dateStr;
  };

  const statCards = [
    {
      label: "Total Referrals",
      value: stats.totalReferrals,
      subtext: `${stats.newReferrals} new`,
      icon: FileText,
      color: "from-blue-400 to-indigo-500",
      href: "/admin/referrals",
    },
    {
      label: "Active Participants",
      value: stats.activeParticipants,
      subtext: "Currently active",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      href: "/admin/participants",
    },
    {
      label: "Pending Contacts",
      value: stats.pendingContacts,
      subtext: "Awaiting response",
      icon: MessageSquare,
      color: "from-yellow-400 to-orange-500",
      href: "/admin/contacts",
    },
    {
      label: "Upcoming",
      value: stats.upcomingAppointments,
      subtext: "Appointments",
      icon: Calendar,
      color: "from-purple-400 to-violet-500",
      href: "/admin/appointments",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">Welcome back, Meshach</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-sm text-neutral-500">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-lg hover:border-primary-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-neutral-900">
                {isLoading ? "—" : stat.value}
              </p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
              <p className="text-xs text-neutral-400 mt-1">{stat.subtext}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent referrals */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Recent Referrals</h2>
            <Link
              href="/admin/referrals"
              className="text-sm text-[#1565C0] hover:text-[#0D47A1] font-medium flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {isLoading ? (
              <div className="p-8 text-center text-neutral-500">Loading...</div>
            ) : recentReferrals.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">No referrals yet</p>
                <p className="text-sm text-neutral-400 mt-1">New referrals will appear here</p>
              </div>
            ) : (
              recentReferrals.map((referral) => {
                const StatusIcon = statusIcons[referral.status as keyof typeof statusIcons] || AlertCircle;
                return (
                  <div key={referral.id} className="p-4 flex items-center justify-between hover:bg-neutral-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {referral.first_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">
                          {referral.first_name} {referral.last_name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {referral.services?.slice(0, 2).join(", ") || "No services specified"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          statusColors[referral.status as keyof typeof statusColors] || "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {referral.status.charAt(0).toUpperCase() + referral.status.slice(1).replace("_", " ")}
                      </span>
                      <p className="text-xs text-neutral-400 mt-1">
                        {formatTimeAgo(referral.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming appointments */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900">Upcoming</h2>
              <Link
                href="/admin/appointments"
                className="text-sm text-[#1565C0] hover:text-[#0D47A1] font-medium"
              >
                View All
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {isLoading ? (
                <p className="text-center text-neutral-500 py-4">Loading...</p>
              ) : upcomingAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <Calendar className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">No upcoming appointments</p>
                </div>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{apt.participant_name || "TBD"}</p>
                      <p className="text-sm text-neutral-500">{apt.service || "General"}</p>
                      <p className="text-xs text-primary font-medium mt-1">
                        {formatDate(apt.date, apt.start_time)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <Link
                href="/admin/appointments"
                className="block w-full py-2 text-sm text-[#1565C0] hover:text-white font-medium border border-[#1565C0] rounded-lg hover:bg-[#1565C0] transition-colors text-center"
              >
                View Calendar
              </Link>
            </div>
          </div>

          {/* Recent contacts */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900">New Contacts</h2>
              <Link
                href="/admin/contacts"
                className="text-sm text-[#1565C0] hover:text-[#0D47A1] font-medium"
              >
                View All
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {isLoading ? (
                <p className="text-center text-neutral-500 py-4">Loading...</p>
              ) : recentContacts.length === 0 ? (
                <div className="text-center py-4">
                  <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">No pending contacts</p>
                </div>
              ) : (
                recentContacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 text-sm truncate">{contact.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{contact.message?.slice(0, 50)}...</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/referrals"
          className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">View Referrals</p>
            <p className="text-sm text-neutral-500">Manage all referrals</p>
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-yellow-300 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">View Contacts</p>
            <p className="text-sm text-neutral-500">Check messages</p>
          </div>
        </Link>

        <Link
          href="/admin/participants"
          className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Add Participant</p>
            <p className="text-sm text-neutral-500">Register new client</p>
          </div>
        </Link>

        <Link
          href="/admin/appointments"
          className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Schedule</p>
            <p className="text-sm text-neutral-500">Book appointments</p>
          </div>
        </Link>
      </div>

      {/* Support banner */}
      <div className="bg-gradient-to-r from-primary to-primary-800 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Need Help?</h3>
            <p className="text-primary-100 mt-1">
              Contact our support team for assistance with your admin dashboard.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:theopbros.ai@gmail.com"
              className="px-5 py-2.5 bg-white text-[#1565C0] font-medium rounded-lg hover:bg-[#E3F2FD] transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/"
              className="px-5 py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors"
            >
              View Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
