"use client";

import React from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import VendorForm from "@/components/admin/vendors/VendorForm";

export default function NewVendorPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Vendors", href: "/admin/vendors" },
    { label: "New Vendor" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root">
      {/* Topbar */}
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto">
        {/* Title Block */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-sans">
            Add New Vendor
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Fill in details to onboard a new materials or goods supplier.
          </p>
        </div>

        {/* Form */}
        <VendorForm />
      </div>
    </div>
  );
}
