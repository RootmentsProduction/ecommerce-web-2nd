import React from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import SalesAnalyticsChart from "@/components/admin/dashboard/SalesAnalyticsChart";

export default function AdminDashboardPage() {
  const breadcrumbs = [{ label: "Dashboard" }];

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
