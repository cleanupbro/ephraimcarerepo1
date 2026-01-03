"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Calendar,
  ChevronRight,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Participant } from "@/lib/supabase";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "waitlist", label: "Waitlist" },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-neutral-100 text-neutral-700",
  waitlist: "bg-yellow-100 text-yellow-700",
};

const statusIcons = {
  active: CheckCircle,
  inactive: XCircle,
  waitlist: Clock,
};

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    ndisNumber: "",
    dob: "",
    address: "",
    suburb: "",
    planStartDate: "",
    planEndDate: "",
    planBudget: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    services: [] as string[],
    notes: "",
    status: "active",
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchParticipants = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,ndis_number.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching participants:", error);
    } else {
      setParticipants(data || []);
    }

    setIsLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchParticipants();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(false);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          ndisNumber: "",
          dob: "",
          address: "",
          suburb: "",
          planStartDate: "",
          planEndDate: "",
          planBudget: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          services: [],
          notes: "",
          status: "active",
        });
        fetchParticipants();
      } else {
        alert("Failed to add participant: " + result.error);
      }
    } catch (error) {
      console.error("Error saving participant:", error);
      alert("Failed to save participant");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const serviceOptions = [
    "Personal Care",
    "Community Access",
    "Supported Independent Living",
    "Travel & Transport",
    "Plan Management",
    "Psychosocial Recovery",
    "Domestic Assistance",
    "Respite Care",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Participants</h1>
          <p className="text-neutral-600">
            {isLoading ? "Loading..." : `${participants.length} participants`}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Participant
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or NDIS number..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </form>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Participants list */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-neutral-500">Loading participants...</div>
        ) : participants.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No participants yet</h3>
            <p className="text-neutral-500 mb-4">Add your first participant to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#1565C0] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Participant
            </button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {participants.map((participant) => {
              const StatusIcon = statusIcons[participant.status as keyof typeof statusIcons] || CheckCircle;
              return (
                <Link
                  key={participant.id}
                  href={`/admin/participants/${participant.id}`}
                  className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {participant.first_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {participant.first_name} {participant.last_name}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                        {participant.ndis_number && (
                          <span>NDIS: {participant.ndis_number}</span>
                        )}
                        {participant.suburb && <span>📍 {participant.suburb}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-3 text-sm text-neutral-500">
                      {participant.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {participant.phone}
                        </span>
                      )}
                      {participant.plan_end_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Plan ends: {formatDate(participant.plan_end_date)}
                        </span>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        statusColors[participant.status as keyof typeof statusColors] || "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-neutral-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Participant Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Add New Participant</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Personal Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      NDIS Number
                    </label>
                    <input
                      type="text"
                      value={formData.ndisNumber}
                      onChange={(e) => setFormData({ ...formData, ndisNumber: e.target.value })}
                      placeholder="e.g., 1234567890"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Suburb
                    </label>
                    <input
                      type="text"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="waitlist">Waitlist</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* NDIS Plan Details */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  NDIS Plan Details
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Plan Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.planStartDate}
                      onChange={(e) => setFormData({ ...formData, planStartDate: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Plan End Date
                    </label>
                    <input
                      type="date"
                      value={formData.planEndDate}
                      onChange={(e) => setFormData({ ...formData, planEndDate: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Plan Budget ($)
                    </label>
                    <input
                      type="number"
                      value={formData.planBudget}
                      onChange={(e) => setFormData({ ...formData, planBudget: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                  Services Required
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, services: [...formData.services, service] });
                          } else {
                            setFormData({
                              ...formData,
                              services: formData.services.filter((s) => s !== service),
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-neutral-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency Contact
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#1565C0] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Participant
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
