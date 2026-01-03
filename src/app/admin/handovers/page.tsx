"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ArrowRightLeft,
  Plus,
  Search,
  Clock,
  CheckCircle,
  User,
  Calendar,
  ChevronDown,
  X,
  FileText,
  Heart,
  AlertCircle,
} from "lucide-react";

interface Handover {
  id: string;
  participant_id: string | null;
  participant_name: string | null;
  outgoing_worker: string;
  incoming_worker: string | null;
  shift_date: string;
  shift_start: string | null;
  shift_end: string | null;
  activities_completed: string | null;
  medications_given: string | null;
  meals_provided: string | null;
  mood_observations: string | null;
  behavior_notes: string | null;
  health_concerns: string | null;
  family_communication: string | null;
  tasks_pending: string | null;
  special_instructions: string | null;
  status: "pending" | "acknowledged" | "reviewed";
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  created_at: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  acknowledged: "bg-blue-100 text-blue-700",
  reviewed: "bg-green-100 text-green-700",
};

const moodOptions = [
  "Happy",
  "Calm",
  "Anxious",
  "Upset",
  "Agitated",
  "Tired",
  "Energetic",
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "reviewed", label: "Reviewed" },
];

export default function HandoversPage() {
  const [handovers, setHandovers] = useState<Handover[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedHandover, setSelectedHandover] = useState<Handover | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    participantName: "",
    outgoingWorker: "",
    incomingWorker: "",
    shiftDate: new Date().toISOString().split("T")[0],
    shiftStart: "",
    shiftEnd: "",
    activitiesCompleted: "",
    medicationsGiven: "",
    mealsProvided: "",
    moodObservations: "",
    behaviorNotes: "",
    healthConcerns: "",
    familyCommunication: "",
    tasksPending: "",
    specialInstructions: "",
  });

  const fetchHandovers = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = "/api/handovers?";
      if (statusFilter !== "all") url += `status=${statusFilter}&`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setHandovers(data.data);
      }
    } catch (error) {
      console.error("Error fetching handovers:", error);
    }
    setIsLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    fetchHandovers();
  }, [fetchHandovers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/handovers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        fetchHandovers();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating handover:", error);
    }
    setIsSaving(false);
  };

  const handleAcknowledge = async (id: string) => {
    try {
      const response = await fetch("/api/handovers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: "acknowledged",
          acknowledgedBy: "Admin",
          acknowledgedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        fetchHandovers();
      }
    } catch (error) {
      console.error("Error acknowledging handover:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      participantName: "",
      outgoingWorker: "",
      incomingWorker: "",
      shiftDate: new Date().toISOString().split("T")[0],
      shiftStart: "",
      shiftEnd: "",
      activitiesCompleted: "",
      medicationsGiven: "",
      mealsProvided: "",
      moodObservations: "",
      behaviorNotes: "",
      healthConcerns: "",
      familyCommunication: "",
      tasksPending: "",
      specialInstructions: "",
    });
  };

  const filteredHandovers = handovers.filter((handover) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      handover.participant_name?.toLowerCase().includes(searchLower) ||
      handover.outgoing_worker.toLowerCase().includes(searchLower) ||
      handover.incoming_worker?.toLowerCase().includes(searchLower)
    );
  });

  const pendingCount = handovers.filter((h) => h.status === "pending").length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <ArrowRightLeft className="w-7 h-7 text-primary" />
            Shift Handovers
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage shift transitions and handover notes
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Handover
        </button>
      </div>

      {/* Pending Alert */}
      {pendingCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">
              {pendingCount} Pending Handover{pendingCount > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-yellow-600">
              Review and acknowledge handovers to ensure continuity of care
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search handovers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Handovers List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-500">Loading handovers...</p>
          </div>
        ) : filteredHandovers.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <ArrowRightLeft className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No handovers found</h3>
            <p className="text-neutral-500 mb-6">
              {search || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "No shift handovers have been submitted yet"}
            </p>
          </div>
        ) : (
          filteredHandovers.map((handover) => (
            <div
              key={handover.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[handover.status]}`}>
                      {handover.status.charAt(0).toUpperCase() + handover.status.slice(1)}
                    </span>
                    {handover.health_concerns && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Health Concern
                      </span>
                    )}
                    {handover.tasks_pending && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Tasks Pending
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {handover.participant_name || "General Handover"}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(handover.shift_date).toLocaleDateString()}
                    </span>
                    {handover.shift_start && handover.shift_end && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {handover.shift_start} - {handover.shift_end}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {handover.outgoing_worker} → {handover.incoming_worker || "TBD"}
                    </span>
                  </div>

                  {handover.mood_observations && (
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-neutral-600">Mood: {handover.mood_observations}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {handover.status === "pending" && (
                    <button
                      onClick={() => handleAcknowledge(handover.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedHandover(handover)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Handover Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">New Shift Handover</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Participant Name
                  </label>
                  <input
                    type="text"
                    value={formData.participantName}
                    onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Participant name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Outgoing Worker *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.outgoingWorker}
                    onChange={(e) => setFormData({ ...formData, outgoingWorker: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Incoming Worker
                  </label>
                  <input
                    type="text"
                    value={formData.incomingWorker}
                    onChange={(e) => setFormData({ ...formData, incomingWorker: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Next worker"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shift Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.shiftDate}
                    onChange={(e) => setFormData({ ...formData, shiftDate: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shift Start
                  </label>
                  <input
                    type="time"
                    value={formData.shiftStart}
                    onChange={(e) => setFormData({ ...formData, shiftStart: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shift End
                  </label>
                  <input
                    type="time"
                    value={formData.shiftEnd}
                    onChange={(e) => setFormData({ ...formData, shiftEnd: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Mood Observations
                  </label>
                  <select
                    value={formData.moodObservations}
                    onChange={(e) => setFormData({ ...formData, moodObservations: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select mood...</option>
                    {moodOptions.map((mood) => (
                      <option key={mood} value={mood.toLowerCase()}>
                        {mood}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Meals Provided
                  </label>
                  <input
                    type="text"
                    value={formData.mealsProvided}
                    onChange={(e) => setFormData({ ...formData, mealsProvided: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Breakfast, Lunch, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Activities Completed
                  </label>
                  <textarea
                    rows={2}
                    value={formData.activitiesCompleted}
                    onChange={(e) => setFormData({ ...formData, activitiesCompleted: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="What activities were completed during the shift?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Medications Given
                  </label>
                  <textarea
                    rows={2}
                    value={formData.medicationsGiven}
                    onChange={(e) => setFormData({ ...formData, medicationsGiven: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="List any medications administered..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Health Concerns
                  </label>
                  <textarea
                    rows={2}
                    value={formData.healthConcerns}
                    onChange={(e) => setFormData({ ...formData, healthConcerns: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Any health concerns to note?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Tasks Pending
                  </label>
                  <textarea
                    rows={2}
                    value={formData.tasksPending}
                    onChange={(e) => setFormData({ ...formData, tasksPending: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Tasks for next worker..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Any special instructions for the next shift?"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Submit Handover
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Handover Detail Modal */}
      {selectedHandover && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Handover Details</h2>
              <button
                onClick={() => setSelectedHandover(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedHandover.status]}`}>
                  {selectedHandover.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-500">Participant</label>
                  <p className="font-medium">{selectedHandover.participant_name || "General"}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Date</label>
                  <p className="font-medium">{new Date(selectedHandover.shift_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Outgoing Worker</label>
                  <p className="font-medium">{selectedHandover.outgoing_worker}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Incoming Worker</label>
                  <p className="font-medium">{selectedHandover.incoming_worker || "TBD"}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Shift Time</label>
                  <p className="font-medium">
                    {selectedHandover.shift_start && selectedHandover.shift_end
                      ? `${selectedHandover.shift_start} - ${selectedHandover.shift_end}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Mood</label>
                  <p className="font-medium">{selectedHandover.mood_observations || "N/A"}</p>
                </div>
              </div>

              {selectedHandover.activities_completed && (
                <div>
                  <label className="text-sm text-neutral-500">Activities Completed</label>
                  <p className="mt-1 text-neutral-700">{selectedHandover.activities_completed}</p>
                </div>
              )}

              {selectedHandover.medications_given && (
                <div>
                  <label className="text-sm text-neutral-500">Medications Given</label>
                  <p className="mt-1 text-neutral-700">{selectedHandover.medications_given}</p>
                </div>
              )}

              {selectedHandover.health_concerns && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <label className="text-sm text-red-700 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Health Concerns
                  </label>
                  <p className="mt-1 text-red-800">{selectedHandover.health_concerns}</p>
                </div>
              )}

              {selectedHandover.tasks_pending && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <label className="text-sm text-orange-700 font-medium">Tasks Pending</label>
                  <p className="mt-1 text-orange-800">{selectedHandover.tasks_pending}</p>
                </div>
              )}

              {selectedHandover.special_instructions && (
                <div>
                  <label className="text-sm text-neutral-500">Special Instructions</label>
                  <p className="mt-1 text-neutral-700">{selectedHandover.special_instructions}</p>
                </div>
              )}

              {selectedHandover.acknowledged_by && (
                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-500">
                    Acknowledged by {selectedHandover.acknowledged_by} on{" "}
                    {selectedHandover.acknowledged_at
                      ? new Date(selectedHandover.acknowledged_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
