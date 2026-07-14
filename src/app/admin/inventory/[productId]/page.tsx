"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import InventoryProductDetails from "@/components/admin/inventory/InventoryProductDetails";
import StockSummaryCard from "@/components/admin/inventory/StockSummaryCard";
import StockTransactionTable from "@/components/admin/inventory/StockTransactionTable";
import { getProductDetailById } from "@/data/admin/product-management";
import { adminInventoryTransactions } from "@/data/admin/inventory-transactions";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function AdminInventoryProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { productId } = use(params);
  const product = getProductDetailById(productId);

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Product inventory not found. <Link href="/admin/inventory" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Inventory", href: "/admin/inventory" },
    { label: product.name }
  ];

  // Calculations for summary card
  const currentStock = product.initialStock;
  const minRequired = product.minStock;
  const reservedStock = product.variants?.reduce((sum, v) => sum + (v.stock < 3 ? 1 : 0), 0) || 1; // dummy reserved
  const availableStock = currentStock > reservedStock ? currentStock - reservedStock : 0;
  const incomingStock = currentStock < minRequired ? 15 : 0; // dummy incoming logic

  // Filter transaction log for this product SKU
  const productTransactions = adminInventoryTransactions.filter(
    (tx) => tx.productId.replace("#", "") === product.sku.replace("#", "")
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/admin/inventory")}
              className="px-3.5 py-1.5 border border-neutral-200 rounded-full bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>&larr;</span> <span>Back</span>
            </button>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              INVENTORY DETAILS
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.push(`/admin/products/${product.sku}/edit`)}
              className="px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-750 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Edit Product
            </button>
            <button
              onClick={() => router.push(`/admin/inventory/transactions?sku=${product.sku}`)}
              className="px-4 py-2 border border-neutral-200 rounded-full bg-white text-xs font-semibold text-neutral-750 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              View Transactions
            </button>
            <button
              onClick={() => router.push(`/admin/inventory/${product.sku}/adjust`)}
              className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Adjust Stock
            </button>
          </div>
        </div>

        {/* Stock status grid */}
        <StockSummaryCard
          currentStock={currentStock}
          minRequired={minRequired}
          availableStock={availableStock}
          reservedStock={reservedStock}
          incomingStock={incomingStock}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Profile info card */}
          <div className="lg:col-span-1">
            <InventoryProductDetails product={product} />
          </div>

          {/* Variant Stock levels & Actions list */}
          <div className="lg:col-span-2 space-y-6">
            {/* Variants table card */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
                Variant Stock breakdown
              </h2>
              {product.variants && product.variants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-400 border-b border-neutral-150 uppercase tracking-wider">
                        <th className="py-3 px-4">Variant Option</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4 text-center">Current Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {product.variants.map((v) => (
                        <tr key={v.id} className="hover:bg-neutral-50/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-neutral-800">{v.name}</td>
                          <td className="py-3 px-4 font-mono text-neutral-500">{v.sku}</td>
                          <td className="py-3 px-4 text-center font-bold text-neutral-900">{v.stock} units</td>
                          <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                          <td className="py-3 px-4 text-right">
                            <Link
                              href={`/admin/inventory/${product.sku}/adjust?variant=${v.id}`}
                              className="text-xs font-bold text-[#C99213] hover:underline"
                            >
                              Adjust
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-neutral-450 py-4 text-center">
                  This product has no variations. Stock is managed on the base product profile.
                </p>
              )}
            </div>

            {/* Recent stock activity ledger card */}
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                  Recent Stock Activity
                </h2>
              </div>
              <div className="max-h-80 overflow-y-auto no-scrollbar">
                <StockTransactionTable transactions={productTransactions} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
