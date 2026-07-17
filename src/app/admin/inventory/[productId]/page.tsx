"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import InventoryProductDetails from "@/components/admin/inventory/InventoryProductDetails";
import StockTransactionTable from "@/components/admin/inventory/StockTransactionTable";
import { getAdminProductBySku } from "@/services/products.service";
import { getStockTransactions } from "@/services/inventory.service";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { AdminProductFormData, StockTransaction } from "@/types/admin";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function AdminInventoryProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { productId } = use(params);
  
  const [product, setProduct] = useState<AdminProductFormData | null>(null);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      getAdminProductBySku(productId),
      getStockTransactions(productId)
    ]).then(([prodRes, txRes]) => {
      setProduct(prodRes || null);
      setTransactions(txRes || []);
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500">
        Loading inventory details...
      </div>
    );
  }

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

  // Stock calculations
  const hasVariants = product.variants?.length > 0;
  
  const currentStock = hasVariants
    ? product.variants.reduce((sum, v) => sum + v.stock, 0)
    : product.initialStock;

  const minRequired = product.minStock;
  const reorderPoint = product.reorderPoint || 8;

  // Mock allocation fields for premium representation
  const reservedStock = hasVariants
    ? Math.round(currentStock * 0.15) || 1
    : 2;

  const availableStock = currentStock > reservedStock ? currentStock - reservedStock : 0;
  
  const incomingStock = currentStock <= minRequired ? 15 : 0;

  // Limit to latest 5 rows
  const productTransactions = transactions.slice(0, 5);

  // Warnings
  const isOutOfStock = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= minRequired;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Warnings banners */}
        {isOutOfStock && (
          <div className="bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs font-semibold p-4 rounded-lg flex items-center space-x-2 animate-pulse">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>CRITICAL WARNING: Product stock is depleted (0 units). Catalog purchases are disabled unless backorders are enabled.</span>
          </div>
        )}

        {isLowStock && (
          <div className="bg-[#FFF3E0] border border-[#FFE0B2] text-[#E65100] text-xs font-semibold p-4 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>WARNING: Stock level is below minimum threshold ({currentStock} / {minRequired} units). Replenishment is recommended.</span>
          </div>
        )}

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
              onClick={() => router.push(`/admin/products/${product.id}/edit`)}
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
              onClick={() => router.push(`/admin/inventory/${product.id}/adjust`)}
              className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Adjust Stock
            </button>
          </div>
        </div>

        {/* Stock status grid cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Current Stock */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Current Stock</span>
            <span className="text-xl font-bold text-neutral-900 mt-2">{currentStock} units</span>
          </div>

          {/* Reserved Stock */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Reserved Stock</span>
            <span className="text-xl font-bold text-neutral-600 mt-2">{reservedStock} units</span>
          </div>

          {/* Available Stock */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between relative group">
            <div className="flex items-center space-x-1 justify-between">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Available Stock</span>
              {/* Tooltip Icon */}
              <span className="text-neutral-300 hover:text-neutral-500 cursor-help text-[10px] font-bold border border-neutral-300 rounded-full w-3.5 h-3.5 flex items-center justify-center">?</span>
              {/* Tooltip box */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-neutral-900 text-white text-[9px] p-2 rounded shadow-lg z-10 leading-normal">
                Available Stock = Current Stock - Reserved Stock
              </div>
            </div>
            <span className="text-xl font-extrabold text-[#C99213] mt-2">{availableStock} units</span>
          </div>

          {/* Incoming Stock */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Incoming Stock</span>
            <span className="text-xl font-bold text-neutral-900 mt-2">{incomingStock} units</span>
          </div>

          {/* Min Required */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Min. Required</span>
            <span className="text-xl font-bold text-neutral-600 mt-2">{minRequired} units</span>
          </div>

          {/* Reorder Point */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Reorder Point</span>
            <span className="text-xl font-bold text-neutral-950 mt-2">{reorderPoint} units</span>
          </div>
        </div>

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
                Variant Stock Breakdown
              </h2>
              {product.variants && product.variants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-400 border-b border-neutral-150 uppercase tracking-wider">
                        <th className="py-3 px-4">Variant Option</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4 text-center">Current</th>
                        <th className="py-3 px-4 text-center">Reserved</th>
                        <th className="py-3 px-4 text-center">Available</th>
                        <th className="py-3 px-4 text-center">Min. Req</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {product.variants.map((v) => {
                        const vReserved = Math.round(v.stock * 0.15) || 0;
                        const vAvailable = v.stock > vReserved ? v.stock - vReserved : 0;
                        
                        return (
                          <tr key={v.id} className="hover:bg-neutral-50/40 transition-colors">
                            <td className="py-3 px-4 font-semibold text-neutral-800">{v.name}</td>
                            <td className="py-3 px-4 font-mono text-neutral-500">{v.sku}</td>
                            <td className="py-3 px-4 text-center font-bold text-neutral-900">{v.stock}</td>
                            <td className="py-3 px-4 text-center text-neutral-500">{vReserved}</td>
                            <td className="py-3 px-4 text-center font-bold text-[#C99213]">{vAvailable}</td>
                            <td className="py-3 px-4 text-center text-neutral-500">{minRequired}</td>
                            <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                            <td className="py-3 px-4 text-right">
                              <Link
                                href={`/admin/inventory/${product.id}/adjust?variant=${v.id}`}
                                className="text-xs font-bold text-[#C99213] hover:underline"
                              >
                                Adjust
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
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
              <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                  Recent Stock Activity
                </h2>
                <Link
                  href={`/admin/inventory/transactions?sku=${product.sku}`}
                  className="text-[10px] text-[#C99213] font-bold uppercase tracking-wider hover:underline"
                >
                  View Full Transaction History
                </Link>
              </div>
              <div>
                <StockTransactionTable transactions={productTransactions} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
