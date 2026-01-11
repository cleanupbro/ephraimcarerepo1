"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Briefcase,
  Heart,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Participant } from "@/lib/supabase";

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

export default function ParticipantProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    suburb: "",
    ndisNumber: "",
    planStartDate: "",
    planEndDate: "",
    planBudget: "",
    services: [] as string[],
    emergencyContactName: "",
    emergencyContactPhone: "",
    notes: "",
    status: "active",
  });

  const fetchParticipant = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("participants")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching participant:", fetchError);
      setError("Failed to load participant. They may not exist.");
    } else if (data) {
      setParticipant(data);
      // Populate form data for editing
      setFormData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        phone: data.phone || "",
        email: data.email || "",
        dob: data.dob || "",
        address: data.address || "",
        suburb: data.suburb || "",
        ndisNumber: data.ndis_number || "",
        planStartDate: data.plan_start_date || "",
        planEndDate: data.plan_end_date || "",
        planBudget: data.plan_budget?.toString() || "",
        services: data.services || [],
        emergencyContactName: data.emergency_contact_name || "",
        emergencyContactPhone: data.emergency_contact_phone || "",
        notes: data.notes || "",
        status: data.status || "active",
      });
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchParticipant();
    }
  }, [id, fetchParticipant]);

  const handleSave = async () => {
    if (!participant) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/participants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: participant.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || null,
          email: formData.email || null,
          dob: formData.dob || null,
          address: formData.address || null,
          suburb: formData.suburb || null,
          ndisNumber: formData.ndisNumber || null,
          planStartDate: formData.planStartDate || null,
          planEndDate: formData.planEndDate || null,
          planBudget: formData.planBudget ? parseFloat(formData.planBudget) : null,
          services: formData.services,
          emergencyContactName: formData.emergencyContactName || null,
          emergencyContactPhone: formData.emergencyContactPhone || null,
          notes: formData.notes || null,
          status: formData.status,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setParticipant(result.data);
        setIsEditing(false);
      } else {
        setError("Failed to update participant: " + result.error);
      }
    } catch (err) {
      console.error("Error saving participant:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (participant) {
      setFormData({
        firstName: participant.first_name || "",
        lastName: participant.last_name || "",
        phone: participant.phone || "",
        email: participant.email || "",
        dob: participant.dob || "",
        address: participant.address || "",
        suburb: participant.suburb || "",
        ndisNumber: participant.ndis_number || "",
        planStartDate: participant.plan_start_date || "",
        planEndDate: participant.plan_end_date || "",
        planBudget: participant.plan_budget?.toString() || "",
        services: participant.services || [],
        emergencyContactName: participant.emergency_contact_name || "",
        emergencyContactPhone: participant.emergency_contact_phone || "",
        notes: participant.notes || "",
        status: participant.status || "active",
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "Not set";
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateAge = (dob: string | null) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculatePlanDaysRemaining = (endDate: string | null) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-neutral-500">Loading participant...</p>
        </div>
      </div>
    );
  }

  if (error && !participant) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/participants"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Participants
        </Link>
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Participant Not Found</h2>
          <p className="text-neutral-500 mb-6">{error}</p>
          <button
            onClick={() => router.push("/admin/participants")}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#00A896] transition-colors"
          >
            Return to List
          </button>
        </div>
      </div>
    );
  }

  if (!participant) return null;

  const StatusIcon = statusIcons[participant.status as keyof typeof statusIcons] || CheckCircle;
  const age = calculateAge(participant.dob);
  const daysRemaining = calculatePlanDaysRemaining(participant.plan_end_date);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/participants"
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">
                {participant.first_name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                {participant.first_name} {participant.last_name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    statusColors[participant.status as keyof typeof statusColors] || "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                </span>
                {participant.ndis_number && (
                  <span className="text-sm text-neutral-500">
                    NDIS: {participant.ndis_number}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#00A896] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#00A896] transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </h2>
            </div>
            <div className="p-5">
              {isEditing ? (
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
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-500">Phone</p>
                      <p className="font-medium text-neutral-900">
                        {participant.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-500">Email</p>
                      <p className="font-medium text-neutral-900">
                        {participant.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-500">Date of Birth</p>
                      <p className="font-medium text-neutral-900">
                        {formatDate(participant.dob)}
                        {age !== null && <span className="text-neutral-500 ml-2">({age} years old)</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-500">Address</p>
                      <p className="font-medium text-neutral-900">
                        {participant.address || participant.suburb || "Not provided"}
                        {participant.address && participant.suburb && (
                          <span className="block text-neutral-600">{participant.suburb}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* NDIS Details */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                NDIS Details
              </h2>
            </div>
            <div className="p-5">
              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4">
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
                      Plan Budget ($)
                    </label>
                    <input
                      type="number"
                      value={formData.planBudget}
                      onChange={(e) => setFormData({ ...formData, planBudget: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
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
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-neutral-500">NDIS Number</p>
                      <p className="font-medium text-neutral-900 text-lg">
                        {participant.ndis_number || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Plan Budget</p>
                      <p className="font-medium text-neutral-900 text-lg flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        {formatCurrency(participant.plan_budget)}
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                    <div>
                      <p className="text-sm text-neutral-500">Plan Start Date</p>
                      <p className="font-medium text-neutral-900">
                        {formatDate(participant.plan_start_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Plan End Date</p>
                      <p className="font-medium text-neutral-900">
                        {formatDate(participant.plan_end_date)}
                        {daysRemaining !== null && (
                          <span
                            className={`ml-2 text-sm ${
                              daysRemaining <= 30
                                ? "text-red-600"
                                : daysRemaining <= 90
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            ({daysRemaining > 0 ? `${daysRemaining} days remaining` : "Expired"})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Services
              </h2>
            </div>
            <div className="p-5">
              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-neutral-50">
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
              ) : participant.services && participant.services.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {participant.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500">No services assigned</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Notes
              </h2>
            </div>
            <div className="p-5">
              {isEditing ? (
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  placeholder="Add notes about this participant..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                />
              ) : (
                <p className="text-neutral-700 whitespace-pre-wrap">
                  {participant.notes || "No notes added"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contact */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Emergency Contact
              </h2>
            </div>
            <div className="p-5">
              {isEditing ? (
                <div className="space-y-4">
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
              ) : participant.emergency_contact_name || participant.emergency_contact_phone ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-sm text-neutral-500">Name</p>
                      <p className="font-medium text-neutral-900">
                        {participant.emergency_contact_name || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-sm text-neutral-500">Phone</p>
                      <p className="font-medium text-neutral-900">
                        {participant.emergency_contact_phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                  {participant.emergency_contact_phone && (
                    <a
                      href={`tel:${participant.emergency_contact_phone}`}
                      className="block w-full py-2 text-sm text-red-600 hover:text-white font-medium border border-red-300 rounded-lg hover:bg-red-600 transition-colors text-center mt-4"
                    >
                      Call Emergency Contact
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-neutral-500">No emergency contact set</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-neutral-200">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="font-semibold text-neutral-900">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              {participant.phone && (
                <a
                  href={`tel:${participant.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Call Participant</p>
                    <p className="text-sm text-neutral-500">{participant.phone}</p>
                  </div>
                </a>
              )}
              {participant.email && (
                <a
                  href={`mailto:${participant.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Send Email</p>
                    <p className="text-sm text-neutral-500 truncate max-w-[180px]">{participant.email}</p>
                  </div>
                </a>
              )}
              <Link
                href={`/admin/appointments?participant=${participant.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Schedule Appointment</p>
                  <p className="text-sm text-neutral-500">Book a new session</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Record Info */}
          <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-500">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {formatDate(participant.created_at)}
            </p>
            <p className="mt-1">
              <span className="font-medium">Last Updated:</span>{" "}
              {formatDate(participant.updated_at)}
            </p>
            <p className="mt-1">
              <span className="font-medium">ID:</span>{" "}
              <code className="text-xs bg-neutral-200 px-1 py-0.5 rounded">{participant.id}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
