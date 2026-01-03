"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AlertTriangle,
  Plus,
  Search,
  Clock,
  AlertCircle,
  FileText,
  User,
  Calendar,
  MapPin,
  ChevronDown,
  X,
  Shield,
  Flag,
} from "lucide-react";

interface Incident {
  id: string;
  participant_id: string | null;
  participant_name: string | null;
  reporter_name: string;
  reporter_role: string | null;
  incident_date: string;
  incident_time: string | null;
  incident_type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string | null;
  description: string;
  immediate_actions: string | null;
  witnesses: string | null;
  follow_up_required: boolean;
  follow_up_actions: string | null;
  reported_to_ndis: boolean;
  ndis_report_date: string | null;
  status: "open" | "investigating" | "resolved" | "closed";
  resolution_notes: string | null;
  created_at: string;
}

const severityColors = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const statusColors = {
  open: "bg-red-100 text-red-700",
  investigating: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-neutral-100 text-neutral-700",
};

const incidentTypes = [
  "Injury",
  "Medication Error",
  "Behavior",
  "Property Damage",
  "Near Miss",
  "Abuse/Neglect",
  "Unauthorized Restrictive Practice",
  "Other",
];

const severityOptions = [
  { value: "all", label: "All Severity" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "investigating", label: "Investigating" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    participantName: "",
    reporterName: "",
    reporterRole: "",
    incidentDate: new Date().toISOString().split("T")[0],
    incidentTime: "",
    incidentType: "",
    severity: "low",
    location: "",
    description: "",
    immediateActions: "",
    witnesses: "",
    followUpRequired: false,
    followUpActions: "",
  });

  const fetchIncidents = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = "/api/incidents?";
      if (severityFilter !== "all") url += `severity=${severityFilter}&`;
      if (statusFilter !== "all") url += `status=${statusFilter}&`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setIncidents(data.data);
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
    setIsLoading(false);
  }, [severityFilter, statusFilter]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        fetchIncidents();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating incident:", error);
    }
    setIsSaving(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/incidents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        fetchIncidents();
      }
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  const handleNdisReport = async (id: string) => {
    try {
      const response = await fetch("/api/incidents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          reportedToNdis: true,
          ndisReportDate: new Date().toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        fetchIncidents();
      }
    } catch (error) {
      console.error("Error marking NDIS reported:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      participantName: "",
      reporterName: "",
      reporterRole: "",
      incidentDate: new Date().toISOString().split("T")[0],
      incidentTime: "",
      incidentType: "",
      severity: "low",
      location: "",
      description: "",
      immediateActions: "",
      witnesses: "",
      followUpRequired: false,
      followUpActions: "",
    });
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      incident.participant_name?.toLowerCase().includes(searchLower) ||
      incident.reporter_name.toLowerCase().includes(searchLower) ||
      incident.description.toLowerCase().includes(searchLower)
    );
  });

  const criticalCount = incidents.filter(
    (i) => (i.severity === "critical" || i.severity === "high") && i.status === "open"
  ).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-orange-500" />
            Incident Reports
          </h1>
          <p className="text-neutral-500 mt-1">
            Track and manage NDIS reportable incidents
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Report Incident
        </button>
      </div>

      {/* Critical Alert Banner */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">
              {criticalCount} High/Critical Incident{criticalCount > 1 ? "s" : ""} Require Attention
            </p>
            <p className="text-sm text-red-600">
              NDIS requires reportable incidents to be reported within 24 hours
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
              placeholder="Search incidents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {severityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
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

      {/* Incidents List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-500">Loading incidents...</p>
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No incidents found</h3>
            <p className="text-neutral-500 mb-6">
              {search || severityFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "No incidents have been reported yet"}
            </p>
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityColors[incident.severity]}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[incident.status]}`}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                      {incident.incident_type}
                    </span>
                    {!incident.reported_to_ndis && (incident.severity === "high" || incident.severity === "critical") && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        NDIS Report Required
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {incident.participant_name || "Unknown Participant"}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {incident.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(incident.incident_date).toLocaleDateString()}
                    </span>
                    {incident.incident_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {incident.incident_time}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {incident.reporter_name}
                    </span>
                    {incident.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {incident.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!incident.reported_to_ndis && (incident.severity === "high" || incident.severity === "critical") && (
                    <button
                      onClick={() => handleNdisReport(incident.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Report to NDIS
                    </button>
                  )}
                  {incident.status !== "closed" && (
                    <select
                      value={incident.status}
                      onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                      className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  )}
                  <button
                    onClick={() => setSelectedIncident(incident)}
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

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Report New Incident</h2>
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
                    placeholder="Participant involved"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Reporter Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reporterName}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Incident Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Incident Time
                  </label>
                  <input
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => setFormData({ ...formData, incidentTime: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Incident Type *
                  </label>
                  <select
                    required
                    value={formData.incidentType}
                    onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select type...</option>
                    {incidentTypes.map((type) => (
                      <option key={type} value={type.toLowerCase().replace(/ /g, "_")}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Severity *
                  </label>
                  <select
                    required
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Where did this occur?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Describe what happened in detail..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Immediate Actions Taken
                  </label>
                  <textarea
                    rows={2}
                    value={formData.immediateActions}
                    onChange={(e) => setFormData({ ...formData, immediateActions: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="What immediate actions were taken?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.followUpRequired}
                      onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                      className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Follow-up action required
                    </span>
                  </label>
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
                      Report Incident
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Incident Details</h2>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${severityColors[selectedIncident.severity]}`}>
                  {selectedIncident.severity.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedIncident.status]}`}>
                  {selectedIncident.status}
                </span>
                {selectedIncident.reported_to_ndis && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    Reported to NDIS
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-500">Participant</label>
                  <p className="font-medium">{selectedIncident.participant_name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Reporter</label>
                  <p className="font-medium">{selectedIncident.reporter_name}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Date</label>
                  <p className="font-medium">{new Date(selectedIncident.incident_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Time</label>
                  <p className="font-medium">{selectedIncident.incident_time || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Type</label>
                  <p className="font-medium">{selectedIncident.incident_type}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Location</label>
                  <p className="font-medium">{selectedIncident.location || "N/A"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-500">Description</label>
                <p className="mt-1 text-neutral-700 whitespace-pre-wrap">{selectedIncident.description}</p>
              </div>

              {selectedIncident.immediate_actions && (
                <div>
                  <label className="text-sm text-neutral-500">Immediate Actions</label>
                  <p className="mt-1 text-neutral-700">{selectedIncident.immediate_actions}</p>
                </div>
              )}

              {selectedIncident.witnesses && (
                <div>
                  <label className="text-sm text-neutral-500">Witnesses</label>
                  <p className="mt-1 text-neutral-700">{selectedIncident.witnesses}</p>
                </div>
              )}

              {selectedIncident.resolution_notes && (
                <div>
                  <label className="text-sm text-neutral-500">Resolution Notes</label>
                  <p className="mt-1 text-neutral-700">{selectedIncident.resolution_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
