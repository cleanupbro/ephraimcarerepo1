"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock,
  Reply,
  X,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "unread" | "read" | "responded";
  createdAt: string;
}

const statusColors = {
  unread: "bg-blue-100 text-blue-700",
  read: "bg-neutral-100 text-neutral-600",
  responded: "bg-green-100 text-green-700",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchContacts();
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status: status as Contact["status"] });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const openContact = async (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.status === "unread") {
      await updateStatus(contact.id, "read");
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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

  const unreadCount = contacts.filter((c) => c.status === "unread").length;

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
          <h1 className="text-2xl font-bold text-neutral-900">Contact Inbox</h1>
          <p className="text-neutral-600">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"} • {contacts.length} total
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No contacts found</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 hover:bg-neutral-50 cursor-pointer transition-colors ${
                  contact.status === "unread" ? "bg-blue-50/50" : ""
                }`}
                onClick={() => openContact(contact)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-100 to-primary-100 flex items-center justify-center">
                        <span className="text-secondary font-semibold">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                      {contact.status === "unread" && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${contact.status === "unread" ? "text-neutral-900" : "text-neutral-600"}`}>
                          {contact.name}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[contact.status]}`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 truncate">{contact.email}</p>
                      <p className="text-sm text-neutral-400 line-clamp-1 mt-1">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 flex-shrink-0">
                    {formatDate(contact.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Message Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary-100 to-primary-100 flex items-center justify-center">
                  <span className="text-xl text-secondary font-semibold">
                    {selectedContact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-lg text-neutral-900">{selectedContact.name}</p>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-1 hover:text-primary">
                      <Mail className="w-4 h-4" />
                      {selectedContact.email}
                    </a>
                    {selectedContact.phone && (
                      <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="w-4 h-4" />
                        {selectedContact.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-500">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-neutral-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Your inquiry to Ephraim Care`}
                  onClick={() => updateStatus(selectedContact.id, "responded")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-800 transition-colors"
                >
                  <Reply className="w-5 h-5" />
                  Reply via Email
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </a>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                <span className="text-sm text-neutral-500">Mark as:</span>
                {(["unread", "read", "responded"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedContact.id, status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedContact.status === status
                        ? statusColors[status]
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
