"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !isLoginPage && (!isAuthenticated || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, isAdmin, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show a premium loading spinner while resolving auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-amber-600 rounded-full animate-spin"></div>
          <span className="text-neutral-500 text-sm tracking-wider font-medium">VERIFYING CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  // Protect layout against unauthorized flashes before redirect executes
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex w-full">
      {/* Fixed sidebar */}
      <AdminSidebar />

      {/* Main viewport area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
