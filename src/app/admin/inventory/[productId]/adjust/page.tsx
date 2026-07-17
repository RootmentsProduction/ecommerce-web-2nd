"use client";

import React, { use, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StockAdjustmentForm from "@/components/admin/inventory/StockAdjustmentForm";
import { getAdminProductBySku } from "@/services/products.service";
import { adjustStock } from "@/services/inventory.service";
import { AdminProductFormData, StockAdjustment } from "@/types/admin";

interface PageProps {
  params: Promise<{ productId: string }>;
}

function StockAdjustmentPageContent({ productId }: { productId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialVariantId = searchParams.get("variant") || undefined;
  
  const [product, setProduct] = useState<AdminProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    getAdminProductBySku(productId).then((res) => {
      setProduct(res || null);
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Loading adjustment profile...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Product not found. <Link href="/admin/inventory" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Inventory", href: "/admin/inventory" },
    { label: product.name, href: `/admin/inventory/${product.id}` },
    { label: "Adjust Stock" }
  ];

  const handleAdjustmentSubmit = async (adjustmentData: StockAdjustment & { variantName?: string; newStock: number; vendor?: string; invoiceNumber?: string }) => {
    let currentStock = 0;
    if (adjustmentData.variantId) {
      const v = product.variants?.find((varItem) => varItem.id === adjustmentData.variantId);
      currentStock = v ? v.stock : 0;
    } else {
      currentStock = product.initialStock ?? 0;
    }

    let apiType = "MANUAL_CORRECTION";
    let apiQuantity = adjustmentData.quantity;

    if (adjustmentData.adjustmentType === "Add Stock") {
      apiType = "STOCK_ADDED";
    } else if (adjustmentData.adjustmentType === "Remove Stock") {
      apiType = "STOCK_REMOVED";
    } else if (adjustmentData.adjustmentType === "Damaged Item") {
      apiType = "DAMAGED";
    } else if (adjustmentData.adjustmentType === "Returned Item") {
      apiType = "CUSTOMER_RETURN";
    } else if (adjustmentData.adjustmentType === "Set Exact Quantity" || adjustmentData.adjustmentType === "Manual Correction") {
      apiType = "MANUAL_CORRECTION";
      apiQuantity = adjustmentData.newStock - currentStock;
    }

    try {
      await adjustStock({
        productId: adjustmentData.variantId ? undefined : product.id,
        variantId: adjustmentData.variantId || undefined,
        type: apiType,
        quantity: apiQuantity,
        reason: adjustmentData.reason + (adjustmentData.vendor ? ` (Vendor: ${adjustmentData.vendor}, Invoice: ${adjustmentData.invoiceNumber || 'N/A'})` : ""),
      });

      const scope = adjustmentData.variantName
        ? `variant "${adjustmentData.variantName}"`
        : `product "${product.name}"`;

      let detailMsg = `New stock: ${adjustmentData.newStock} units.`;
      if (adjustmentData.vendor) {
        detailMsg += ` Vendor: ${adjustmentData.vendor}.`;
      }

      setToastMessage(`Stock adjusted successfully for ${scope}! ${detailMsg}`);

      setTimeout(() => {
        setToastMessage(null);
        router.push(`/admin/inventory/${product.id}`);
      }, 2000);
    } catch (err: any) {
      alert(err.message || "Failed to adjust stock. Please try again.");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-2xl w-full mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-neutral-900 text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce">
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

      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
          ADJUST STOCK
        </h1>
        <p className="text-[11px] text-neutral-450 mt-1 font-medium">
          Record a stock increase, decrease, return, damage, or correction
        </p>
      </div>

      {/* Form component */}
      <div className="mt-6">
        <StockAdjustmentForm
          product={product}
          initialVariantId={initialVariantId}
          onSubmit={handleAdjustmentSubmit}
          onCancel={() => router.push(`/admin/inventory/${product.id}`)}
        />
      </div>
    </div>
  );
}

export default function AdminStockAdjustmentPage({ params }: PageProps) {
  const { productId } = use(params);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      <Suspense fallback={<div className="p-8 text-center text-xs">Loading adjustment form...</div>}>
        <StockAdjustmentPageContent productId={productId} />
      </Suspense>
    </div>
  );
}
