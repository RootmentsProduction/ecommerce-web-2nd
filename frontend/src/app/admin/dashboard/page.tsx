"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import SalesAnalyticsChart from "@/components/admin/dashboard/SalesAnalyticsChart";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const breadcrumbs = [{ label: "Dashboard" }];

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c59b27] mx-auto"></div>
          <p className="text-xs text-neutral-500 font-sans uppercase tracking-widest">Checking admin session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Admin Header with search */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={true}
        searchPlaceholder="Search anything..."
      />

      {/* Main dashboard content area */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Statistics Cards Row */}
        <DashboardStats />

        {/* Sales Analytics Chart Section */}
        <SalesAnalyticsChart />
      </div>
    </div>
  );
}
