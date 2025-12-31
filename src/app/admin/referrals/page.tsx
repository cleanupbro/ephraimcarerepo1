"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface Referral {
  id: string;
  participantName: string;
  participantPhone: string;
  participantEmail: string;
  ndisNumber: string;
  suburb: string;
  services: string[];
  referrerName: string;
  referrerRole: string;
  referrerOrg: string;
  referrerPhone: string;
  referrerEmail: string;
  goals: string;
  status: "new" | "contacted" | "in_progress" | "approved" | "declined";
  createdAt: string;
  notes: string;
}

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-purple-100 text-purple-700",
  approved: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

const statusIcons = {
  new: AlertCircle,
  contacted: Clock,
  in_progress: Clock,
  approved: CheckCircle,
  declined: X,
};

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await fetch("/api/referrals");
      const data = await response.json();
      if (data.success) {
        setReferrals(data.data);
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/referrals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchReferrals();
        if (selectedReferral?.id === id) {
          setSelectedReferral({ ...selectedReferral, status: status as Referral["status"] });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredReferrals = referrals.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch =
      search === "" ||
      r.participantName.toLowerCase().includes(search.toLowerCase()) ||
      r.suburb.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Referrals</h1>
          <p className="text-neutral-600">{referrals.length} total referrals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or suburb..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {filteredReferrals.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No referrals found</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredReferrals.map((referral) => {
              const StatusIcon = statusIcons[referral.status];
              return (
                <div
                  key={referral.id}
                  className="p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedReferral(referral)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">
                          {referral.participantName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">
                          {referral.participantName}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {referral.services.slice(0, 2).join(", ")}
                          {referral.services.length > 2 && ` +${referral.services.length - 2}`}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {referral.suburb || "N/A"}
                          </span>
                          <span>{formatDate(referral.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColors[referral.status]}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {referral.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReferral && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Referral Details</h2>
              <button
                onClick={() => setSelectedReferral(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Participant Info */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Participant</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Name</p>
                    <p className="font-medium">{selectedReferral.participantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">NDIS Number</p>
                    <p className="font-medium">{selectedReferral.ndisNumber || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <a href={`tel:${selectedReferral.participantPhone}`} className="font-medium text-primary flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedReferral.participantPhone || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <a href={`mailto:${selectedReferral.participantEmail}`} className="font-medium text-primary flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedReferral.participantEmail || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Suburb</p>
                    <p className="font-medium">{selectedReferral.suburb || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Services Requested</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReferral.services.map((service, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Goals */}
              {selectedReferral.goals && (
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Goals</h3>
                  <p className="text-neutral-600">{selectedReferral.goals}</p>
                </div>
              )}

              {/* Referrer */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Referrer</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Name</p>
                    <p className="font-medium">{selectedReferral.referrerName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Role</p>
                    <p className="font-medium">{selectedReferral.referrerRole || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Organisation</p>
                    <p className="font-medium">{selectedReferral.referrerOrg || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Contact</p>
                    <p className="font-medium">{selectedReferral.referrerPhone || selectedReferral.referrerEmail || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {(["new", "contacted", "in_progress", "approved", "declined"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedReferral.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedReferral.status === status
                          ? statusColors[status]
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {status.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
