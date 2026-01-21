"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Plus,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ChevronDown,
  X,
  FileText,
  Award,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: "support_worker" | "coordinator" | "admin";
  connecteam_id: string | null;
  qualifications: string[] | null;
  ndis_worker_screening: string | null;
  screening_expiry: string | null;
  first_aid_expiry: string | null;
  wwcc_number: string | null;
  wwcc_expiry: string | null;
  status: "active" | "inactive" | "on_leave";
  created_at: string;
}

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-neutral-100 text-neutral-700",
  on_leave: "bg-yellow-100 text-yellow-700",
};

const roleColors = {
  support_worker: "bg-blue-100 text-blue-700",
  coordinator: "bg-purple-100 text-purple-700",
  admin: "bg-primary/10 text-primary-700",
};

const roleLabels = {
  support_worker: "Support Worker",
  coordinator: "Coordinator",
  admin: "Admin",
};

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "on_leave", label: "On Leave" },
];

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "support_worker", label: "Support Worker" },
  { value: "coordinator", label: "Coordinator" },
  { value: "admin", label: "Admin" },
];

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [expiringCerts, setExpiringCerts] = useState<StaffMember[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "support_worker",
    ndisWorkerScreening: "",
    screeningExpiry: "",
    firstAidExpiry: "",
    wwccNumber: "",
    wwccExpiry: "",
    qualifications: "",
    status: "active",
  });

  const fetchStaff = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = "/api/staff?";
      if (statusFilter !== "all") url += `status=${statusFilter}&`;
      if (roleFilter !== "all") url += `role=${roleFilter}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setStaff(data.data);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
    setIsLoading(false);
  }, [statusFilter, roleFilter, search]);

  const fetchExpiringCerts = useCallback(async () => {
    try {
      const response = await fetch("/api/staff?expiring_certs=30");
      const data = await response.json();
      if (data.success) {
        setExpiringCerts(data.data);
      }
    } catch (error) {
      console.error("Error fetching expiring certs:", error);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
    fetchExpiringCerts();
  }, [fetchStaff, fetchExpiringCerts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          qualifications: formData.qualifications
            ? formData.qualifications.split(",").map((q) => q.trim())
            : [],
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        fetchStaff();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating staff:", error);
    }
    setIsSaving(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "support_worker",
      ndisWorkerScreening: "",
      screeningExpiry: "",
      firstAidExpiry: "",
      wwccNumber: "",
      wwccExpiry: "",
      qualifications: "",
      status: "active",
    });
  };

  const isExpiringSoon = (date: string | null): boolean => {
    if (!date) return false;
    const expiry = new Date(date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiry <= thirtyDaysFromNow;
  };

  const isExpired = (date: string | null): boolean => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            Staff Management
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage support workers and track compliance credentials
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      {/* Expiring Credentials Alert */}
      {expiringCerts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <p className="font-semibold text-orange-800">
              {expiringCerts.length} Staff with Expiring Credentials
            </p>
          </div>
          <p className="text-sm text-orange-600 mb-3">
            The following staff have credentials expiring within 30 days:
          </p>
          <div className="flex flex-wrap gap-2">
            {expiringCerts.slice(0, 5).map((s) => (
              <span
                key={s.id}
                className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
              >
                {s.name}
              </span>
            ))}
            {expiringCerts.length > 5 && (
              <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                +{expiringCerts.length - 5} more
              </span>
            )}
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
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {roleOptions.map((option) => (
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

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-500">Loading staff...</p>
          </div>
        ) : staff.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No staff found</h3>
            <p className="text-neutral-500 mb-6">
              {search || statusFilter !== "all" || roleFilter !== "all"
                ? "Try adjusting your filters"
                : "Add your first staff member to get started"}
            </p>
          </div>
        ) : (
          staff.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedStaff(member)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{member.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[member.role]}`}>
                      {roleLabels[member.role]}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[member.status]}`}>
                  {member.status.replace("_", " ")}
                </span>
              </div>

              <div className="space-y-2 text-sm text-neutral-600">
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    {member.phone}
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    {member.email}
                  </div>
                )}
              </div>

              {/* Credential Status */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="flex flex-wrap gap-2">
                  {/* NDIS Screening */}
                  <div
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      isExpired(member.screening_expiry)
                        ? "bg-red-100 text-red-700"
                        : isExpiringSoon(member.screening_expiry)
                        ? "bg-orange-100 text-orange-700"
                        : member.screening_expiry
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    NDIS
                    {isExpired(member.screening_expiry) && <XCircle className="w-3 h-3" />}
                    {!isExpired(member.screening_expiry) && member.screening_expiry && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                  </div>

                  {/* First Aid */}
                  <div
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      isExpired(member.first_aid_expiry)
                        ? "bg-red-100 text-red-700"
                        : isExpiringSoon(member.first_aid_expiry)
                        ? "bg-orange-100 text-orange-700"
                        : member.first_aid_expiry
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    First Aid
                  </div>

                  {/* WWCC */}
                  <div
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      isExpired(member.wwcc_expiry)
                        ? "bg-red-100 text-red-700"
                        : isExpiringSoon(member.wwcc_expiry)
                        ? "bg-orange-100 text-orange-700"
                        : member.wwcc_expiry
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    WWCC
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Add Staff Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Staff member name"
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
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="email@example.com"
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
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0400 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="support_worker">Support Worker</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>

                <div className="md:col-span-2 pt-4 border-t border-neutral-200">
                  <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                    Compliance Credentials
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    NDIS Worker Screening #
                  </label>
                  <input
                    type="text"
                    value={formData.ndisWorkerScreening}
                    onChange={(e) => setFormData({ ...formData, ndisWorkerScreening: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Screening number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Screening Expiry
                  </label>
                  <input
                    type="date"
                    value={formData.screeningExpiry}
                    onChange={(e) => setFormData({ ...formData, screeningExpiry: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    First Aid Expiry
                  </label>
                  <input
                    type="date"
                    value={formData.firstAidExpiry}
                    onChange={(e) => setFormData({ ...formData, firstAidExpiry: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    WWCC Number
                  </label>
                  <input
                    type="text"
                    value={formData.wwccNumber}
                    onChange={(e) => setFormData({ ...formData, wwccNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="WWCC number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    WWCC Expiry
                  </label>
                  <input
                    type="date"
                    value={formData.wwccExpiry}
                    onChange={(e) => setFormData({ ...formData, wwccExpiry: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Qualifications (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Cert III Disability, Manual Handling, etc."
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
                      Add Staff
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-neutral-900">Staff Details</h2>
              <button
                onClick={() => setSelectedStaff(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {selectedStaff.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStaff.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[selectedStaff.role]}`}>
                      {roleLabels[selectedStaff.role]}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[selectedStaff.status]}`}>
                      {selectedStaff.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-500">Email</label>
                  <p className="font-medium">{selectedStaff.email || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Phone</label>
                  <p className="font-medium">{selectedStaff.phone || "N/A"}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-3">Compliance Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-neutral-600" />
                      <span>NDIS Worker Screening</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{selectedStaff.ndis_worker_screening || "Not set"}</p>
                      {selectedStaff.screening_expiry && (
                        <p className={`text-xs ${isExpired(selectedStaff.screening_expiry) ? "text-red-600" : isExpiringSoon(selectedStaff.screening_expiry) ? "text-orange-600" : "text-green-600"}`}>
                          Expires: {new Date(selectedStaff.screening_expiry).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-neutral-600" />
                      <span>First Aid</span>
                    </div>
                    <div className="text-right">
                      {selectedStaff.first_aid_expiry ? (
                        <p className={`text-sm ${isExpired(selectedStaff.first_aid_expiry) ? "text-red-600" : isExpiringSoon(selectedStaff.first_aid_expiry) ? "text-orange-600" : "text-green-600"}`}>
                          Expires: {new Date(selectedStaff.first_aid_expiry).toLocaleDateString()}
                        </p>
                      ) : (
                        <p className="text-sm text-neutral-500">Not set</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-neutral-600" />
                      <span>WWCC</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{selectedStaff.wwcc_number || "Not set"}</p>
                      {selectedStaff.wwcc_expiry && (
                        <p className={`text-xs ${isExpired(selectedStaff.wwcc_expiry) ? "text-red-600" : isExpiringSoon(selectedStaff.wwcc_expiry) ? "text-orange-600" : "text-green-600"}`}>
                          Expires: {new Date(selectedStaff.wwcc_expiry).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedStaff.qualifications && selectedStaff.qualifications.length > 0 && (
                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-3">Qualifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.qualifications.map((qual, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
