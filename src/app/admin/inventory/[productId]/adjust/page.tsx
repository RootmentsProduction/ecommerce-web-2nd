"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StockAdjustmentForm from "@/components/admin/inventory/StockAdjustmentForm";
import { getProductDetailById } from "@/data/admin/product-management";
import { StockAdjustment } from "@/types/admin";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function AdminStockAdjustmentPage({ params }: PageProps) {
  const router = useRouter();
  const { productId } = use(params);
  const product = getProductDetailById(productId);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Product not found. <Link href="/admin/inventory" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Inventory", href: "/admin/inventory" },
    { label: product.name, href: `/admin/inventory/${product.sku}` },
    { label: "Adjust Stock" }
  ];

  const handleAdjustmentSubmit = (adjustmentData: StockAdjustment & { variantName?: string; newStock: number }) => {
    // Show toast and route back
    const scope = adjustmentData.variantName
      ? `variant "${adjustmentData.variantName}"`
      : `product "${product.name}"`;

    setToastMessage(`Stock adjusted successfully for ${scope}! New stock: ${adjustmentData.newStock} units.`);

    setTimeout(() => {
      setToastMessage(null);
      router.push(`/admin/inventory/${product.sku}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-2xl w-full mx-auto">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            ADJUST STOCK
          </h1>
          <p className="text-[11px] text-neutral-405 mt-1 font-medium">
            Register manual inventory entries, write-offs, or returns.
          </p>
        </div>

        {/* Form component */}
        <div className="mt-6">
          <StockAdjustmentForm
            product={product}
            onSubmit={handleAdjustmentSubmit}
            onCancel={() => router.push(`/admin/inventory/${product.sku}`)}
          />
        </div>
      </div>
    </div>
  );
}
