"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Referrals", href: "/admin/referrals", icon: FileText },
  { name: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { name: "Participants", href: "/admin/participants", icon: Users },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
      const email = localStorage.getItem("adminEmail") || "";
      setIsAuthenticated(loggedIn);
      setUserEmail(email);
      setIsLoading(false);

      // Redirect to login if not authenticated and not on login page
      if (!loggedIn && pathname !== "/admin/login" && pathname !== "/admin/login/") {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  // If on login page, render children without layout
  if (pathname === "/admin/login" || pathname === "/admin/login/") {
    return <>{children}</>;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800 flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">
            <Image
              src="/logo.png"
              alt="Ephraim Care"
              width={90}
              height={35}
              className="object-contain"
            />
            <span className="text-xs text-white/70 border-l border-white/20 pl-2">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - scrollable */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#1565C0] text-white"
                    : "text-neutral-400 hover:bg-[#1565C0] hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {item.name !== "Dashboard" && item.name !== "Settings" && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User - fixed at bottom */}
        <div className="p-4 border-t border-neutral-800 flex-shrink-0">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">
                {userEmail ? userEmail.charAt(0).toUpperCase() : "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {userEmail ? userEmail.split("@")[0] : "Admin"}
              </p>
              <p className="text-neutral-400 text-xs">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-neutral-400 hover:text-red-400 transition-colors flex-shrink-0"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-neutral-600 hover:text-neutral-900"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 lg:flex-none">
            <h1 className="text-lg font-semibold text-neutral-900 lg:hidden">
              Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-neutral-600 hover:text-neutral-900">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <Link
              href="/"
              className="text-sm text-[#1565C0] hover:text-[#0D47A1] font-medium"
            >
              View Website →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
