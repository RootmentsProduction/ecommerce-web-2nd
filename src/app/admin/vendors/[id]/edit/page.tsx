"use client";

import React from "react";
import { useParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import VendorForm from "@/components/admin/vendors/VendorForm";

export default function EditVendorPage() {
  const params = useParams();
  const id = params.id as string;

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Vendors", href: "/admin/vendors" },
    { label: "Edit Vendor" },
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
            Edit Vendor
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Update your supplier coordinates, billing/shipping preferences, or payment terms.
          </p>
        </div>

        {/* Form */}
        <VendorForm initialVendorId={id} />
      </div>
    </div>
  );
}
