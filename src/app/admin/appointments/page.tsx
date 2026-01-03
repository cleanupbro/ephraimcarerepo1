"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  X,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  ChevronDown,
} from "lucide-react";
import type { Appointment, Participant, AppointmentStatus } from "@/lib/supabase";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No Show" },
];

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  no_show: "bg-yellow-100 text-yellow-700",
};

const statusIcons: Record<AppointmentStatus, typeof CheckCircle> = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
  no_show: AlertCircle,
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

interface FormData {
  participantId: string;
  participantName: string;
  date: string;
  startTime: string;
  endTime: string;
  service: string;
  worker: string;
  location: string;
  notes: string;
}

const initialFormData: FormData = {
  participantId: "",
  participantName: "",
  date: "",
  startTime: "",
  endTime: "",
  service: "",
  worker: "Meshach",
  location: "",
  notes: "",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (fromDate) params.append("from_date", fromDate);
      if (toDate) params.append("to_date", toDate);

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setAppointments(result.data || []);
      } else {
        console.error("Error fetching appointments:", result.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, fromDate, toDate]);

  const fetchParticipants = async () => {
    try {
      const response = await fetch("/api/participants?status=active");
      const result = await response.json();
      if (result.success) {
        setParticipants(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchParticipants();
  }, [fetchAppointments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const method = editingId ? "PATCH" : "POST";
      const body = editingId
        ? { id: editingId, ...formData }
        : formData;

      const response = await fetch("/api/appointments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(false);
        setFormData(initialFormData);
        setEditingId(null);
        fetchAppointments();
      } else {
        alert("Failed to save appointment: " + result.error);
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save appointment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData({
      participantId: appointment.participant_id || "",
      participantName: appointment.participant_name || "",
      date: appointment.date,
      startTime: appointment.start_time,
      endTime: appointment.end_time || "",
      service: appointment.service || "",
      worker: appointment.worker,
      location: appointment.location || "",
      notes: appointment.notes || "",
    });
    setEditingId(appointment.id);
    setShowModal(true);
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setActionLoading(id);
    try {
      const response = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        fetchAppointments();
      } else {
        alert("Failed to update status: " + result.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleParticipantSelect = (participantId: string) => {
    const participant = participants.find((p) => p.id === participantId);
    if (participant) {
      setFormData({
        ...formData,
        participantId: participant.id,
        participantName: `${participant.first_name} ${participant.last_name}`,
      });
    } else {
      setFormData({
        ...formData,
        participantId: "",
        participantName: "",
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
  };

  const openAddModal = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="text-neutral-600">
            {isLoading ? "Loading..." : `${appointments.length} appointments`}
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-medium hover:bg-[#00a893] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Date Range */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-600">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(statusFilter !== "all" || fromDate || toDate) && (
            <button
              onClick={clearFilters}
              className="text-sm text-neutral-500 hover:text-neutral-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-neutral-500">
            <div className="w-8 h-8 border-2 border-[#00BFA5]/30 border-t-[#00BFA5] rounded-full animate-spin mx-auto mb-4" />
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No appointments found
            </h3>
            <p className="text-neutral-500 mb-4">
              {statusFilter !== "all" || fromDate || toDate
                ? "Try adjusting your filters"
                : "Add your first appointment to get started"}
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-medium hover:bg-[#00a893] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Appointment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {appointments.map((appointment) => {
              const StatusIcon = statusIcons[appointment.status] || Clock;
              const isActionLoading = actionLoading === appointment.id;

              return (
                <div
                  key={appointment.id}
                  className="p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Date Badge */}
                      <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 bg-[#00BFA5]/10 rounded-lg text-[#00BFA5]">
                        <span className="text-xs font-medium">
                          {new Date(appointment.date).toLocaleDateString("en-AU", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="text-xl font-bold">
                          {new Date(appointment.date).getDate()}
                        </span>
                        <span className="text-xs">
                          {new Date(appointment.date).toLocaleDateString("en-AU", {
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-neutral-400" />
                          <span className="font-semibold text-neutral-900">
                            {appointment.participant_name || "No participant assigned"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(appointment.start_time)}
                            {appointment.end_time && ` - ${formatTime(appointment.end_time)}`}
                          </span>

                          {appointment.service && (
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5]" />
                              {appointment.service}
                            </span>
                          )}

                          {appointment.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {appointment.location}
                            </span>
                          )}

                          <span className="flex items-center gap-1 text-neutral-400">
                            <User className="w-4 h-4" />
                            {appointment.worker}
                          </span>
                        </div>

                        {/* Mobile date display */}
                        <div className="sm:hidden mt-2 text-sm text-neutral-500">
                          {formatDate(appointment.date)}
                        </div>

                        {appointment.notes && (
                          <p className="mt-2 text-sm text-neutral-500 line-clamp-1">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3 pl-0 sm:pl-20 lg:pl-0">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          statusColors[appointment.status]
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {appointment.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {appointment.status === "scheduled" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, "completed")}
                              disabled={isActionLoading}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Mark Complete"
                            >
                              {isActionLoading ? (
                                <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, "cancelled")}
                              disabled={isActionLoading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleEdit(appointment)}
                          className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingId ? "Edit Appointment" : "Add New Appointment"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Participant */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Participant *
                </label>
                <div className="relative">
                  <select
                    value={formData.participantId}
                    onChange={(e) => handleParticipantSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none appearance-none"
                    required
                  >
                    <option value="">Select a participant</option>
                    {participants.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.first_name} {p.last_name}
                        {p.ndis_number && ` (${p.ndis_number})`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
                  required
                />
              </div>

              {/* Time Range */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Service
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none appearance-none"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Worker */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Worker
                </label>
                <input
                  type="text"
                  value={formData.worker}
                  onChange={(e) => setFormData({ ...formData, worker: e.target.value })}
                  placeholder="e.g., Meshach"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter address or location"
                    className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none"
                  />
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
                  placeholder="Any additional notes..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setFormData(initialFormData);
                  }}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-medium hover:bg-[#00a893] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingId ? (
                        <>
                          <Check className="w-4 h-4" />
                          Update Appointment
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add Appointment
                        </>
                      )}
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
