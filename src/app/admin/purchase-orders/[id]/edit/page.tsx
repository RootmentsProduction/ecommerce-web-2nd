"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import PurchaseOrderForm from "@/components/admin/purchase-orders/PurchaseOrderForm";

export default function EditPurchaseOrderPage() {
  const params = useParams();
  const id = params.id as string;

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Purchase Orders", href: "/admin/purchase-orders" },
    { label: "Edit Purchase Order" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb] admin-dashboard-root">
      {/* Topbar */}
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      {/* Main Container */}
      <div className="flex-grow p-6 md:p-8 space-y-6 max-w-6xl w-full mx-auto">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-sans">
            Edit Purchase Order
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Update reference numbers, quantity adjustments or line taxes for {id}.
          </p>
        </div>

        {/* Form wrap in Suspense */}
        <Suspense fallback={<div className="py-12 text-center text-xs text-neutral-400">Loading purchase order parameters...</div>}>
          <PurchaseOrderForm initialPOId={id} />
        </Suspense>
      </div>
    </div>
  );
}
